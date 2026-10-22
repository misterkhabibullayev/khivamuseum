import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import MainLoading from "../components/MainLoding";
import { router } from "../routes/router";

export default function App() {
  const routes = useRoutes(router);

  return (
    <>
      <Suspense fallback={<MainLoading />}>{routes}</Suspense>
    </>
  );
}
