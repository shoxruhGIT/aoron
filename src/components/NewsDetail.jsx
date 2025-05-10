import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const NewsDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  useEffect(() => {
    fetch(`https://testaoron.limsa.uz/api/news/${id}`)
      .then((res) => res.json())
      .then((data) => setNewsItem(data?.data))
      .catch((err) => console.error("Xatolik:", err));
  }, [id]);

  const getLocalizedField = (item, field) => {
    const supportedLangs = ["en", "ru", "de"];
    const currentLang = supportedLangs.includes(lang) ? lang : "en";
    return item[`${field}_${currentLang}`];
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/news");
  };
  const getImageUrl = (filename) => `https://testaoron.limsa.uz/${filename}`;

  if (!newsItem)
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

  return (
    <div className="max-w-6xl mx-auto mt-25 shadow-xl mb-20 p-5 rounded-3xl">
      <button
        onClick={handleClick}
        className="text-blue-700 hover:text-blue-900 my-2 py-1 cursor-pointer"
      >
        ← {t("news.back")}
      </button>
      <img
        src={getImageUrl(newsItem.image)}
        alt={getLocalizedField(newsItem, "title")}
        className="w-full h-80 md:h-130 lg:h-140 object-cover rounded-xl mb-4"
      />
      <div className="">
        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4">
          {getLocalizedField(newsItem, "title")}
        </h2>
        <p className="text-gray-700 text-xl font-[400] leading-relaxed max-w-[95%]">
          {getLocalizedField(newsItem, "description")}
        </p>
      </div>
    </div>
  );
};

export default NewsDetail;
