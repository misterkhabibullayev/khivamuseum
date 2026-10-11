import { useRef } from "react";
import { useCountUp } from "react-countup";
import { useTranslation } from "react-i18next";

function StartNumber({ end, duration = 2, suffix = "+" }) {
  const countUpRef = useRef(null);

  useCountUp({
    ref: countUpRef,
    end,
    duration,
    suffix,
    enableScrollSpy: true,
    scrollSpyOnce: true,
  });

  return <span ref={countUpRef} />;
}

export default function StatistikSection() {
  const { t } = useTranslation();
  return (
    <section className="py-20">
      <div className="bg-[url('/Images/khiva-uzbekistan-photos.webp')] md:bg-fixed bg-cover bg-center bg-no-repeat">
        <div className="bg-black/50 py-10 md:py-15">
          <div className="container1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="w-full h-full flex flex-col items-center justify-center py-5 sm:py-20 lg:py-30 border-b lg:border-b-0 sm:border-r lg:border-r border-link-hover ">
                <div className="p-3.75 border border-white rounded-full">
                  <img
                    src="/Images/stat-1.png"
                    alt="stat image"
                    className="h-7.5 aspect-square"
                  />
                </div>
                <h3 className="font-medium text-base text-link-hover mt-4">
                  {t("stat.title1")}
                </h3>
                <span className="font-semibold text-3xl pt-3 text-white">
                  <StartNumber end={3200} />
                </span>
              </div>
              <div className="w-full h-full flex flex-col items-center justify-center py-5 sm:py-20 lg:py-30 border-b lg:border-b-0 lg:border-r border-link-hover ">
                <div className="p-3.75 border border-white rounded-full">
                  <img
                    src="/Images/stat-2.png"
                    alt="stat image"
                    className="h-7.5 aspect-square"
                  />
                </div>
                <h3 className="font-medium text-base text-link-hover mt-4">
                  {t("stat.title2")}
                </h3>
                <span className="font-semibold text-3xl pt-3 text-white">
                  <StartNumber end={500} />
                </span>
              </div>
              <div className="w-full h-full flex flex-col items-center justify-center py-5 sm:py-20 lg:py-30 border-b sm:border-b-0 sm:border-r lg:border-r border-link-hover ">
                <div className="p-3.75 border border-white rounded-full">
                  <img
                    src="/Images/stat-3.png"
                    alt="stat image"
                    className="h-7.5 aspect-square"
                  />
                </div>
                <h3 className="font-medium text-base text-link-hover mt-4">
                  {t("stat.title3")}
                </h3>
                <span className="font-semibold text-3xl pt-3 text-white">
                  <StartNumber end={12000} />
                </span>
              </div>
              <div className="w-full h-full flex flex-col items-center justify-center py-5 sm:py-20 lg:py-30">
                <div className="p-3.75 border border-white rounded-full">
                  <img
                    src="/Images/stat-4.png"
                    alt="stat image"
                    className="h-7.5 aspect-square"
                  />
                </div>
                <h3 className="font-medium text-base text-link-hover mt-4">
                  {t("stat.title4")}
                </h3>
                <span className="font-semibold text-3xl pt-3 text-white">
                  <StartNumber end={85} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
