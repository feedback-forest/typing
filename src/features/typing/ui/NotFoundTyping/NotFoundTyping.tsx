"use client";

import { Button } from "@/shared/ui";
import Image from "next/image";

const NotFoundTyping = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full min-h-[calc(100vh_-_68px)] gap-5">
      <div>
        <Image src="/icons/warning.svg" alt="warning" width={60} height={60} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-xl font-bold">서비스 이용이 원활하지 않아요</div>
        <div>
          <div className="text-lg font-medium text-[#C1C1C1]">
            불편을 드려서 죄송해요.
          </div>
          <div className="text-lg font-medium text-[#C1C1C1]">
            잠시 후에 다시 시도해주세요.
          </div>
        </div>
      </div>
      <div>
        <Button
          className="bg-black rounded-[100px]"
          onClick={() => window.location.reload()}
        >
          다시 시도
        </Button>
      </div>
    </div>
  );
};

export default NotFoundTyping;
