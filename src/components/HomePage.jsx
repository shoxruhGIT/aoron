import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";

const HomePage = () => {
  const { t } = useTranslation();

  const [featuredProducts, setFeaturedProducts] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const getFeaturedPrd = () => {
    fetch("https://testaoron.limsa.uz/api/product")
      .then((data) => data.json())
      .then((data) => {
        if (data.success) {
          setFeaturedProducts(data.data.products);
          setNewProducts(data.data.products.slice(-4));
        }
      });
  };
  useEffect(getFeaturedPrd, []);

  return (
    <main className="grow pt-18">
      <section className="relative h-screen flex items-center overflow-hidden mt-3">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-[linear-gradient(rgba(0,0,0,0.35),rgba(0,0,0,0.35)),url('./assets/bg.jpg')]"></div>
        <div className="container w-full max-w-[1400px] px-4 mx-auto relative text-white">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 backdrop-blur-md px-3 py-1 mb-9 rounded text-xs tracking-[1.5px] uppercase text-white">
              Spring/Summer 2025
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6">
              {t("home.title")}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-lg mb-12">
              {t("home.desc")}
            </p>
            <Link
              to={"/catalog"}
              className="group bg-white text-primary px-6 py-3 rounded-md inline-flex items-center hover:bg-white/90 transition-colors"
            >
              {t("home.collectionLink")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right ml-2 transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      <section className="section-container">
        <div className="mb-10 text-center">
          <h2 className="heading-lg mb-4">{t("home.productTitle")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("home.productSubtitle")}
          </p>
        </div>
        <div className="product-grid">
          {featuredProducts &&
            featuredProducts.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            className="btn-secondary group inline-flex items-center"
            to="/catalog"
          >
            {t("home.viewAllLink")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right ml-2 transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="section-container -mt-7 md:-mt-12">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="heading-lg">{t("home.newTitle")}</h2>
          <Link
            to="/catalog?new=true"
            className="text-sm font-medium hover:underline inline-flex items-center group"
          >
            {t("home.viewAllLink")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right ml-2 transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="product-grid">
          {newProducts &&
            newProducts.map((product) => (
              <ProductItem product={product} type="new" key={product.id} />
            ))}
        </div>
      </section>
      <section className="py-16 bg-destructive/5">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="flex justify-between items-end">
              <h2 className="heading-lg text-destructive">
                {t("home.saleTitle")}
              </h2>
              <a
                className="text-sm font-medium hover:underline inline-flex items-center text-destructive"
                href="/catalog?sale=true"
              >
                {t("home.viewAllLink")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right ml-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          <div className="product-grid">
            <p className="text-muted-foreground">{t("home.infoNotFound")}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
