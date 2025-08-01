"use client";

import FloatingBtnGroup from "@/features/typing/ui/FloatingBtnGroup/FloatingBtnGroup";
import ResultInfo from "@/features/typing/ui/ResultInfo/ResultInfo";
import { Divider } from "@/shared/ui";
import Image from "next/image";
import { useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import useTypingStore from "@/shared/store/typing";
import useTypingResultInfo from "@/shared/store/typingResult";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/Accordion/Accordion";
const ResultPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { typing } = useTypingStore();
  const { typingResultInfo } = useTypingResultInfo();

  const date = new Date();
  const YYYY = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, "0"); // 0부터 시작하므로 +1
  const DD = String(date.getDate()).padStart(2, "0");

  const formattedToday = `${YYYY}-${MM}-${DD}`;

  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  const time = `${hh}:${mm}:${ss}`;

  const download = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-typing-result.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh_-_68px)]">
      <div
        className="flex flex-col w-full h-full px-4 gap-10 bg-white pb-[60px]"
        ref={ref}
      >
        <section className="flex flex-col items-center justify-center gap-1.5">
          <div className="text-[32px] font-black">타자모어</div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-[10px] font-medium text-custom-textTypingGrayColor">
              transcribe every day, get better every day.
            </div>
            <div className="text-[10px] font-medium text-custom-textTypingGrayColor">
              https://www.sijak.com/typing
            </div>
          </div>
        </section>
        <section className="relative">
          <div className="absolute right-0 -top-[44px]">
            <Image
              src="/icons/star_outline.svg"
              alt="star_outline"
              width={88}
              height={88}
            />
            <div className="absolute top-[30px] left-[18px] rotate-[-15deg]">
              <div className="text-[10px] text-custom-textTypingGreenColor">
                {formattedToday}
              </div>
              <div className="text-[10px] text-custom-textTypingGreenColor">
                {time}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-[14px]">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className={"border-b border-dashed"}>
                    {typingResultInfo ? (
                      <ResultInfo
                        title="User"
                        content={typingResultInfo.nickname}
                      />
                    ) : (
                      <ResultInfo title="User" content={"GUEST"} />
                    )}
                    <Divider isDashed />
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col justify-center h-full gap-4 text-balance">
                    {typingResultInfo &&
                    typingResultInfo.rank !== -1 &&
                    typingResultInfo.rank !== null ? (
                      <div className="gap-0">
                        <ResultInfo
                          title="Rank"
                          content={`${typingResultInfo.rank}위`}
                          containerClassName="py-4"
                        />
                        <Divider isDashed />
                      </div>
                    ) : (
                      <div className="gap-0">
                        <ResultInfo
                          title="Rank"
                          content={`O위`}
                          containerClassName="py-4"
                          contentClassName="blur-sm"
                        />
                        <Divider isDashed />
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="flex flex-row w-full items-center gap-[60px]">
                <ResultInfo
                  title="CPM"
                  content={typing ? typing.cpm.toFixed(0) : "0"}
                  containerClassName="w-[105px]"
                  contentClassName="text-[28px]"
                />
                <ResultInfo
                  title="WPM"
                  content={typing ? typing.wpm.toFixed(0) : "0"}
                  contentClassName="text-[28px]"
                />
              </div>
              <div className="flex flex-row w-full items-center gap-[60px]">
                <ResultInfo
                  title="ACC"
                  content={typing ? `${(typing.acc * 100).toFixed(0)}` : "100"}
                  containerClassName="w-[105px]"
                  contentClassName="text-[28px]"
                />
                <ResultInfo
                  title="TIME"
                  content={typing.time}
                  contentClassName="text-[28px]"
                />
              </div>
              <Divider isDashed />
              <ResultInfo title="Title" content={typing.title} />
              <Divider isDashed />
              <ResultInfo title="Writer" content={typing.writer} />
              <Divider isDashed />
            </div>
            <div>
              <div>{typing.content}</div>
            </div>
            <Divider isDashed />
          </div>
        </section>
        <div className="flex flex-col items-center justify-center">
          {typingResultInfo ? (
            <div className="font-medium text-[12px] text-custom-textTypingGrayColor">
              {typingResultInfo.luckyMessage}
            </div>
          ) : (
            <>
              <div className="font-medium text-[12px] text-custom-textTypingGrayColor">
                오늘도 좋은 하루 되세요!
              </div>
              <div className="font-medium text-[12px] text-custom-textTypingGrayColor">
                *오늘의 행운 의식 : 마음을 차분히 하세요*
              </div>
            </>
          )}
        </div>
      </div>
      <FloatingBtnGroup isResultPage download={download} />
    </div>
  );
};

export default ResultPage;
