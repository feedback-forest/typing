import { formatToMs } from "@/shared/hooks/formatTimeToMs";
import { isWritingKoreanLetter } from "@/shared/hooks/isWritingKoreanLetter";
import useTypingPercent from "@/shared/store/typingPercent";
import { ResolvedChar } from "@/shared/types/char";
import React, { useCallback, useEffect, useMemo, useRef } from "react";

const RecordContext = React.createContext<{
  wordsPerMinute: number;
  characterPerMinute: number;
  maxCPM: number;
  time: string;
  accuracy: number;
  percent: number;
  typedCharsCount: number;
  resolvedCharList: ResolvedChar[];
  updateRecord: (value: string) => void;
  resetRecord: () => void;
} | null>(null);

export const RecordProvider = ({
  target,
  children,
}: {
  target: string;
  children: React.ReactNode;
}) => {
  const targetValueListRef = useRef(target.split(""));

  const [wordsPerMinute, setWordsPerMinute] = React.useState(0);
  const [maxCPM, setMaxCPM] = React.useState(0);
  const [characterPerMinute, setCharacterPerMinute] = React.useState(0);
  const [accuracy, setAccuracy] = React.useState(0);
  const [percent, setPercent] = React.useState(0);
  const [time, setTime] = React.useState("00:00:00");

  const [currentWords, setCurrentWords] = React.useState<string[]>([]);

  const [resolvedCharList, setResolvedCharList] = React.useState<
    ResolvedChar[]
  >(target.split("").map((char) => ({ char, isCorrect: false })));

  const [isEnded, setIsEnded] = React.useState(false);

  const startedTimeRef = useRef<number | null>(null);

  const { setTypingPercent } = useTypingPercent();

  const updateRecord = useCallback((value: string) => {
    const startedTime = (startedTimeRef.current =
      startedTimeRef.current ?? Date.now());

    const totalTime = Date.now() - startedTime;

    const newCurrentWords = value.split(" ");
    setCurrentWords(newCurrentWords);

    const newWordsPerMinute = newCurrentWords.length / (totalTime / 1000 / 60);
    setWordsPerMinute(newWordsPerMinute);

    const typedCharCount = value.length;

    const newCharacterPerMinute = typedCharCount / (totalTime / 1000 / 60);
    setCharacterPerMinute(newCharacterPerMinute);

    const newMaxCPM = Math.max(characterPerMinute, newCharacterPerMinute);
    setMaxCPM(newMaxCPM);

    const newTime = Number((totalTime / 1000).toFixed(4));
    const formattedTime = formatToMs(newTime);

    setTime(formattedTime);

    const typedValueList = value.split("");
    const targetValueList = targetValueListRef.current;
    const newResolvedCharList = targetValueList.map((char, index) => {
      const typedChar = typedValueList[index];

      return {
        char,
        isCorrect:
          !(typedChar && typedValueList[index + 1] && typedChar !== char) &&
          isWritingKoreanLetter({
            nextTypedValue: typedValueList[index + 1],
            nextValue: targetValueList[index + 1],
            targetValue: char,
            value: typedChar,
          }),
        typedChar,
      };
    });

    setResolvedCharList(newResolvedCharList);

    const newAccuracy =
      newResolvedCharList.filter(({ isCorrect }) => isCorrect).length /
      newResolvedCharList.length;
    setAccuracy(newAccuracy);

    const newPercent = (typedCharCount / newResolvedCharList.length) * 100;
    setPercent(newPercent);
    setTypingPercent(newPercent);

    if (targetValueList.length === value.length) {
      setIsEnded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const startTime = startedTimeRef.current;

    if (isEnded || !startTime) {
      return;
    }

    const interval = window.setInterval(() => {
      const totalTime = Date.now() - startTime;

      const wordsPerMinute = currentWords.length / (totalTime / 1000 / 60);
      setWordsPerMinute(wordsPerMinute);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [currentWords.length, isEnded]);

  const resetRecord = useCallback(() => {
    startedTimeRef.current = null;

    setWordsPerMinute(0);
    setCharacterPerMinute(0);
    setMaxCPM(0);
    setAccuracy(0);
    setPercent(0);
    setCurrentWords([]);
    setResolvedCharList(
      target.split("").map((char) => ({ char, isCorrect: false })),
    );
    setTime("");
    setIsEnded(false);
  }, [target]);

  const value = useMemo(
    () => ({
      accuracy,
      percent,
      time,
      resetRecord,
      resolvedCharList,
      typedCharsCount: currentWords.join(" ").length,
      updateRecord,
      wordsPerMinute,
      characterPerMinute,
      maxCPM,
    }),
    [
      accuracy,
      percent,
      time,
      currentWords,
      resetRecord,
      resolvedCharList,
      updateRecord,
      wordsPerMinute,
      characterPerMinute,
      maxCPM,
    ],
  );

  return (
    <RecordContext.Provider value={value}>{children}</RecordContext.Provider>
  );
};

export const useRecord = () => {
  const value = React.useContext(RecordContext);

  if (!value) {
    throw new Error("RecordProvider is not found");
  }

  return value;
};

export const Record = () => {
  return null;
};
