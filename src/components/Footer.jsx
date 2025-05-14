import React from "react";
import AoronLogo from "../assets/aoron_logo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-secondary pt-16 pb-8 mt-auto">
      <div className="container w-full max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <img className="w-20" src={AoronLogo} alt="aoron_logo" />
            <p className="text-sm text-muted-foreground">{t("footer.title")}</p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 rounded-full hover:bg-[#FFFFFF] transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#"
                className="p-2 rounded-full hover:bg-[#FFFFFF] transition-colors"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="p-2 rounded-full hover:bg-[#FFFFFF] transition-colors"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="font-medium text-sm uppercase tracking-wider">
              {t("footer.shop.title")}
            </h1>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/catalog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("footer.shop.all")}
              </Link>
              <Link
                to="/catalog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("footer.shop.shirt")}
              </Link>
              <Link
                to="/catalog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                
              >
                {t("footer.shop.shorts")}
              </Link>
              <Link
                to="/catalog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("footer.shop.suits")}
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h1 className="font-medium text-sm uppercase tracking-wider">
              {t("footer.company.title")}
            </h1>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("footer.company.about")}
              </Link>
              <Link
                to="/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("footer.company.contact")}
              </Link>
              <Link
                to="/news"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("footer.company.policy")}
              </Link>
              <Link
                to="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("footer.company.terms")}
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h1 className="font-medium text-sm uppercase tracking-wider">
              {t("footer.subscribe.title")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("footer.subscribe.desc")}
            </p>
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl flex">
              <input
                type="email"
                name="email"
                placeholder={t("footer.subscribe.email")}
                className="w-full px-3 py-2 text-[15px] sm:text-base border border-r-0 rounded-l-md focus:ring-1 focus:ring-primary outline-none"
              />
              <button className="flex items-center justify-center bg-primary text-primary-foreground px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors">
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
                  className="lucide lucide-arrow-right"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © 2025 AORON. {t("footer.right")}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
