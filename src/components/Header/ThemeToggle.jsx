import { Icons } from "../../icons/icons";
import { useThemeStore } from "../../store/useThemeStore";

function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="flex items-center transition-all duration-300">
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={`relative flex items-center w-12 h-6 rounded-full p-0.5 cursor-pointer transition-colors duration-300 ${
          theme === "dark" ? "bg-dark-second" : "bg-link-hover"
        }`}
      >
        <div
          className={`flex items-center justify-center w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
            theme === "dark" ? "translate-x-6" : "translate-x-0"
          }`}
        >
          {theme === "light" ? (
            <Icons.sunIcon className="text-link-hover w-3.5 h-3.5 transition-opacity duration-300" />
          ) : (
            <Icons.moonIcon className="text-dark-main w-3.5 h-3.5 transition-opacity duration-300" />
          )}
        </div>
      </button>
    </div>
  );
}

export default ThemeToggle;
