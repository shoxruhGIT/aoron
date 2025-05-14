import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import NoProduct from "../ui/noProduct";

const CatalogPage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const [category, setCategory] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [colors, setColors] = useState(null);
  console.log(colors);

  const currentLng = localStorage.getItem("i18nextLng");

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);

  const fetchProducts = () => {
    const baseURL = "https://testaoron.limsa.uz/api/product";
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

  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(
        "https://testaoron.limsa.uz/api/category"
      );
      const sizes = await axios.get("https://testaoron.limsa.uz/api/sizes");
      const colors = await axios.get("https://testaoron.limsa.uz/api/colors");

      setColors(colors?.data?.data);
      setSizes(sizes?.data?.data);
      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [sortOrder, selectedCategory, selectedSize, selectedColor]);

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedSize("");
    setSelectedColor("");
  };

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory && selectedCategory !== "suits") {
        return product.category_id === selectedCategory;
      }
      return true;
    })
    .filter((product) => {
      if (selectedSize.length === 0) return true;
      const productSizeId = product?.sizes?.map((size) => size?.id);
      return selectedSize?.some((id) => productSizeId?.includes(id));
    })

    .filter((product) => {
      if (selectedColor.length === 0) return true;

      const productColorId = product?.colors?.map((color) => color?.id);
      return selectedColor?.some((id) => productColorId?.includes(id));
    })
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });

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
            <li>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`block w-full text-left px-2 py-1 rounded cursor-pointer ${
                  selectedCategory === null
                    ? "bg-primary text-white"
                    : "hover:bg-accent"
                }`}
              >
                {t("catalog.all")}
              </button>
            </li>
            {category?.slice(0, 3).map((cat) => (
              <li key={cat?.id}>
                <button
                  onClick={() => setSelectedCategory(cat?.id)}
                  className={`block w-full text-left px-2 py-1 rounded cursor-pointer ${
                    selectedCategory === cat?.id
                      ? "bg-primary text-white"
                      : "hover:bg-accent"
                  }`}
                >
                  {currentLng === "en"
                    ? cat.name_en
                    : currentLng === "ru"
                    ? cat.name_ru
                    : cat.name_de}
                </button>
              </li>
            ))}
          </ul>

          <h2 className="font-semibold text-lg mt-6 mb-2">
            {t("catalog.Sizes")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {sizes?.map((size) => (
              <button
                key={size?.id}
                onClick={() =>
                  setSelectedSize((prev) =>
                    prev.includes(size?.id)
                      ? prev.filter((id) => id !== size?.id)
                      : [...prev, size?.id]
                  )
                }
                className={`px-3 py-1 rounded border cursor-pointer ${
                  selectedSize.includes(size?.id)
                    ? "bg-primary text-white"
                    : "hover:bg-primary hover:text-white"
                }`}
              >
                {size?.size}
              </button>
            ))}
          </div>

          <h2 className="font-semibold text-lg mt-6 mb-2">
            {t("catalog.Colors")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {colors?.map((color) => (
              <button
                key={color?.id}
                onClick={() =>
                  setSelectedColor((prev) =>
                    prev.includes(color?.id)
                      ? prev.filter((id) => id !== color?.id)
                      : [...prev, color?.id]
                  )
                }
                className={`flex items-center space-x-1 px-3 py-1 text-xs rounded-md border transition-colors border-input cursor-pointer  ${
                  selectedColor?.includes(color?.id)
                    ? "bg-primary text-white"
                    : "hover:bg-secondary"
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full border border-gray-200"
                  style={{ backgroundColor: color?.color_en }}
                ></div>
                <span>
                  {currentLng === "en"
                    ? color?.color_en
                    : currentLng === "ru"
                    ? color?.color_ru
                    : color?.color_de}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={handleClearFilters}
            className="text-red-500 mt-4 underline cursor-pointer"
          >
            {t("catalog.Clear filters")}
          </button>
        </aside>

        {/* Product list */}
        <div className="w-full flex-1">
          <div className="hidden md:flex justify-between items-center mb-6">
            <span className="text-sm text-muted-foreground">
              {t("catalog.showing")} {products.length} {t("catalog.product")}
            </span>
            <div className="flex items-center space-x-2">
              <label className="text-sm">{t("catalog.Sort by")}:</label>
              <div className="relative">
                <select
                  className="cursor-pointer bg-secondary text-sm px-2 pr-8 py-2 rounded-md focus:outline-none appearance-none w-full"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="lowToHigh">{t("catalog.lowToHigh")}</option>
                  <option value="highToLow">{t("catalog.highToLow")}</option>
                </select>
              </div>
            </div>
          </div>

          {products.length && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="p-3 rounded">
                  {Array.isArray(product.images) &&
                  product.images.length > 0 ? (
                    <Link to={`/product/${product.id}`}>
                      <div className="relative aspect-[3/4] overflow-hidden bg-secondary/20">
                        <img
                          src={`https://testaoron.limsa.uz/${product.images[0]}`}
                          alt={
                            product[`title_${currentLng}`] || product.title_en
                          }
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
                    {product[`title_${currentLng}`] ||
                      product.title_en ||
                      "No Title"}
                  </h3>
                  <p className="text-md font-bold text-black">
                    ${product.price || "0"}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product[`description_${currentLng}`] || "No Description"}
                  </p>

                  <div className="flex gap-2 mt-2">
                    {Array.isArray(product.colors) &&
                      product.colors.map((colorObj, idx) => (
                        <span
                          key={idx}
                          className="w-4 h-4 rounded-full border"
                          style={{
                            backgroundColor:
                              colorObj[`color_${currentLng}`] ||
                              colorObj.color_en,
                          }}
                          title={
                            colorObj[`color_${currentLng}`] || colorObj.color_en
                          }
                        ></span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <NoProduct />
          )}
        </div>
      </section>
    </main>
  );
};

export default CatalogPage;
