import { Link } from "react-router-dom";
import { Icons } from "../../icons/icons";

export default function Header() {
  return (
    <>
      <div className="container1">
        <div className="flex items-center justify-between py-2 text-base">
          <div className="flex items-center gap-x-2 xl:gap-x-5">
            <div>
              <Link to={"/"}>
                <img src="/Images/logo.png" alt="" className="h-17.5" />
              </Link>
            </div>
            <div>
              <Link
                to={"https://khiva360.nazzar.uz/"}
                target="_blank"
                className="flex items-center gap-x-2"
              >
                <Icons.vrIcon />
                <span>Khiva 360°</span>
              </Link>
            </div>
            <div>
              <Link
                to={"https://khivamuseumshop.uz/main/home"}
                target="_blank"
                className="flex items-center gap-x-2"
              >
                <Icons.shopIcon />
                <span>Khiva Museum Shop</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <Link
                to={"https://www.youtube.com/@khivamuseaum.2025"}
                className="inline-block p-2"
              >
                <Icons.youtubeIcon />
              </Link>
              <Link
                to={"https://www.instagram.com/khivamuseumuzb"}
                className="inline-block p-2"
              >
                <Icons.instagramIcon />
              </Link>
              <Link
                to={"mailto: info@khivamuseum.uz"}
                className="inline-block p-2"
              >
                <Icons.mailIcon />
              </Link>
              <Link
                to={"tel: +998556046343"}
                className="flex items-center p-2 gap-1"
              >
                <Icons.phoneIcon />
                <span>+998556046343</span>
              </Link>
            </div>
            <div>
              <button className="cursor-pointer p-2">
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-1">
                    <span className="fi fi-uz fis rounded-full text-xl"></span>
                    <span>O'zbek</span>
                  </div>
                  <div>
                    <Icons.downArrowIcon />
                  </div>
                </div>
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
