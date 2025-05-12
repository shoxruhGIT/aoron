import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ product, type = "usual" }) => {
  const lng = localStorage.getItem("i18nextLng");
  return (
    <div className="group relative animate-fade-in">
      <Link className="block overflow-hidden" to={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary/20">
          <img
            src={`https://testaoron.limsa.uz/${product.images[0]}`}
            alt={product[`title_${lng}`]}
            className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
          {type === "new" && (
            <div className="absolute top-2 left-2 z-10">
              <span className="inline-block bg-primary text-primary-foreground text-xs px-2 py-1 mb-1">
                NEW
              </span>
            </div>
          )}
          <div className="absolute top-2 left-2 z-10" />
        </div>
      </Link>
      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">
            <Link to={`/product/${product.id}`}>{product[`title_${lng}`]}</Link>
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">${product.price}</span>
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
  );
};

export default ProductItem;
