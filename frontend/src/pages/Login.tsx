import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <section className="auth-card">
      <h1>ログイン</h1>
      <p className="auth-lead">ユーザー名を入力してパスキーでログインします。</p>

      <form className="auth-form">
        <label htmlFor="login-username">ユーザー名</label>
        <input
          id="login-username"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="例: taro-yamada"
        />

        <button type="submit" className="primary-button">
          パスキーでログイン
        </button>
      </form>

      <p className="auth-switch">
        アカウントをお持ちでない方は <Link to="/register">登録</Link>
      </p>
    </section>
  );
};
