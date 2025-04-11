import useThemeStore from "../store/themeStore";
import LogoLight from "../assets/images/logo-light-theme.svg";
import LogoDark from "../assets/images/logo-dark-theme.svg";
import IconMoon from "../assets/images/icon-moon.svg";
import IconSun from "../assets/images/icon-sun.svg";

function Navbar() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="flex justify-between items-center">
      <div className="w-[185px] md:w-[246px]">
        <img src={theme === "dark" ? LogoDark : LogoLight} alt="Logo" />
      </div>
      <button
        onClick={toggleTheme}
        className="w-[32px] md:w-[44px] h-[32px] md:h-[44px] bg-[#F2F2F7] dark:bg-[#2A2B37] flex items-center justify-center rounded-md cursor-pointer"
      >
        <img
          src={theme === "dark" ? IconSun : IconMoon}
          alt="Theme Toggle"
          className="w-5 md:w-[22px] h-5 md:h-[22px]"
        />
      </button>
    </header>
  );
}

export default Navbar;
