"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const BackToPrevious = () => {
  const router = useRouter();

  const backToPreviousPage = () => {
    router.back();
  };
  return (
    <div
      onClick={backToPreviousPage}
      className="tablet:w-[48px] mobile:w-[24px] tablet:h-[48px] mobile:h-[24px]"
    >
      <Image
        src="/icons/back_arrow_left.svg"
        alt="back"
        width={48}
        height={48}
      />
    </div>
  );
};

export default BackToPrevious;
