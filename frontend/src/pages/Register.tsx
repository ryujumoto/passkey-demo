import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <section className="auth-card">
      <h1>アカウント登録</h1>
      <p className="auth-lead">ユーザー名を入力してパスキーを登録します。</p>

      <form className="auth-form">
        <label htmlFor="register-username">ユーザー名</label>
        <input
          id="register-username"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="例: taro-yamada"
        />

        <button type="submit" className="primary-button">
          パスキーを登録
        </button>
      </form>

      <p className="auth-switch">
        すでにアカウントをお持ちですか? <Link to="/login">ログイン</Link>
      </p>
    </section>
  );
};
