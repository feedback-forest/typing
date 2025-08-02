"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { TbCrown, TbLogin2, TbUser } from "react-icons/tb";
import { cn } from "@/shared/lib/utils";
import useTypingLoginedUserStore from "@/shared/store/typingUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../DropdownMenu/DropdownMenu";
import { useToast } from "@/shared/hooks/useToast";
import useTypingResultInfo from "@/shared/store/typingResult";

const TypingHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const url = pathname.split("/")[1];

  const { typingLoginedUser, setTypingLoginedUser } =
    useTypingLoginedUserStore();
  const { resetTypingResultInfo } = useTypingResultInfo();

  const { toast } = useToast();

  const handleLogout = () => {
    setTypingLoginedUser({
      accessToken: "",
      refreshToken: "",
    });
    resetTypingResultInfo();
    toast({
      title: "로그아웃되었습니다.",
    });

    router.push("/");
  };

  const isRenderHeader = () => {
    if (url === "login") return false;
    return true;
  };

  const isRenderMobileArrow = () => {
    if (url === "result" || url === "ranking" || url === "signup") {
      return true;
    }
    return false;
  };

  const isRenderLogin = () => {
    if (url === "signup") return false;
    if (typingLoginedUser && typingLoginedUser.accessToken) return false;
    return true;
  };

  const isRenderUserIcon = () => {
    if (typingLoginedUser && typingLoginedUser.accessToken) return true;
  };

  const backToPreviousPage = () => {
    router.back();
  };

  const renderTitle = () => {
    if (url === "ranking") return "랭킹";
    if (url === "signup") return "회원정보 입력";
    else if (url === "")
      return (
        <div
          onClick={() => {
            router.push("/");
          }}
        >
          타자모어
        </div>
      );
    else return "";
  };

  return (
    isRenderHeader() && (
      <header
        className={cn(
          "flex w-full justify-between items-center mobile:h-12 mobile:px-4 max-w-[375px]",
          isRenderMobileArrow() && "border-b-[0.5px] border-[#DCDEE2 ]",
        )}
      >
        {isRenderMobileArrow() ? (
          <div className="desktop:hidden tablet:hidden mobile:flex justify-start items-center mobile:w-6 mobile:h-6 cursor-pointer">
            <div onClick={backToPreviousPage}>
              <Image
                src="/icons/ic_back.svg"
                alt="back"
                width={24}
                height={24}
              />
            </div>
          </div>
        ) : (
          <div>
            <div
              className="cursor-pointer"
              onClick={() => router.push("/ranking")}
            >
              <TbCrown size={24} />
            </div>
          </div>
        )}
        <div className="text-lg font-black cursor-pointer">{renderTitle()}</div>
        {isRenderLogin() && (
          <div className="w-6">
            <div onClick={() => router.push("/login")}>
              <TbLogin2 size={24} />
            </div>
          </div>
        )}
        {isRenderUserIcon() && (
          <div className="w-6">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <TbUser size={24} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {/* <DropdownMenuLabel>반가워요</DropdownMenuLabel> */}
                  {/* <DropdownMenuSeparator /> */}
                  <DropdownMenuItem onClick={handleLogout}>
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
        {!isRenderLogin() && !isRenderUserIcon() && <div className="w-6"></div>}
      </header>
    )
  );
};

export default TypingHeader;
