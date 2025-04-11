import React from "react";
import useInputTextInfoStore from "../store/inputTextInfoStore";

function LetterDensity() {
  const letterDensity = useInputTextInfoStore((state) => state.letterDensity);
  const totalCharacters = useInputTextInfoStore(
    (state) => state.totalCharacters
  );

  const sortedLetters = Object.entries(letterDensity)
    .sort((a, b) => b[1] - a[1])
    .map(([letter, count]) => ({
      letter: letter.toUpperCase(),
      count,
      percentage:
        totalCharacters > 0 ? ((count / totalCharacters) * 100).toFixed(2) : 0,
    }));

  if (sortedLetters.length === 0) {
    return (
      <p className="text-[#404254] dark:text-[#E4E4EF] -mt-2">
        No characters found. Start typing to see letter density.
      </p>
    );
  }

  return (
    <div className="bg-[#F2F2F7] dark:bg-[#21222C] p-4 rounded-md text-[#12131A] dark:text-[#E4E4EF]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {sortedLetters.map((item) => (
          <div
            key={item.letter}
            className="flex justify-between items-center p-2 border-b border-[#D3A0FA]"
          >
            <span className="font-semibold">{item.letter}</span>
            <span className="text-[#71727A] dark:text-[#9293A1]">
              {item.count} ({item.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LetterDensity;
