export const Home = () => {
  return (
    <section className="auth-card">
      <h1>ダッシュボード</h1>
      <p className="auth-lead">ログイン中のユーザー: taro-yamada</p>

      <dl className="passkey-summary">
        <div>
          <dt>登録済みパスキー</dt>
          <dd>1件</dd>
        </div>
        <div>
          <dt>最終ログイン</dt>
          <dd>-</dd>
        </div>
      </dl>

      <button type="button" className="secondary-button">
        ログアウト
      </button>
    </section>
  );
};
