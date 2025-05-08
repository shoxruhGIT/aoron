import React from "react";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const values = [
    {
      title: t("about.values.title"),
      description: t("about.values.description"),
    },
    {
      title: t("about.values.title2"),
      description: t("about.values.description2"),
    },
    {
      title: t("about.values.title3"), 
      description: t("about.values.description3"), 
    },
  ];
  const teamMembers = [
    {
      name: t("about.name"),
      role: t("about.role"),
      image: "https://back.aoron.uz/0d6da4f2-78cf-4458-9fc6-7c98783ed79e.jpeg",
    },
    {
      name: t("about.name2") ,
      role: t("about.role2"),
      image: "https://back.aoron.uz/bf22c304-3c26-404c-adee-fa04945aaa19.png",
    },
   
  ];
  return (
    <>
    <section className="py-10 mt-20 md:py-16 bg-neutral-50 border-b">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="rounded-2xl shadow-lg p-8 md:p-12 space-y-10 bg-white text-neutral-900">
      
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">{t("about.h2")}</h2>
            <p className="text-lg text-neutral-700">
            {t("about.p1")}
            </p>

            <h3 className="text-xl font-bold text-primary mt-6">{t("about.h3")}</h3>
            <ul className="list-disc list-inside space-y-1 text-neutral-800 pl-4">
              <li>{t("about.li")}</li>
              <li>{t("about.li2")}</li>
            </ul>
            <hr className="border-t border-neutral-300 my-4" />
          </div>

          
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">{t("about.h4")}</h2>
            <p className="text-lg text-neutral-700">
            {t("about.p2")}
            </p>

            <h3 className="text-xl font-bold text-primary mt-6">{t("about.ul.title")}</h3>
            <ul className="list-disc list-inside space-y-1 text-neutral-800 pl-4">
              <li>{t("about.ul.li1")}</li>
              <li>{t("about.ul.li2")}</li>
              <li>{t("about.ul.li3")}</li>
              <li>{t("about.ul.li4")}</li>
            </ul>

            <hr className="border-t border-neutral-300 my-4" />

            <h3 className="text-xl font-bold text-primary mt-6">{t("about.ul2.title")}</h3>
            <ul className="list-disc list-inside space-y-1 text-neutral-800 pl-4">
              <li>{t("about.ul2.li1")}</li>
              <li>{t("about.ul2.li2")}</li>
              <li>{t("about.ul2.li3")}</li>
              <li>{t("about.ul2.li4")}</li>
              <li>{t("about.ul2.li5")}</li>
            </ul>

            <hr className="border-t border-neutral-300 my-4" />

            <h3 className="text-xl font-bold text-primary mt-6">{t("about.ul3.title")}</h3>
            <p className="text-lg text-neutral-700">{t("about.ul3.li1")}</p>
            <ul className="list-disc list-inside space-y-1 text-neutral-800 pl-4">
              <li>{t("about.ul3.li1")}</li>
              <li>{t("about.ul3.li2")}</li>
              <li>{t("about.ul3.li3")}</li>
              <li>{t("about.ul3.li4")}</li>
            </ul>

            <hr className="border-t border-neutral-300 my-4" />

            <h3 className="text-xl font-bold text-primary mt-6">{t("about.ul4.title")}</h3>
            <p className="text-lg text-neutral-700">{t("about.ul4.text")}</p>
            <ul className="list-disc list-inside space-y-1 text-neutral-800 pl-4">
              <li>{t("about.ul4.li1")}</li>
              <li>{t("about.ul4.li2")}</li>
              <li>{t("about.ul4.li3")}</li>
              <li>{t("about.ul4.li4")}</li>
              <li>{t("about.ul4.li5")}</li>
            </ul>

            <hr className="border-t border-neutral-300 my-4" />

            <p className="text-lg text-neutral-900">📞 {t("about.ul4.p")}</p>
          </div>
        </div>
      </div>
    </section>
     <section className="py-16 bg-primary text-primary-foreground">
     <div className="container mx-auto px-4 text-center">
       <div className="max-w-3xl mx-auto">
         <h2 className="heading-md mb-6 text-white">{t("about.our")}</h2>
         <p className="text-xl font-light leading-relaxed">
           {t("about.p")}
         </p>
       </div>
     </div>

   </section>
   <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="heading-md mb-10 text-center">{t("about.values.text")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center space-y-4 p-6 transition-all hover:bg-secondary/50 rounded-lg"
            >
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="heading-md mb-10 text-center text-black">{t("about.text")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="aspect-square overflow-hidden rounded-full max-w-[200px] mx-auto">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-lg text-black">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
   </>
  );
};

export default AboutPage;
