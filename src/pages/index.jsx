import { lazy } from "react";

const HomePage = lazy(() => import("./HomePage"));
const AboutPage = lazy(() => import("./AboutPage"));

export { HomePage, AboutPage };
