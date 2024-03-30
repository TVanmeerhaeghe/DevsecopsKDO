import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";
import GiftInListPage from "./pages/GiftInListPage";
import CreatePage from "./pages/CreatePage";
import GiftPage from "./pages/GiftPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/lists" element={<ListPage />} />
        <Route path="/lists/:id" element={<GiftInListPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/gifts" element={<GiftPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
