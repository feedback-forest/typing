"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ClipLoader } from "react-spinners";
import { useToast } from "@/shared/hooks/useToast";
import useTempTokenStore from "@/shared/store/tempToken";
import useKakaoLogin from "@/features/typing/api/useKakaoLogin";
import useTypingLoginedUserStore from "@/shared/store/typingUser";

const LoginCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success") || "";
  const { typingLoginedUser } = useTypingLoginedUserStore();
  const { toast } = useToast();

  useEffect(() => {
    if (typingLoginedUser) {
      router.push("/");
      toast({
        title: "로그인되었습니다.",
      });
    }
  }, [typingLoginedUser, router, toast]);

  const { data } = useKakaoLogin(success);
  const { setTempToken } = useTempTokenStore();

  console.log("callback page kakao login data", data);

  useEffect(() => {
    if (data) {
      setTempToken(success);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data && data.code === 3002) {
      router.push("/signup");
    }
  }, [data, router, toast]);

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <ClipLoader color="#D1633F" />
    </div>
  );
};

const LoginCallbackPage = () => {
  return (
    <Suspense fallback={<></>}>
      <LoginCallback />
    </Suspense>
  );
};

export default LoginCallbackPage;
