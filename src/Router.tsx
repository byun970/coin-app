import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps {
  toggleDark: () => void;
  isDark: boolean;
}

const Router = ({ toggleDark, isDark }: IRouterProps) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          path="/:coinId/*"
          element={<Coin isDark={isDark} toggleDark={toggleDark} />}
        />
        <Route
          path="/"
          element={<Coins isDark={isDark} toggleDark={toggleDark} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
