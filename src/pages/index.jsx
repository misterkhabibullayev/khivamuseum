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
const Verify_OTP_Page = lazy(() => import("./Verify-OTP-Page"));
const TicketsPage = lazy(() => import("./TicketsPage"));

export {
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
};
