import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/BreadCrumbs";
import { useQuestionsStore } from "../../store/useContactStore";

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "uz";
  const { sendQuestion, submitting } = useQuestionsStore();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    const res = await sendQuestion(data);
    if (res.ok) {
      alert("Xabaringiz muvaffaqiyatli yuborildi!");
      reset();
    } else {
      alert(res.error || "Xatolik yuz berdi");
    }
  };
  const addres = {
    addres: {
      title: {
        uz: "Manzil",
        ru: "Адрес",
        en: "Address",
      },
      link: {
        uz: "Xorazm viloyati, Xiva, Boltaev ko'chasi, 41-uy",
        ru: "Хорезмская область, г. Хива, улица Болтаева, дом 41",
        en: "Khorezm region, Khiva, Boltaev street, house 41",
      },
      linkOne: "https://yandex.uz/maps/-/CXRlV6zP",
    },
    email: {
      title: {
        uz: "Email",
        ru: "Электронная почта",
        en: "Email",
      },
      link: "info@khivamuseum.uz",
    },
    mfo: "00014",
    bank: {
      title: {
        uz: "Bank",
        ru: "Банк",
        en: "Bank",
      },
      text: {
        uz: "Toshkent shahar Markaziy banki",
        ru: "Центральный банк Ташкента",
        en: "Central Bank of Tashkent",
      },
    },
    telefon: {
      title: {
        uz: "Telefon",
        ru: "Телефон",
        en: "Telephone",
      },
      link: "+998 55 604 63 43",
    },
    rs: {
      title: {
        uz: "Hisob Raqam",
        ru: "Номер счета",
        en: "Account Number",
      },
      text: "400121860334067082200349001",
    },
    inn: {
      title: {
        uz: "INN (STIR)",
        ru: "ИНН (ЖИН)",
        en: "INN (TIN)",
      },
      text: "201126524",
    },
    telFaks: {
      title: {
        uz: "Tel/faks",
        ru: "Тел./факс",
        en: "Tel/fax",
      },
      link: "+998 91 857 45 44",
    },
  };
  return (
    <div className="container1">
      <div>
        <Breadcrumbs />
      </div>
      <div className="pt-4 pb-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4">
          <div>
            <p className="font-bold text-2xl leading-[130%] pb-2 text-link-hover">
              {addres.addres.title[currentLang]}
            </p>
            <Link
              to={addres.addres.linkOne}
              className="font-medium text-lg leading-[150%] hover:text-link-hover transition-colors duration-300"
            >
              {addres.addres.link[currentLang]}
            </Link>
          </div>
          <div>
            <p className="font-bold text-2xl leading-[130%] pb-2 text-link-hover">
              {addres.email.title[currentLang]}
            </p>
            <Link
              to={addres.email.link}
              className="font-medium text-lg leading-[150%] hover:text-link-hover transition-colors duration-300"
            >
              {addres.email.link}
            </Link>
          </div>
          <div>
            <p className="font-bold text-2xl leading-[130%] pb-2 text-link-hover">
              MFO
            </p>
            <p className="font-medium text-lg leading-[150%]">{addres.mfo}</p>
          </div>
          <div>
            <p className="font-bold text-2xl leading-[130%] pb-2 text-link-hover">
              {addres.bank.title[currentLang]}
            </p>
            <p className="font-medium text-lg leading-[150%]">
              {addres.bank.text[currentLang]}
            </p>
          </div>
          <div>
            <p className="font-bold text-2xl leading-[130%] pb-2 text-link-hover">
              {addres.telefon.title[currentLang]}
            </p>
            <Link
              to={`tel: ${addres.telefon.link}`}
              className="font-medium text-lg leading-[150%] hover:text-link-hover transition-colors duration-300"
            >
              {addres.telefon.link}
            </Link>
          </div>
          <div>
            <p className="font-bold text-2xl leading-[130%] pb-2 text-link-hover">
              {addres.rs.title[currentLang]}
            </p>
            <p className="font-medium text-lg leading-[150%] break-all">
              {addres.rs.text}
            </p>
          </div>
          <div>
            <p className="font-bold text-2xl leading-[130%] pb-2 text-link-hover">
              {addres.inn.title[currentLang]}
            </p>
            <p className="font-medium text-lg leading-[150%]">
              {addres.inn.text}
            </p>
          </div>
          <div>
            <p className="font-bold text-2xl leading-[130%] pb-2 text-link-hover">
              {addres.telFaks.title[currentLang]}
            </p>
            <Link
              to={`tel: ${addres.telFaks.link}`}
              className="font-medium text-lg leading-[150%] hover:text-link-hover transition-colors duration-300"
            >
              {addres.telFaks.link}
            </Link>
          </div>
        </div>
      </div>
      <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <div>
            <h1 className="font-bold text-2xl leading-[110%] py-4 md:pt-0">
              Xaritada biz!
            </h1>
          </div>
          <div className="border-2 border-link-hover rounded-lg overflow-hidden">
            <iframe
              src="https://yandex.uz/map-widget/v1/?ll=60.358076%2C41.378998&z=17.73&pt=60.358076%2C41.378998%2Cpm2rdm"
              width="100%"
              height="400"
              frameBorder="0"
              allowFullScreen={true}
            ></iframe>
          </div>
        </div>
        <div className="col-span-1">
          <div>
            <h1 className="font-bold text-2xl leading-[110%] py-4 md:pt-0">
              {t("contact.questions")}
            </h1>
          </div>
          <div className="">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex flex-col gap-1 col-span-1">
                <label
                  htmlFor="name"
                  className="font-medium text-lg leading-[130%]"
                >
                  {t("contact.name")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t("contact.namePlac")}
                  {...register("firstName", { required: true })}
                  className="outline-none px-4 py-2 border border-gray-400 focus:border-link-hover rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-1 col-span-1">
                <label
                  htmlFor="surName"
                  className="font-medium text-lg leading-[130%]"
                >
                  {t("contact.surName")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t("contact.surNamePlac")}
                  {...register("lastName", { required: true })}
                  className="outline-none px-4 py-2 border border-gray-400 focus:border-link-hover rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-1 col-span-1">
                <label
                  htmlFor="phone"
                  className="font-medium text-lg leading-[130%]"
                >
                  {t("contact.telefon")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder={t("contact.telefonPlac")}
                  {...register("phone", { required: true })}
                  className="outline-none px-4 py-2 border border-gray-400 focus:border-link-hover rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-1 col-span-1">
                <label
                  htmlFor="email"
                  className="font-medium text-lg leading-[130%]"
                >
                  {t("contact.email")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder={t("contact.emailPlac")}
                  {...register("email", { required: true })}
                  className="outline-none px-4 py-2 border border-gray-400 focus:border-link-hover rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-1 col-span-1 md:col-span-2">
                <label
                  htmlFor="message"
                  className="font-medium text-lg leading-[130%]"
                >
                  {t("contact.message")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  id="message"
                  placeholder={t("contact.messagePlac")}
                  {...register("message", { required: true })}
                  className="outline-none px-4 py-2 border border-gray-400 focus:border-link-hover rounded-lg min-h-36"
                ></textarea>
              </div>
              <div className="flex items-center justify-end col-span-1 md:col-span-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-link-hover rounded-lg font-medium text-base text-white"
                >
                  {submitting ? "Yuborilmoqda..." : "Yuborish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
