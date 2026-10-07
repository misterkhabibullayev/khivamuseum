import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { AboutPage, HomePage } from "../pages";
import LanguageWrapper from "./LanguageWrapper";

export const router = [
  {
    path: "/",
    element: <Navigate to="/uz/" replace />,
  },
  {
    path: ":lang",
    element: <LanguageWrapper />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "about",
            element: <AboutPage />,
          },
        ],
      },
    ],
  },
];
