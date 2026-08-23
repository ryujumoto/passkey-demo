import { Link } from "react-router-dom";
import { getPasskey } from "../lib/passkey";
import { useActionState } from "react";

type LoginState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; result: AuthenticationResponseJSON };

const loginAction = async (_prev: LoginState, _formData: FormData): Promise<LoginState> => {
  const challenge = new TextEncoder().encode("hfNTJNNVlnBEBY3g"); // ハードコード

  try {
    // TODO: サーバーからchallengeを取得

    const result = await getPasskey({ challenge });

    // TODO: 取得したクレデンシャルをサーバーに送信

    return { status: "success", result };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : String(error),
    };
  }
};

export const Login = () => {
  const [state, dispatchAction, isPending] = useActionState(loginAction, {
    status: "idle",
  });

  return (
    <section className="auth-card">
      <h1>ログイン</h1>
      <p className="auth-lead">パスキーでログインします。</p>

      <form className="auth-form" action={dispatchAction}>
        <button type="submit" className="primary-button">
          {isPending ? "ログイン中..." : "パスキーでログイン"}
        </button>
      </form>

      {state.status === "error" && state.message && <p className="auth-error">{state.message}</p>}

      {state.status === "success" && state.result && (
        <div className="auth-result">
          <h2>ログイン結果</h2>
          <pre>{JSON.stringify(state.result, null, 2)}</pre>
        </div>
      )}

      <p className="auth-switch">
        アカウントをお持ちでない方は <Link to="/register">登録</Link>
      </p>
    </section>
  );
};
