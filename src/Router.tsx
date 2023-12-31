import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";



const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          path="/:coinId/*"
          element={<Coin/>}
        />
        <Route
          path="/"
          element={<Coins/>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
