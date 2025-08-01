import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "로그인 회원가입",
  description: "반가워요, 오늘부터 시작해요. 하루를 시작하는 필사 타이핑 타자",
  keywords: "로그인, 필사, 타자, 연습, 타이핑",
  openGraph: {
    title: "타이핑 | 하루의 시작 필사",
    description: "필사를 통해 자신감을 얻어보세요",
    // url: "https://tajamore.app/login",
    locale: "ko_KR",
    type: "website",
  },
};

const LectureEntireLayout = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  return <>{children}</>;
};

export default LectureEntireLayout;
