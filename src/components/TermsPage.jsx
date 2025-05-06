import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const TermsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main className="grow pt-16">
      <div className="py-10 mt-4 md:py-14 bg-neutral-50">
        <div className="max-w-[800px] mx-auto px-4">
          <div className="rounded-2xl shadow-lg p-4 md:p-6 space-y-8 bg-white text-neutral-900 ">
            <h1 className="text-3xl font-semibold text-center">
              {t("terms.title")}
            </h1>
            <div className="flex flex-col items-start gap-4">
              <p className="text-xl">{t("terms.p1")}</p>
              <p className="text-xl">{t("terms.p2")}</p>
              <p className="text-xl">{t("terms.p3")}</p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="cursor-pointer rounded-sm w-[200px] h-[40px] bg-secondary hover:bg-accent-foreground hover:text-white transition-all duration-300"
            >
              {t("terms.back")}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsPage;
