import { useState } from "react";
import useInputTextInfoStore from "../store/inputTextInfoStore";

function InputText() {
  const [text, setText] = useState("");
  const [excludeSpaces, setExcludeSpaces] = useState(false);
  const [isLimitEnabled, setIsLimitEnabled] = useState(false);
  const [characterLimit, setCharacterLimit] = useState(0);
  const [limitReached, setLimitReached] = useState(false);

  const setAnalysisResults = useInputTextInfoStore(
    (state) => state.setAnalysisResults
  );

  const MAX_CHARACTER_LIMIT = 9999;

  function handleTextChange(e) {
    let inputText = e.target.value;

    if (isLimitEnabled && characterLimit > 0) {
      if (inputText.length > characterLimit) {
        inputText = inputText.slice(0, characterLimit);
        setLimitReached(true);
      } else {
        setLimitReached(false);
      }
    }

    setText(inputText);
    analyzeText(inputText, excludeSpaces);
  }

  function handleExcludeSpacesChange() {
    setExcludeSpaces((prev) => !prev);
    analyzeText(text, !excludeSpaces);
  }

  function handleLimitEnabledChange() {
    const newLimitEnabled = !isLimitEnabled;
    setIsLimitEnabled(newLimitEnabled);

    if (!newLimitEnabled) {
      setLimitReached(false);
    } else if (characterLimit > 0 && text.length > characterLimit) {
      setLimitReached(true);
    }

    analyzeText(text, excludeSpaces);
  }

  function handleCharacterLimitChange(e) {
    let inputValue = parseInt(e.target.value) || 0;

    if (inputValue > MAX_CHARACTER_LIMIT) {
      inputValue = MAX_CHARACTER_LIMIT;
    }

    setCharacterLimit(inputValue);

    if (isLimitEnabled && text.length > inputValue && inputValue > 0) {
      setLimitReached(true);
    } else {
      setLimitReached(false);
    }

    analyzeText(text, excludeSpaces);
  }

  function getReadingTime() {
    const words = text.split(/\s+/).filter((word) => word !== "");
    const wordCount = words.length;

    const readingTimeMinutes = wordCount / 200;
    return Math.ceil(readingTimeMinutes);
  }

  const readingTime = getReadingTime();

  let processedText = text;
  if (excludeSpaces) {
    processedText = processedText.replace(/\s/g, "");
  }
  if (isLimitEnabled && characterLimit > 0) {
    processedText = processedText.slice(0, characterLimit);
  }

  function analyzeText(textToAnalyze, excludeSpaces) {
    let textForAnalysis = textToAnalyze;
    if (isLimitEnabled && characterLimit > 0) {
      textForAnalysis = textForAnalysis.slice(0, characterLimit);
    }

    const letterFrequency = {};
    const lettersOnly = textForAnalysis.toLowerCase().replace(/[^a-z]/g, "");
    for (const char of lettersOnly) {
      letterFrequency[char] = (letterFrequency[char] || 0) + 1;
    }

    if (excludeSpaces) {
      textForAnalysis = textForAnalysis.replace(/\s/g, "");
    }
    const characters = textForAnalysis.length;
    const words = textForAnalysis
      .split(/\s+/)
      .filter((word) => word !== "").length;
    const sentences = textForAnalysis
      .split(/[.!?]+/)
      .filter((sentence) => sentence.trim() !== "").length;
    setAnalysisResults(characters, words, sentences, letterFrequency);
  }

  return (
    <div className="flex flex-col gap-4 tracking-[-0.6px] dark:text-[#E4E4EF]">
      <textarea
        className={`w-full h-48 bg-[#F2F2F7] dark:bg-[#21222C] p-2 md:p-4 border-2 ${
          limitReached
            ? "border-[#DA3701] dark:border-[#FE8159] shadow-xl"
            : "border-[#E4E4EF] dark:border-[#2A2B37]"
        }  rounded-md resize-none focus:outline-none text-[#2A2B37] dark:text-[#E4E4EF] text-xl`}
        placeholder="Start typing here… (or paste your text)"
        value={processedText}
        onChange={handleTextChange}
      />
      {limitReached && (
        <p className="text-sm md:text-base text-[#DA3701] dark:text-[#FE8159]">
          Limit reached! Your text exceeds {characterLimit} characters.
        </p>
      )}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[#12131A] dark:text-[#E4E4EF]">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              id="excludeSpaces"
              className="accent-[#C27CF8]"
              checked={excludeSpaces}
              onChange={handleExcludeSpacesChange}
            />
            <label htmlFor="excludeSpaces">Exclude Spaces</label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              id="isLimitEnabled"
              className="accent-[#C27CF8]"
              checked={isLimitEnabled}
              onChange={handleLimitEnabledChange}
            />
            <label htmlFor="isLimitEnabled">Set Character Limit</label>
            {isLimitEnabled && (
              <input
                type="number"
                className="w-14 h-7 border dark:border-[#404254] rounded-md py-1 focus:outline-none text-center no-spinner"
                placeholder="Limit"
                value={characterLimit > 0 ? characterLimit : ""}
                onChange={handleCharacterLimitChange}
                min="0"
              />
            )}
          </div>
        </div>
        <p>
          Approx. reading time:
          {readingTime < 1
            ? " < 1 minute"
            : ` ${readingTime} ${readingTime === 1 ? "minute" : "minutes"}`}
        </p>
      </div>
    </div>
  );
}

export default InputText;
