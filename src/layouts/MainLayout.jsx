import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ArrowUp from "../components/Footer/ScrollToTop";
import { useEffect } from "react";

export default function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div>
        <Header />
        <main className="bg-light-second dark:bg-dark-second transition-all duration-300">
          <Outlet />
        </main>
        <ArrowUp />
        <Footer />
      </div>
    </>
  );
}
