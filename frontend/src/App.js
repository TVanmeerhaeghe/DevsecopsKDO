// App.js

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<ListPage />}
        />
        <Route
          path="/lists"
          element={<ListPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
