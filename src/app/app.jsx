import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import MainLoading from "../components/MainLoding";
import { router } from "../routes/router";

const originalFetch = window.fetch;

window.fetch = async (...args) => {
  const response = await originalFetch(...args);

  if (response.status === 401) {
    localStorage.removeItem("client_token");
  }

  return response;
};

export default function App() {
  const routes = useRoutes(router);

  return (
    <>
      <Suspense fallback={<MainLoading />}>{routes}</Suspense>
    </>
  );
}
