import { parse, Kind, visit, TypeNode } from "graphql";

// Mermaid用ER図生成
export const generateMermaidER = (schemaString: string): string => {
  const ast = parse(schemaString);

  const types: Record<string, string[]> = {};
  const relations = new Set<string>();

  visit(ast, {
    // 型定義ノードを処理
    ObjectTypeDefinition(node) {
      const typeName = node.name.value;
      types[typeName] = [];

      node.fields?.forEach((field) => {
        // 型とフィールドを追加
        const fieldName = field.name.value;
        const fieldType = extractType(field.type);
        // Data Connect は、`@table(key: ...) ` で主キーを指定するが、特になければ `id` を主キーとするらしい
        const isPrimaryKey = fieldName === "id";
        // 自動的に外部キー参照を作ってくれる
        // https://firebase.google.com/docs/reference/data-connect/gql/directive#ref
        const isForeignKey = !isReserved(fieldType);
        const keys =
          // isPrimaryKeyがtrueならば、"PK"を返す、isForeignKeyがtrueならば"FK"を返す、どちらもtrueならばカンマ区切りの文字列を返す
          [isPrimaryKey && "PK", isForeignKey && "FK"]
            .filter(Boolean)
            .join(", ");

        // フィールド定義の直前のコメントを取得
        const leadingComments: string[] = [];
        let token = field.loc?.startToken.prev;
        while (token?.kind === "Comment") {
          leadingComments.unshift(token.value.trim());
          token = token.prev;
        }
        const comment =
          leadingComments.length > 0 ? leadingComments.join(",") : null;

        types[typeName].push(
          `${fieldName} ${fieldType}${keys ? ` ${keys}` : ``}${
            comment ? ` "${comment}"` : ``
          }`
        );

        // リレーションを追加
        // ただし、gqlの定義からは0-1, 1-1, 1-Nの関係を特定できないことに注意
        if (isForeignKey) {
          const left =
            // 必須だったら ||
            field.type.kind === "NonNullType" ? "||" : "|o";
          const relation = `${fieldType} ${left}--o{ ${typeName} : "has"`;
          relations.add(relation);
        }
      });
    },
  });

  let mermaid = "erDiagram\n";
  // 型情報をMermaid形式に変換
  for (const [typeName, fields] of Object.entries(types)) {
    mermaid += `  ${typeName} {\n`;
    fields.forEach((field) => {
      mermaid += `    ${field}\n`;
    });
    mermaid += `  }\n`;
  }

  // リレーションを追加
  relations.forEach((relation) => {
    mermaid += `  ${relation}\n`;
  });

  return mermaid;
};

// 型の名前を抽出するユーティリティ関数
const extractType = (typeNode: TypeNode): string => {
  switch (typeNode.kind) {
    case Kind.NAMED_TYPE:
      return typeNode.name.value;
    case Kind.NON_NULL_TYPE:
    case Kind.LIST_TYPE:
      return extractType(typeNode.type);
    default:
      typeNode satisfies never;
      throw new Error(
        `Unexpected typeNode.kind: ${(typeNode as TypeNode).kind}`
      );
  }
};

// 既定の型かどうかを判定
const isReserved = (typeName: string): boolean => {
  const scalarTypes = [
    // GraphQL の組み込み
    "String",
    "Int",
    "Float",
    "Boolean",
    // Data Connect
    // https://firebase.google.com/docs/data-connect/schemas-queries-mutations?hl=ja#supported_data_types
    "UUID",
  ];
  return scalarTypes.includes(typeName);
};
