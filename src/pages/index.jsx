import { lazy } from "react";

const HomePage = lazy(() => import("./HomePage"));
const AboutPage = lazy(() => import("./AboutPage"));
const EmployeesPage = lazy(() => import("./EmployesPage"));
const CollectionsPage = lazy(() => import("./CollectionsPage"));
const CollectionDetailesPage = lazy(() => import("./CollectionsDetPage"));
const GalleryPage = lazy(() => import("./GalleryPage"));
const NewsPage = lazy(() => import("./NewsPage"));
const NewsDetailesPage = lazy(() => import("./NewsDetailesPage"));
const AnnouncementsPage = lazy(() => import("./AnnounCementsPage"));
const AnnounCementsDetPage = lazy(() => import("./AnnouncementsDetPage"));
const ContactPage = lazy(() => import("./ContactPage"));
const ProfilePage = lazy(() => import("./ProfilePage"));
const LoginPage = lazy(() => import("./LoginPage"));
const RegisterPage = lazy(() => import("./RegisterPage"));
const TicketsPage = lazy(() => import("./TicketsPage"));

export {
  HomePage,
  AboutPage,
  EmployeesPage,
  CollectionsPage,
  CollectionDetailesPage,
  GalleryPage,
  NewsPage,
  NewsDetailesPage,
  AnnouncementsPage,
  AnnounCementsDetPage,
  ContactPage,
  ProfilePage,
  LoginPage,
  RegisterPage,
  TicketsPage,
};
