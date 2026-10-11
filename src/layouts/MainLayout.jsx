import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ArrowUp from "../components/Footer/ScrollToTop";

export default function MainLayout() {
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
