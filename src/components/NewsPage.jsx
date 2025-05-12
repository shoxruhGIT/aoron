import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";
  const navigate = useNavigate();

  const getNews = () => {
    fetch("https://testaoron.limsa.uz/api/news")
      .then((res) => res.json())
      .then((data) => {
        setNews(data?.data);
      })
      .catch((err) => console.error("Xatolik:", err));
  };

  useEffect(() => {
    getNews();
  }, []);

  const getLocalizedField = (item, field) => {
    const supportedLangs = ["en", "ru", "de"];
    const currentLang = supportedLangs.includes(lang) ? lang : "en";
    return item[`${field}_${currentLang}`];
  };

  const getImageUrl = (filename) => `https://testaoron.limsa.uz/${filename}`;

  const handleClick = (id) => {
    navigate(`/news/${id}`);
  };

  if (!news) {
    return (
      <div className="w-full h-screen pt-45">
        <div className="mx-auto">
          <img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'><circle cx='50' cy='50' fill='none' stroke='%233b82f6' stroke-width='10' r='35' stroke-dasharray='164.93361431346415 56.97787143782138'><animateTransform attributeName='transform' type='rotate' repeatCount='indefinite' dur='1s' values='0 50 50;360 50 50' keyTimes='0;1'/></circle></svg>"
            alt="Loading..."
            className="mx-auto"
          />
        </div>
      </div>
    );
  }

  return (
    <main className="w-full grow pt-16">
      <section className="bg-secondary mt-5 py-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800">
            {t("news.title")}
          </h1>
          <p className="text-center text-xl mt-2 font-medium text-gray-600">
            {t("news.text")}
          </p>

          <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <div
                key={item.id}
                onClick={() => handleClick(item.id)}
                className="bg-white rounded-2xl overflow-hidden group shadow hover:shadow-lg transition duration-700 cursor-pointer hover:-translate-y-2"
              >
                <div className="w-full h-50 overflow-hidden">
                  <img
                    src={getImageUrl(item.image)}
                    alt={getLocalizedField(item, "title")}
                    className="w-full h-full group-hover:scale-110 duration-500 object-cover rounded mb-4"
                  />
                </div>
                <div className="m-4">
                  <h2 className="text-lg font-bold mb-2 group-hover:text-blue-500 duration-500">
                    {getLocalizedField(item, "title")}
                  </h2>
                  <p className="text-gray-600 line-clamp-4">
                    {getLocalizedField(item, "description")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewsPage;
