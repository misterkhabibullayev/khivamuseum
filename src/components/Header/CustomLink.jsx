import { Link, useParams } from "react-router-dom";

export default function CustomLink({
  to = "/",
  children,
  className,
  ...props
}) {
  const { lang } = useParams();
  const currentLang = lang || "uz";

  const isExternal =
    typeof to === "string" &&
    (to.startsWith("http") ||
      to.startsWith("mailto:") ||
      to.startsWith("tel:"));

  if (isExternal) {
    return (
      <a href={to} className={className} {...props}>
        {children}
      </a>
    );
  }

  const path = typeof to === "string" ? to : "/";
  const targetPath =
    path === "/"
      ? `/${currentLang}`
      : `/${currentLang}${path.startsWith("/") ? path : `/${path}`}`;

  return (
    <Link to={targetPath} className={className} {...props}>
      {children}
    </Link>
  );
}
