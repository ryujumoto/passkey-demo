import { NavLink, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <header className="app-header">
        <span className="app-title">passkey-demo</span>
        <nav className="app-nav">
          <NavLink to="/" end>
            ホーム
          </NavLink>
          <NavLink to="/login">ログイン</NavLink>
          <NavLink to="/register">登録</NavLink>
        </nav>
      </header>

      <main id="center">
        <Outlet />
      </main>
    </>
  );
};
