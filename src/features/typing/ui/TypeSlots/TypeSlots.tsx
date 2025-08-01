import { useEffect, useRef } from "react";
import { RecordProvider } from "../Record/Record";
import { TypeArea } from "../TypeArea/TypeArea";
import { Sentences } from "../../model/typing";

interface TypeSlotsProps {
  phrase: Sentences[];
  phraseIndex: number;
}

export const TypeSlots = ({ phrase, phraseIndex }: TypeSlotsProps) => {
  const frameRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    },
    [],
  );

  const currentSentence = phrase[phraseIndex]?.sentence ?? "";

  return (
    <div className="flex content-center items-center px-8 transition-transform duration-700">
      <div className="mx-auto w-full max-w-4xl">
        <RecordProvider target={currentSentence} key={phraseIndex}>
          <TypeArea
            text={currentSentence}
            phraseInfo={phrase[phraseIndex]}
            phrase={phrase}
            phraseIndex={phraseIndex}
          />
        </RecordProvider>
      </div>
    </div>
  );
};
