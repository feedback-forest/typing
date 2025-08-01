import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "회원가입",
  description: "타자모어 회원가입",
  keywords: "매일 타자 연습, 필사, 타자모어,",
  openGraph: {
    title: "타자모어 | 스스로 다짐을 하는 갓생러를 위한 사이트",
    description: "갓생러를 위한 타자 연습 | 필사 플랫폼",
    url: "https://tajamore.app/signup",
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
