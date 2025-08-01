"use client";

import useGetMonthlyRanking from "@/features/typing/api/useGetMonthlyRanking";
import useGetRealtimeRanking from "@/features/typing/api/useGetRealtimeRanking";
import RankingInfo from "@/features/typing/ui/RankingInfo/RankingInfo";
import { UnifiedTooltip } from "@/shared/ui";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui/Tabs/Tabs";
import { isEmpty } from "lodash";
import Image from "next/image";

const RankingPage = () => {
  const { data: realtimeRankingData, isLoading: isLoadingRealtime } =
    useGetRealtimeRanking();
  const { data: monthlyRankingData, isLoading: isLoadingMonthly } =
    useGetMonthlyRanking();

  const realtimeRanking = realtimeRankingData?.data.rankings;
  const monthlyRanking = monthlyRankingData?.data.rankings;

  const date = new Date();
  const MM = String(date.getMonth() + 1).padStart(2, "0"); // 0부터 시작하므로 +1
  const DD = String(date.getDate()).padStart(2, "0");

  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");

  const updateAt = `${MM}/${DD} ${hh}:${mm}`;

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh_-_68px)] px-4 gap-3">
      <div className="flex flex-row gap-1">
        <div className="text-custom-textRankingGrayColor text-base">{`${updateAt} 갱신`}</div>
        <UnifiedTooltip
          triggerItem={
            <div className="flex justify-center items-center cursor-pointer">
              <Image
                src="/icons/ranking_info.svg"
                alt="ranking info"
                width={16}
                height={16}
              />
            </div>
          }
          tooltipContent={
            <div className="flex flex-col justify-center items-center w-[276px] h-15 relative">
              <div className="absolute top-[-10px] z-10">
                <Image
                  src="/images/kakao_tooltip_arrow.png"
                  alt="tooltip arrow"
                  width={10}
                  height={10}
                  className="bg-[#268A30] rotate-45 z-10"
                />
              </div>
              <ul className="list-disc">
                <li>실시간은 전체 타수 순위를 나타내요.</li>
                <li>월별은 매월 1일에 순위가 업데이트돼요.</li>
                <li>동점일 경우, 타수와 정확도 순으로 순위가 매겨져요.</li>
              </ul>
            </div>
          }
          side="bottom"
          contentClassName="bg-[#268A30] text-xs text-white rounded-sm overflow-visible"
        />
      </div>
      <Tabs defaultValue="realtime" className="w-full">
        <TabsList className="w-full p-0 h-10 border border-black rounded-none bg-white">
          <TabsTrigger
            value="realtime"
            className="w-full h-10 outline-none rounded-none p-0 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow"
          >
            실시간
          </TabsTrigger>
          <TabsTrigger
            value="monthly"
            className="w-full h-10 outline-none rounded-none p-0 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow"
          >
            월별
          </TabsTrigger>
        </TabsList>
        <TabsContent value="realtime">
          {isLoadingRealtime || isLoadingMonthly ? (
            <div>loading...</div>
          ) : (
            <>
              <section className="flex flex-col w-full pt-[18px]">
                {realtimeRanking ? (
                  realtimeRanking.map((rankData, idx) => {
                    return (
                      <RankingInfo
                        key={`${rankData.member_id}_${idx}`}
                        memberId={rankData.member_id}
                        rank={rankData.ranking}
                        nickname={rankData.nickname}
                        score={rankData.score}
                      />
                    );
                  })
                ) : (
                  <div className="flex justify-center items-center">
                    실시간 랭킹 정보가 없어요.
                  </div>
                )}
              </section>
            </>
          )}
        </TabsContent>
        <TabsContent value="monthly">
          <section className="flex flex-col w-full pt-[18px]">
            {!isEmpty(monthlyRanking) && monthlyRanking ? (
              monthlyRanking.map((rankData) => {
                return (
                  <RankingInfo
                    key={rankData.member_id}
                    memberId={rankData.member_id}
                    rank={rankData.ranking}
                    nickname={rankData.nickname}
                    score={rankData.score}
                  />
                );
              })
            ) : (
              <div className="flex justify-center items-center">
                월별 랭킹 정보가 없어요.
              </div>
            )}
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RankingPage;
