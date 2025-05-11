import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { t } = useTranslation();
  const lng = localStorage.getItem("i18nextLng");

  const [featuredProducts, setFeaturedProducts] = useState(null);
  const getFeaturedPrd = () => {
    fetch("https://back.aoron.uz/api/product?page=1&limit=4")
      .then((data) => data.json())
      .then((data) => {
        if (data.success) {
          setFeaturedProducts(data.data.products);
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
              <div key={product.id} className="group relative animate-fade-in">
                <Link
                  className="block overflow-hidden"
                  to={`/product/${product.id}`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary/20">
                    <img
                      src={`https://back.aoron.uz/${product.images[0]}`}
                      alt={product[`title_${lng}`]}
                      className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 z-10" />
                  </div>
                </Link>
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">
                      <Link to={`/product/${product.id}`}>
                        {product[`title_${lng}`]}
                      </Link>
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {product[`description_${lng}`]}
                  </p>
                  <div className="flex items-center space-x-1 mt-2">
                    <div
                      className="w-3 h-3 rounded-full border border-gray-200"
                      style={{ backgroundColor: product.colors[0].color_en }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            className="btn-secondary group inline-flex items-center"
            to="/catalog"
          >
            View All Products
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
    </main>
  );
};

export default HomePage;
