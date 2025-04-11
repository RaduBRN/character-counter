import CardInfo from "./CardInfo";
import LetterDensity from "./LetterDensity";

function TextInfo() {
  return (
    <div className="flex flex-col gap-6 text-[#12131A]">
      <div className="flex flex-col md:flex-row gap-4">
        <CardInfo />
      </div>
      <h2 className="text-[24px] font-semibold leading-[130%] tracking-[-1px] dark:text-[#E4E4EF]">
        Letter Density
      </h2>
      <LetterDensity />
    </div>
  );
}

export default TextInfo;
