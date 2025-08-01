"use client";

import React, { useMemo, useState } from "react";

export type TotalRecord = {
  wordsPerMinutes: number[];
  characterPerMinutes: number[];
  maxCPMs: number[];
  accuracies: number[];
  percents: number[];
};

type RecordUpdateHandlerParameter = {
  wordsPerMinute: number;
  characterPerMinute: number;
  maxCPM: number;
  accuracy: number;
  percent: number;
};

const TotalRecordContext = React.createContext<
  | (TotalRecord & {
      updateTotalRecord: (params: RecordUpdateHandlerParameter) => void;
      resetRecord: () => void;
    })
  | null
>(null);

export const useTotalRecord = () => {
  const value = React.useContext(TotalRecordContext);

  if (!value) {
    throw new Error("TotalRecordProvider is not found");
  }

  return value;
};

export const TotalRecordProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<TotalRecord>({
    accuracies: [],
    characterPerMinutes: [],
    maxCPMs: [],
    wordsPerMinutes: [],
    percents: [],
  });

  const value = useMemo(
    () => ({
      ...data,
      resetRecord: () => {
        setData({
          accuracies: [],
          characterPerMinutes: [],
          maxCPMs: [],
          wordsPerMinutes: [],
          percents: [],
        });
      },
      updateTotalRecord: ({
        wordsPerMinute,
        characterPerMinute,
        maxCPM,
        accuracy,
        percent,
      }: RecordUpdateHandlerParameter) => {
        setData(
          ({
            accuracies,
            characterPerMinutes,
            maxCPMs,
            wordsPerMinutes,
            percents,
          }) => ({
            accuracies: [...accuracies, accuracy],
            characterPerMinutes: [...characterPerMinutes, characterPerMinute],
            maxCPMs: [...maxCPMs, maxCPM],
            wordsPerMinutes: [...wordsPerMinutes, wordsPerMinute],
            percents: [...percents, percent],
          }),
        );
      },
    }),
    [data],
  );

  return (
    <TotalRecordContext.Provider value={value}>
      {children}
    </TotalRecordContext.Provider>
  );
};
