import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import "./App.css";

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};
