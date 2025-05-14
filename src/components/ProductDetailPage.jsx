import React, { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import { useWishlist } from "../hooks/useWishlist";
import { Toaster, toast } from "sonner";

const ProductDetailPage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const [activeSize, setActiveSize] = useState(null);
  const [activeColor, setActiveColor] = useState([]);

  const { id } = useParams();
  const { toggleWishlist } = useWishlist();

  const product = featuredProducts.filter((pdct) => pdct.id === parseInt(id));

  const updatedProduct =
    product.length > 0
      ? {
          ...product[0],
          activeColor: activeColor,
          activeSize: activeSize,
          quantity: quantity,
        }
      : null;

  const getFeaturedPrd = () => {
    fetch("https://testaoron.limsa.uz/api/product?page=1&limit=4")
      .then((data) => data.json())
      .then((data) => {
        if (data.success) {
          setFeaturedProducts(data.data.products);
        }
      });
  };

  useEffect(() => {
    getFeaturedPrd();
  }, []);

  return (
    <main className="w-full grow pt-18">
      <Toaster position="bottom-right" className="bg-blue-500" />
      <section className="max-w-[1400px] mx-auto px-4 py-8">
        {product?.map((product) => (
          <div
            key={product?.id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            <div className="space-x-4">
              <div className="aspect-square bg-secondary/20 overflow-hidden">
                <img
                  className="w-full h-full object-cover object-center transition-all duration-300"
                  src={`https://testaoron.limsa.uz/${product?.images[0]}`}
                  alt={product?.title_en}
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-4">
              <h1 className="text-3xl ">{product?.title_en}</h1>
              <p className="text-2xl font-medium">${product?.price}</p>
              <p className="text-muted-foreground">{product?.description_en}</p>
              <div className="">
                <h3 className="text-sm font-medium mb-1">Material</h3>
                {product?.materials.length > 0 ? (
                  product?.materials?.map((material) => (
                    <p
                      key={material?.name}
                      className="text-sm text-muted-foreground"
                    >
                      {material?.name} {material?.value}%
                    </p>
                  ))
                ) : (
                  <p>No materials</p>
                )}
              </div>
              <div className="">
                <h3 className="text-sm font-medium mb-1">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product?.sizes
                    ?.slice()
                    .sort((a, b) => a.size.localeCompare(b.size))
                    .map((item) => (
                      <button
                        onClick={() => setActiveSize(item?.size)}
                        key={item?.id}
                        className={`min-w-[3rem] p-2 text-sm border rounded-md transition-all ${
                          activeSize === item?.size
                            ? "bg-primary text-white border-primary"
                            : "hover:border-primary/50 hover:bg-primary hover:text-white"
                        }  cursor-pointer`}
                      >
                        {item?.size}
                      </button>
                    ))}
                </div>
              </div>
              <div className="">
                <h3 className="text-sm font-medium mb-1">Color</h3>
                <div className="flex items-center space-x-1 mt-2">
                  {product?.colors?.map((color) => (
                    <button
                      key={color?.id}
                      onClick={() => setActiveColor(color)}
                      className={`w-7 h-7 rounded-full ${
                        activeColor === color
                          ? "ring-2 ring-primary"
                          : "hover:ring-2 hover:ring-primary"
                      }  cursor-pointer`}
                      style={{
                        backgroundColor: `${color?.color_en}`,
                      }}
                    ></button>
                  ))}
                </div>
              </div>
              <div className="">
                <h3 className="text-sm font-medium mb-1">Quantity</h3>
                <div className="flex items-center border border-input rounded-md w-32">
                  <button
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      }
                    }}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer disabled:opacity-50"
                  >
                    <FiMinus />
                  </button>
                  <input
                    type="number"
                    className="w-12 h-10 text-center border-none focus:outline-none"
                    min={1}
                    value={quantity}
                    onChange={(e) => {
                      const value = Math.max(
                        1,
                        Number.parseInt(e.target.value) || 1
                      );
                      setQuantity(value);
                    }}
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  if (!activeSize) {
                    toast.error("Please select a size");
                    return;
                  }
                  if (!activeColor) {
                    toast.error("Please select a color");
                    return;
                  }
                  toggleWishlist(updatedProduct, quantity);
                  toast.success("Added to Cart");
                }}
                className="w-full bg-black text-white cursor-pointer rounded-sm hover:opacity-80 transition-colors py-4"
              >
                Add to Cart
              </button>
              <div className="w-full border-t border-border pt-4 space-y-4">
                <div className="">
                  <button className="flex justify-between items-center w-full py-2">
                    <h3 className="text-sm font-medium">Product Details</h3>
                    <FaChevronUp />
                  </button>
                  <div className="py-3 text-sm text-muted-foreground animate-accordion-down">
                    <p>
                      This contains suits Вискоза: 100%, ensuring both comfort
                      and durability. Designed with attention to detail, it
                      features:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Regular fit for everyday comfort</li>
                      <li>High-quality stitching for durability</li>
                      <li>
                        Color:{" "}
                        {product?.colors?.map((color) => color?.color_en)}
                      </li>
                      <li>
                        Size:{" "}
                        {product?.sizes
                          ?.slice()
                          ?.sort((a, b) => a.size.localeCompare(b.size))
                          .map((size) => size?.size)
                          .join(" - ")}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className="max-w-[1400px] mx-auto px-4 py-8 mt-20">
        <h2 className="text-3xl mb-8">You may also like</h2>
        <div className="product-grid">
          {featuredProducts?.slice(0, 4)?.map((product) => (
            <ProductItem product={product} type="new" key={product.id} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductDetailPage;
