"use client";

import { cn, handleCopyClipBoard } from "@/shared/lib/utils";
import usePhraseStore from "@/shared/store/phrase";
import { IconButton } from "@/shared/ui";
import { toast } from "@/shared/hooks/useToast";
import { usePathname, useRouter } from "next/navigation";
import useTypingPercent from "@/shared/store/typingPercent";

interface FloatingBtnGroupProps {
  isResultPage?: boolean;
  reset?: () => void;
  download?: () => void;
}

const FloatingBtnGroup = ({
  isResultPage,
  reset,
  download,
}: FloatingBtnGroupProps) => {
  const { phraseInfo, setPhraseIndex } = usePhraseStore();
  const { setTypingPercent } = useTypingPercent();

  const router = useRouter();
  const pathname = usePathname();
  const url = pathname.split("/")[1];

  const handleRetry = () => {
    if (url === "result" && phraseInfo) {
      setPhraseIndex(phraseInfo.phraseIndex);
      setTypingPercent(0);
      router.push("/");
      return;
    }
    if (phraseInfo && reset) {
      setPhraseIndex(phraseInfo.phraseIndex);
      setTypingPercent(0);
      reset();
    }
  };

  const handleNext = () => {
    if (url === "result" && phraseInfo) {
      setPhraseIndex(phraseInfo.phraseIndex + 1);
      setTypingPercent(0);
      router.push("/");
      return;
    }
    if (phraseInfo && phraseInfo.phrase.length - 3 === phraseInfo.phraseIndex) {
      toast({
        title: "글이 하나 남았어요.",
      });
    }
    if (phraseInfo && phraseInfo.phrase.length - 2 === phraseInfo.phraseIndex) {
      toast({
        title: "마지막 글이에요.",
      });
    }

    if (phraseInfo && phraseInfo.phrase.length - 1 > phraseInfo.phraseIndex) {
      setPhraseIndex(phraseInfo.phraseIndex + 1);
    }

    if (phraseInfo && phraseInfo.phrase.length - 1 === phraseInfo.phraseIndex) {
      localStorage.removeItem("phraseInfo");
      window.location.reload();
      return;
    }
  };

  const handleDownload = () => {
    if (download) {
      download();
    }
  };

  const shareLinkToURL = () => {
    const currentUrl = window.location.href;
    handleCopyClipBoard(currentUrl);
    toast({
      title: "링크를 복사했어요.",
    });
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-10 max-w-[343px] mx-auto my-auto">
      <div className="flex flex-row w-full items-center justify-between">
        <div className="flex flex-row w-full gap-[2px]">
          <IconButton
            src="/icons/retry.svg"
            alt="retry"
            iconWidth={24}
            iconHeight={24}
            buttonWidth={56}
            buttonHeight={56}
            className="border rounded-full bg-white min-w-[56px]"
            handleClick={handleRetry}
          />
          <IconButton
            src="/icons/next.svg"
            alt="next"
            iconWidth={24}
            iconHeight={24}
            buttonWidth={56}
            buttonHeight={56}
            className="border rounded-full bg-white min-w-[56px]"
            handleClick={handleNext}
          />
        </div>
        <div className="flex flex-row">
          {!!isResultPage && (
            <IconButton
              src="/icons/download.svg"
              alt="download"
              iconWidth={24}
              iconHeight={24}
              buttonWidth={56}
              buttonHeight={56}
              className={cn(
                "border rounded-full min-w-[56px]",
                isResultPage &&
                  "bg-black hover:bg-custom-textTypingGreenColor focus:bg-black",
              )}
              handleClick={handleDownload}
            />
          )}
          {!isResultPage && (
            <IconButton
              src={
                isResultPage
                  ? "/icons/share_typing_white.svg"
                  : "/icons/share_typing.svg"
              }
              alt="share"
              iconWidth={24}
              iconHeight={24}
              buttonWidth={56}
              buttonHeight={56}
              className={cn(
                "border rounded-full min-w-[56px]",
                isResultPage && "bg-black",
              )}
              handleClick={shareLinkToURL}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatingBtnGroup;
