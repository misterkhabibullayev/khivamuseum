import { useEffect, useState } from "react";
import { Icons } from "../../icons/icons";

export default function ArrowUp() {
  const [toTop, setToTop] = useState(false);

  useEffect(() => {
    const toggleToTop = () => {
      if (window.scrollY > 200) {
        setToTop(true);
      } else {
        setToTop(false);
      }
    };
    window.addEventListener("scroll", toggleToTop);

    return () => window.removeEventListener("scroll", toggleToTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-5 md:bottom-7 right-5 md:right-7 z-100 bg-link-hover/80 p-3 rounded-full ${toTop ? "opacity-100" : "opacity-0"}`}
      >
        <Icons.arrowTopIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>
    </>
  );
}