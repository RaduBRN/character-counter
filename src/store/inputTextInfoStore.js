import { create } from "zustand";

const useInputTextInfoStore = create((set) => ({
  totalCharacters: 0,
  wordCount: 0,
  sentenceCount: 0,
  letterDensity: {},
  setAnalysisResults: (characters, words, sentences, letterFrequency = {}) =>
    set({
      totalCharacters: characters,
      wordCount: words,
      sentenceCount: sentences,
      letterDensity: letterFrequency,
    }),
}));

export default useInputTextInfoStore;
