"use client";

import { usePathname } from "next/navigation";

const HeaderTitle = () => {
  const pathname = usePathname();
  const url = pathname.split("/")[1] as urlToInfoKey;

  type urlToInfoKey = "class" | "user" | "like" | "entire";

  const urlToInfo: Record<urlToInfoKey, string> = {
    class: "클래스 정보",
    user: "마이페이지",
    like: "찜 클래스",
    entire: "전체 클래스",
  };

  return (
    <div className="desktop:hidden tablet:hidden mobile:flex min-w-[168px] h-[22px] justify-center items-center text-center text-base font-normal">
      {urlToInfo[url]}
    </div>
  );
};

export default HeaderTitle;
