import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/footer";
import Header from "../components/Header/header";

export default function MainLayout() {
  return (
    <>
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
