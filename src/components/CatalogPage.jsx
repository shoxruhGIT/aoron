import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CatalogPage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("lowToHigh");

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const fetchProducts = () => {
    let url = "https://back.ifly.com.uz/api/product?";

    if (selectedCategory) url += `category=${selectedCategory}&`;
    if (selectedSize) url += `size=${selectedSize}&`;
    if (selectedColor) url += `color=${selectedColor}&`;

    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        const productList = response?.data?.products || [];
        const sorted = [...productList].sort((a, b) =>
          sortOrder === "lowToHigh" ? a.price - b.price : b.price - a.price
        );
        setProducts(sorted);
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
          <h1 className="text-3xl font-bold mb-4">{t("OUR COLLECTION")}</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("Browse our collection of premium menswear, designed with quality and style in mind.")}
          </p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar filters */}
        <aside className="w-64  pr-4">
          <h2 className="font-semibold text-lg mb-2">{t("Categories")}</h2>
          <ul className="space-y-1">
            {["", "t-shirts", "shorts", "suits"].map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`block w-full text-left px-2 py-1 rounded hover:bg-accent ${
                    selectedCategory === cat ? "bg-primary text-white" : ""
                  }`}
                >
                  {cat === "" ? t("View All Products") : cat}
                </button>
              </li>
            ))}
          </ul>

          <h2 className="font-semibold text-lg mt-6 mb-2">{t("Sizes")}</h2>
          <button
            onClick={() => setSelectedSize("44-52")}
            className={`px-3 py-1 rounded border ${
              selectedSize === "44-52" ? "bg-primary text-white" : ""
            }`}
          >
            44–52
          </button>

          <h2 className="font-semibold text-lg mt-6 mb-2">{t("Colors")}</h2>
          <div className="flex flex-wrap gap-2">
            {["black", "white", "gray", "blue", "yellow", "brown"].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1 border rounded ${
                  selectedColor === color ? "bg-primary text-white" : ""
                }`}
              >
                {color}
              </button>
            ))}
          </div>

          <button
            onClick={handleClearFilters}
            className="text-red-500 mt-4 underline"
          >
            {t("Clear filters")}
          </button>
        </aside>

        {/* Product list */}
        <div className="flex-1">
          <div className="flex justify-end mb-4">
            <label className="text-sm font-medium mr-2">{t("Sort by")}:</label>
            <select
              className="border px-2 py-1 rounded"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="lowToHigh">{t("Price: Low to High")}</option>
              <option value="highToLow">{t("Price: High to Low")}</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className=" p-3 rounded">
                {Array.isArray(product.images) && product.images.length > 0 ? (
                  <img
                    src={`https://back.ifly.com.uz/${product.images[0]}`}
                    alt={product.title_en}
                    className="h-64 w-full object-cover mb-2"
                  />
                ) : (
                  <div className="h-64 w-full bg-gray-200 flex items-center justify-center mb-2">
                    No Image
                  </div>
                )}
                <h3 className="font-semibold">{product.title_en || product.name_en || "No Title"}</h3>
                <p className="text-md font-bold text-black  line-clamp-2">
                  ${product.price || "0"}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description_en || "No Description"}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold">{Array.isArray(product.colors)
                      ? product.colors.join(", ")
                      : "No Colors"}</span>
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ backgroundColor: product.color }}
                  ></span>
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
