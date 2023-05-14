import Head from "next/head";

export default function SignUpCompleted() {
  return (
    <>
      <Head>
        <title>アカウント登録完了</title>
      </Head>
      <main className="bg-gray-200 min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <div className="flex flex-col items-center justify-center w-full px-4 py-8 bg-white shadow-md max-w-lg sm:rounded-lg sm:px-10">
            <h2 className="text-3xl font-extrabold text-gray-900">
              アカウント登録完了
            </h2>
            <div className="mt-6 leading-loose text-gray-600">
              <p>ご登録いただいたメールアドレスに確認メールを送信しました。</p>
              <p>
                メールに記載されたリンクをクリックして、メールアドレスの確認を完了してください。
              </p>
              <p>
                メールが来ていない場合、迷惑メールに振り分けられていないかご確認ください。
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
