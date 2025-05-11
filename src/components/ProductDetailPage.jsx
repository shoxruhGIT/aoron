import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const [featuredProducts, setFeaturedProducts] = useState(null);

  const { id } = useParams();

  // const product = featuredProducts.find(
  //   (product) => product.id === id
  // );
  console.log(featuredProducts.filter((prd) => prd.id === id));

  const getFeaturedPrd = () => {
    fetch("https://back.aoron.uz/api/product?page=1&limit=4")
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
      <section className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <h1>Hey</h1>
        </div>
      </section>
    </main>
  );
};

export default ProductDetailPage;
