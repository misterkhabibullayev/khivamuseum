import { Calendar, Check } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import Breadcrumbs from "../../components/BreadCrumbs";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import { useEmployeesStore } from "../../store/useEmployeesStore";
import { formatDate } from "../../utils/formatDate";

export default function EmployeesPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "uz";
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { employees, totalPages, loading, error, getEmployees } =
    useEmployeesStore();

  useEffect(() => {
    getEmployees(currentPage);
  }, [currentPage, getEmployees]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="container1">
      <div>
        <Breadcrumbs />
      </div>
      <div className="flex items-center justify-center pb-8">
        <h2 className="font-bold text-3xl md:text-4xl">
          {t("breadCrumbs.employees")}
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {employees.map((item) => (
          <div
            key={item.id}
            className="p-2 rounded-lg bg-light-main dark:bg-dark-main shadow-lg"
          >
            <div className="w-full flex items-center justify-center py-4">
              <div className="w-25 h-25 rounded-full overflow-hidden">
                <img
                  src={item.images[0].url}
                  alt={item.fullName}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div>
              <h1 className="font-medium text-lg leading-[110%] text-center min-h-10">
                {item.fullName}
              </h1>
              <p className="font-medium text-sm leading-[130%] text-center py-2 min-h-17.5">
                {item.position[currentLang]}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm leading-[150%]">
                  <Calendar className="w-4 h-4" />
                  {formatDate(item.birthDate)}
                </div>
                <div>
                  <Check className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center pt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
}
