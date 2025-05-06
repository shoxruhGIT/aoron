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
  TermsPage,
} from "../src/components";
import { Route, Routes } from "react-router-dom";

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
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
