import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import AssetDetailPage from "./pages/AssetDetailPage.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/activo/:id" element={<AssetDetailPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
