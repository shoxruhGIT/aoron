import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CatalogPage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("lowToHigh");

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const fetchProducts = () => {
    const baseURL = "https://back.aoron.uz/api/product";
    const queryParams = new URLSearchParams();

    if (selectedCategory) queryParams.append("category_id", selectedCategory);
    if (selectedSize) queryParams.append("size", selectedSize);
    if (selectedColor) queryParams.append("color", selectedColor);
    if (sortOrder) queryParams.append("sortBy", "price");
    if (sortOrder === "highToLow") queryParams.append("order", "desc");
    else queryParams.append("order", "asc");

    const url = `${baseURL}?${queryParams.toString()}`;

    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        const productList = response?.data?.products || [];
        setProducts(productList);
      })
      .catch((error) => {
        console.error("Xatolik:", error);
        setProducts([]);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [sortOrder, selectedCategory, selectedSize, selectedColor]);

  const handleClearFilters = () => {
    setSelectedCategory("");
    setSelectedSize("");
    setSelectedColor("");
  };

  return (
    <main className="w-full grow pt-18">
      <section className="py-10 mt-3 md:py-16 bg-secondary">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">
            {t("catalog.OUR COLLECTION")}
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t(
              "catalog.Browse our collection of premium menswear, designed with quality and style in mind."
            )}
          </p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 py-8 flex gap-6">
        {/* Sidebar filters */}
        <aside className="w-64 pr-4">
          <h2 className="font-semibold text-lg mb-2">
            {t("catalog.Categories")}
          </h2>
          <ul className="space-y-1">
            {[
              { label: t("catalog.View All Products"), value: "" },
              { label: "T-Shirts", value: "1" },
              { label: "Shorts", value: "2" },
              { label: "Suits", value: "3" },
            ].map((cat) => (
              <li key={cat.value}>
                <button
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`block w-full text-left px-2 py-1 rounded hover:bg-accent ${
                    selectedCategory === cat.value
                      ? "bg-primary text-white"
                      : ""
                  }`}
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>

          <h2 className="font-semibold text-lg mt-6 mb-2">
            {t("catalog.Sizes")}
          </h2>
          <button
            onClick={() => setSelectedSize("44-52")}
            className={`px-3 py-1 rounded border ${
              selectedSize === "44-52" ? "bg-primary text-white" : ""
            }`}
          >
            44–52
          </button>

          <h2 className="font-semibold text-lg mt-6 mb-2">
            {t("catalog.Colors")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {products.length > 0 &&
              products[0].colors &&
              Array.isArray(products[0].colors) &&
              products[0].colors.map((colorObj, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(colorObj.color_en)} // Rangni tanlashda, tanlangan rangni set qilish
                  className={`px-3 py-1 border rounded ${
                    selectedColor === colorObj.color_en
                      ? "bg-primary text-white"
                      : ""
                  }`}
                >
                  {colorObj.color_en}
                </button>
              ))}
          </div>

          <button
            onClick={handleClearFilters}
            className="text-red-500 mt-4 underline"
          >
            {t("catalog.Clear filters")}
          </button>
        </aside>

        {/* Product list */}
        <div className="flex-1">
          <div className="flex justify-end mb-4">
            <label className="text-sm font-medium mr-2">
              {t("catalog.Sort by")}:
            </label>
            <select
              className="border px-2 py-1 rounded"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="lowToHigh">
                {t("catalog.Price: Low to High")}
              </option>
              <option value="highToLow">
                {t("catalog.Price: High to Low")}
              </option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="p-3 rounded">
                {Array.isArray(product.images) && product.images.length > 0 ? (
                  <Link to={`/product/${product.id}`}>
                    <div className="relative aspect-[3/4] overflow-hidden bg-secondary/20">
                      <img
                        src={`https://back.aoron.uz/${product.images[0]}`}
                        alt={product.title_en}
                        className="object-cover object-center w-full h-full transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </Link>
                ) : (
                  <div className="h-64 w-full bg-gray-200 flex items-center justify-center mb-2">
                    No Image
                  </div>
                )}
                <h3 className="font-semibold">
                  {product.title_en || product.name_en || "No Title"}
                </h3>
                <p className="text-md font-bold text-black">
                  ${product.price || "0"}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description_en || "No Description"}
                </p>
                <div className="flex gap-2 mt-2">
                  {Array.isArray(product.colors) &&
                    product.colors.map((colorObj, idx) => (
                      <span
                        key={idx}
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: colorObj.color_en }}
                        title={colorObj.color_en}
                      ></span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CatalogPage;
