import { useActionState } from "react";
import { Link } from "react-router-dom";
import { createPasskey } from "../lib/passkey";

type RegisterState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; result: RegistrationResponseJSON };

const registerAction = async (_prev: RegisterState, formData: FormData): Promise<RegisterState> => {
  const username = String(formData.get("username") ?? "");
  const challenge = new TextEncoder().encode("hfNTJNNVlnBEBY3g"); // ハードコード
  const userId = new TextEncoder().encode("nn1eSMm1u99aHolK"); // ハードコード

  try {
    // TODO: サーバーからchallengeとuserIdを取得

    const result = await createPasskey({ username, challenge, userId });

    // TODO: 生成したクレデンシャルをサーバーに送信

    return { status: "success", result };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : String(error),
    };
  }
};

export const Register = () => {
  const [state, dispatchAction, isPending] = useActionState(registerAction, {
    status: "idle",
  });

  return (
    <section className="auth-card">
      <h1>アカウント登録</h1>
      <p className="auth-lead">ユーザー名を入力してパスキーを登録します。</p>

      <form className="auth-form" action={dispatchAction}>
        <label htmlFor="register-username">ユーザー名</label>
        <input
          id="register-username"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="例: taro-yamada"
          required
        />

        <button type="submit" className="primary-button" disabled={isPending}>
          {isPending ? "登録中..." : "パスキーを登録"}
        </button>
      </form>

      {state.status === "error" && state.message && <p className="auth-error">{state.message}</p>}

      {state.status === "success" && state.result && (
        <div className="auth-result">
          <h2>登録結果</h2>
          <pre>{JSON.stringify(state.result, null, 2)}</pre>
        </div>
      )}

      <p className="auth-switch">
        すでにアカウントをお持ちですか? <Link to="/login">ログイン</Link>
      </p>
    </section>
  );
};
