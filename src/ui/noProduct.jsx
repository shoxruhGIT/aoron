import React from "react";
import NoData from "../assets/nodata.png";
import { useTranslation } from "react-i18next";

const NoProduct = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center py-16">
      <img src={NoData} alt="nodata png" className="mx-auto w-20" />
      <p className="text-gray-500 mt-2">{t("noProduct.title")}</p>
    </div>
  );
};

export default NoProduct;
