import React from "react";
import { Link } from "react-router-dom";
import AoronLogo from "../assets/aoron_logo.png";
import { useTranslation } from "react-i18next";
import { useWishlist } from "../hooks/useWishlist";

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const { count } = useWishlist();

  const currentLanguage = i18n.language;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 bg-transparent glassmorphism">
      <div className="container w-full max-w-[1400px] mx-auto px-4 flex items-center justify-between">
        <Link
          to="/"
          className="lg:text-[22px] font-light tracking-widest uppercase animate-fade-in"
        >
          <img className="w-[60px]" src={AoronLogo} alt="aoron_logo" />
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            className="text-sm hover:text-gray-600 transition-colors font-medium"
            to="/"
          >
            {t("navbar.home")}
          </Link>
          <Link
            className="text-sm hover:text-gray-600 transition-colors font-medium"
            to="/catalog"
          >
            {t("navbar.catalog")}
          </Link>
          <Link
            className="text-sm hover:text-gray-600 transition-colors font-medium"
            to="/about"
          >
            {t("navbar.about")}
          </Link>
          <Link
            className="text-sm hover:text-gray-600 transition-colors font-medium"
            to="/news"
          >
            {t("navbar.news")}
          </Link>
          <Link
            className="text-sm hover:text-gray-600 transition-colors font-medium"
            to="/contact"
          >
            {t("navbar.contact")}
          </Link>
        </nav>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-2 ">
            <button
              onClick={() => changeLanguage("en")}
              className={`px-2 py-1 text-xs rounded transition-all font-medium cursor-pointer ${
                currentLanguage === "en"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage("ru")}
              className={`px-2 py-1 text-xs rounded transition-all font-medium cursor-pointer ${
                currentLanguage === "ru"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary"
              }`}
            >
              RU
            </button>
            <button
              onClick={() => changeLanguage("de")}
              className={`px-2 py-1 text-xs rounded transition-all font-medium cursor-pointer ${
                currentLanguage === "de"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary"
              }`}
            >
              DE
            </button>
          </div>
          <Link className="relative" to="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-bag cursor-pointer"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <path d="M3 6h18"></path>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span className="absolute -top-3 -right-3 bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs">
              {count}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
