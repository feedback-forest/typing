import { cn } from "@/shared/lib/utils";
import { Divider } from "@/shared/ui";
import Image from "next/image";

interface RankingInfoProps {
  memberId: number;
  rank: number;
  nickname: string;
  score: number;
}

const RankingInfo = ({ memberId, rank, nickname, score }: RankingInfoProps) => {
  const tempUserId = 4;
  const isUserInRanking = memberId === tempUserId;

  return (
    <div>
      <div
        className={cn(
          "flex flex-col w-full py-[10px]",
          rank === 3 && "pb-[36px]",
        )}
      >
        <div className="flex flex-row w-full items-center justify-between gap-5">
          <div className="flex gap-4">
            {rank <= 3 ? (
              <div className="flex w-[31px] items-center justify-end">
                <div
                  className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full text-white bg-black text-center text-sm",
                    isUserInRanking &&
                      "text-custom-textTypingGreenColor font-bold",
                  )}
                >
                  {rank}
                </div>
              </div>
            ) : (
              <div
                className={cn(
                  "flex w-[31px] items-center justify-end gap-[6.5px]",
                  isUserInRanking &&
                    "text-custom-textTypingGreenColor font-bold",
                )}
              >
                {isUserInRanking && (
                  <div className="w-[7px] h-[7px] rounded-full bg-custom-textTypingGreenColor" />
                )}
                {rank}
              </div>
            )}
            <div
              className={cn(
                "flex",
                isUserInRanking && "text-custom-textTypingGreenColor font-bold",
              )}
            >
              {nickname}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            {rank <= 3 && (
              <div>
                <Image
                  src="/icons/trophy.svg"
                  alt="trophy"
                  width={18}
                  height={18}
                />
              </div>
            )}
            <div
              className={cn(
                isUserInRanking && "text-custom-textTypingGreenColor font-bold",
              )}
            >
              {score}
            </div>
          </div>
        </div>
      </div>
      <Divider className={cn(rank === 3 && "border-black")} />
    </div>
  );
};

export default RankingInfo;
