import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";
import GiftPage from "./pages/GiftPage"; // Importez la nouvelle page

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/lists" element={<ListPage />} />
        <Route path="/lists/:id" element={<GiftPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
