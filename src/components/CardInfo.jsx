import PatternCharacterCount from "../assets/images/pattern-character-count.svg";
import PatternWordCount from "../assets/images/pattern-word-count.svg";
import PatternSentenceCount from "../assets/images/pattern-sentence-count.svg";
import useInputTextInfoStore from "../store/inputTextInfoStore";

function CardInfo() {
  const { totalCharacters, wordCount, sentenceCount } = useInputTextInfoStore();

  const cardData = [
    {
      id: 0,
      title: "Total Characters",
      color: "bg-[#D3A0FA]",
      value: totalCharacters,
      icon: PatternCharacterCount,
    },
    {
      id: 1,
      title: "Word Count",
      color: "bg-[#FF9F00]",
      value: wordCount,
      icon: PatternWordCount,
    },
    {
      id: 2,
      title: "Sentence Count",
      color: "bg-[#FE8159]",
      value: sentenceCount,
      icon: PatternSentenceCount,
    },
  ];

  const renderedCard = cardData.map((item) => (
    <div
      key={item.id}
      className={`${item.color} relative border border-transparent rounded-md px-4 py-6 w-full overflow-hidden`}
    >
      <div className="flex flex-col gap-2 z-10">
        <h4 className="text-[40px] md:text-[64px] font-bold tracking-[-1px] leading-[100%]">
          {item.value}
        </h4>
        <h3 className="text-[20px] tracking-[-0.6px] leading-[140%] z-10">
          {item.title}
        </h3>
      </div>
      <div className="absolute -top-3 md:top-0 -right-14 md:-right-17 lg:-right-7">
        <img src={item.icon} />
      </div>
    </div>
  ));

  return renderedCard;
}

export default CardInfo;
