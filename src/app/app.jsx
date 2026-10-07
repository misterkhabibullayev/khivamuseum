import { Suspense } from "react";
import { router } from "../routes/router";
import { useRoutes } from "react-router-dom";

export default function App() {
  const routes = useRoutes(router);
  return (
    <>
      <Suspense fallback={<div>loading</div>}>{routes}</Suspense>
    </>
  );
}
