"use client";

import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";

const HeaderPrevious = () => {
  const pathname = usePathname();
  const router = useRouter();
  const url = pathname.split("/")[2];

  const isRenderMobileArrow = () => {
    if (
      url === "class" ||
      url === "user" ||
      url === "like" ||
      url === "entire"
    ) {
      return true;
    }
    return false;
  };

  const backToPreviousPage = () => {
    router.back();
  };

  return (
    isRenderMobileArrow() && (
      <div className="desktop:hidden tablet:hidden mobile:flex justify-start items-center mobile:w-[80px] mobile:h-[25px]">
        <div onClick={backToPreviousPage} className="w-12 h-12">
          <Image
            src="/icons/back_arrow_left.svg"
            alt="back"
            width={48}
            height={48}
          />
        </div>
      </div>
    )
  );
};

export default HeaderPrevious;
