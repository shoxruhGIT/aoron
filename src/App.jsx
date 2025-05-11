import React from "react";
import {
  AboutPage,
  CartPage,
  CatalogPage,
  ContactPage,
  Footer,
  HomePage,
  Navbar,
  NewsPage,
  ProductDetailPage,
  TermsPage,
} from "../src/components";
import { Route, Routes } from "react-router-dom";
import NewsDetail from "./components/NewsDetail";

const App = () => {
  return (
    <div className="w-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
