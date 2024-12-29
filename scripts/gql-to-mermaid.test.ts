import assert from "node:assert";
import { describe, it } from "node:test";
import dedent from "dedent";
import { generateMermaidER } from "./gql-to-mermaid";

// `.equal` でも比較できるが、 `.deepStrictEqual` にしておくと行ごとの差分を出してくれる

describe("generateMermaidER", () => {
  it("エンティティを変換できる", () => {
    const schemaString = dedent`
      type User {
        id: UUID!
        name: String!
      }
      `;
    const mermaidER = generateMermaidER(schemaString);
    assert.deepStrictEqual(
      mermaidER,
      dedent`
        erDiagram
          User {
            id UUID PK
            name String
          }
        ` + "\n"
    );
  });

  it("リレーションを表現できる", () => {
    const schemaString = dedent`
      type User {
        id: UUID!
        name: String!
      }

      type Post {
        id: UUID!
        title: String!
        author: User!
      }
`;

    const mermaidER = generateMermaidER(schemaString);
    assert.deepStrictEqual(
      mermaidER,
      dedent`
      erDiagram
        User {
          id UUID PK
          name String
        }
        Post {
          id UUID PK
          title String
          author User FK
        }
        User ||--o{ Post : "has"
      ` + "\n"
    );
  });

  it("Firebase Data Connect のディレクティブを扱える", () => {
    const schemaString = dedent`
      type Book @table {
        id: UUID! @default(expr: "uuidV4()")
        name: String!
        price: Int
        imagePath: String
        writtenBy: String
        illustratedBy: String
        publisher: String
      }
      `;

    const mermaidER = generateMermaidER(schemaString);
    assert.deepStrictEqual(
      mermaidER,
      dedent`
      erDiagram
        Book {
          id UUID PK
          name String
          price Int
          imagePath String
          writtenBy String
          illustratedBy String
          publisher String
        }
      ` + "\n"
    );
  });

  it("コメントを記載する", () => {
    const schemaString = dedent`
      type Book @table {
        id: UUID! @default(expr: "uuidV4()")
        name: String!
        price: Int
        imagePath: String
        # 作
        writtenBy: String
        # 絵
        illustratedBy: String
        # 出版社
        # これは複数行のコメントです
        publisher: String
      }
      `;

    const mermaidER = generateMermaidER(schemaString);
    assert.deepStrictEqual(
      mermaidER,
      dedent`
      erDiagram
        Book {
          id UUID PK
          name String
          price Int
          imagePath String
          writtenBy String "作"
          illustratedBy String "絵"
          publisher String "出版社,これは複数行のコメントです"
        }
      ` + "\n"
    );
  });
});
