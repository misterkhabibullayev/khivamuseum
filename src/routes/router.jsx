import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
  AboutPage,
  AnnounCementsDetPage,
  AnnouncementsPage,
  CollectionDetailesPage,
  CollectionsPage,
  ContactPage,
  EmployeesPage,
  GalleryPage,
  HomePage,
  LoginPage,
  NewsDetailesPage,
  NewsPage,
  ProfilePage,
  RegisterPage,
  TicketsPage,
  Verify_OTP_Page,
} from "../pages";
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
          {
            path: "collections",
            element: <CollectionsPage />,
          },
          {
            path: "collections/:coldetailes",
            element: <CollectionDetailesPage />,
          },
          {
            path: "gallery",
            element: <GalleryPage />,
          },
          {
            path: "news",
            element: <NewsPage />,
          },
          {
            path: "news/:newsDetails",
            element: <NewsDetailesPage />,
          },
          {
            path: "announcements",
            element: <AnnouncementsPage />,
          },
          {
            path: "announcements/:announDet",
            element: <AnnounCementsDetPage />,
          },
          {
            path: "employees",
            element: <EmployeesPage />,
          },
          {
            path: "contact",
            element: <ContactPage />,
          },
          {
            path: "tickets",
            element: <TicketsPage />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
          {
            path: "register/:verify",
            element: <Verify_OTP_Page />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
];
