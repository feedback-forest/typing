"use client";

import { OptionsProvider } from "@/features/provider/OptionsProvider";
import { TotalRecordProvider } from "@/features/provider/TotalRecordProvider";
import { TypingStatusProvider } from "@/features/provider/TypingStatusProvider";
import useGetTypingList from "@/features/typing/api/useGetTypingList";
import PostTitle from "@/features/typing/ui/PostTitle/PostTitle";
import { TypeSlots } from "@/features/typing/ui/TypeSlots/TypeSlots";
import TypingProgressBar from "@/features/typing/ui/TypingProgressBar/TypingProgressBar";
import usePhraseStore from "@/shared/store/phrase";
import useTypingPercent from "@/shared/store/typingPercent";
import { Divider } from "@/shared/ui";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const TypingHome = () => {
  const [isReady, setIsReady] = useState(false);
  const { data: typingList, isLoading, isSuccess } = useGetTypingList();

  const typingListData = typingList?.data.phrases;

  const { phraseInfo, setPhrase, setPhraseIndex } = usePhraseStore();
  const { setTypingPercent } = useTypingPercent();

  const currentPhrase = phraseInfo?.phrase[phraseInfo.phraseIndex] || {
    title: "",
    author: "",
  };

  useEffect(() => {
    if (typingListData && phraseInfo && typingListData.length > 0) {
      setPhrase(typingListData);
      setPhraseIndex(0);
      setIsReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingListData, isSuccess]);

  useEffect(() => {
    setTypingPercent(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    !isReady ||
    isLoading ||
    !phraseInfo ||
    !phraseInfo.phrase ||
    phraseInfo.phrase.length === 0 ||
    phraseInfo.phraseIndex >= phraseInfo?.phrase.length
  ) {
    return (
      <div className="flex w-full h-full min-h-[calc(100vh_-_68px)] justify-center items-center">
        <ClipLoader color="#8D8D8D" size={24} />
      </div>
    );
  }

  return (
    phraseInfo.phrase && (
      <div className="flex w-full h-full min-h-[calc(100vh_-_68px)] flex-col px-4">
        <TotalRecordProvider>
          <TypingStatusProvider>
            <OptionsProvider>
              <div className="flex h-full flex-col gap-5">
                <div className="flex h-full flex-col gap-9">
                  <TypingProgressBar />
                  {isLoading && (
                    <div className="flex w-full justify-center items-center">
                      <ClipLoader color="#8D8D8D" size={24} />
                    </div>
                  )}
                  {phraseInfo && phraseInfo.phrase && (
                    <TypeSlots
                      phrase={phraseInfo.phrase}
                      phraseIndex={phraseInfo.phraseIndex}
                    />
                  )}
                  <Divider className="border-[#8D8D8D] mt-[2px]" />
                </div>

                <div className="flex w-full px-1">
                  <PostTitle
                    title={currentPhrase.title}
                    author={currentPhrase.author}
                  />
                </div>
              </div>
            </OptionsProvider>
          </TypingStatusProvider>
        </TotalRecordProvider>
      </div>
    )
  );
};

export default TypingHome;
