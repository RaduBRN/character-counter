import useThemeStore from "../store/themeStore";
import Header from "./Header";
import InputText from "./InputText";
import Navbar from "./Navbar";
import TextInfo from "./TextInfo";

function App() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <main className={`${theme} app-background`}>
      <div className="font-dmSans max-w-[375px] md:max-w-[768px] lg:max-w-[990px] mx-auto py-5 px-5 md:px-7 flex flex-col gap-8">
        <Navbar />
        <Header />
        <InputText />
        <TextInfo />
      </div>
    </main>
  );
}

export default App;
