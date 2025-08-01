"use client";

import {
  Button,
  Checkbox,
  Divider,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputLabel,
} from "@/shared/ui";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import Image from "next/image";
import { InputLabelStatus } from "@/shared/ui/InputLabel/InputLabel";
import axios from "axios";
import { debounce } from "lodash";
import { useToast } from "@/shared/hooks/useToast";
import { twMerge } from "tailwind-merge";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import useGetTypingRandomNickname from "@/features/typing/api/useGetTypingRandomNickname";
import useTypingValidateNickname from "@/features/typing/api/useTypingValidateNickname";
import usePostSignUp from "@/features/typing/api/usePostSignUp";
import useTempTokenStore from "@/shared/store/tempToken";

type SignUpForm = {
  nickname: string;
  ageRange: string;
  gender: "남성" | "여성" | "";
};

export type UserServiceAgreeFormEnum =
  | "allAgree"
  | "serviceAgree"
  | "personalInformationAgree"
  | "locationBasedServiceAgree"
  | "marketingAgree";

export type UserServiceAgreeForm = {
  allAgree: boolean;
  serviceAgree: boolean;
  personalInformationAgree: boolean;
  locationBasedServiceAgree: boolean;
  marketingAgree?: boolean;
};

const agreeItems = [
  { id: "allAgree", label: "약관 전체 동의", externalLink: "" },
  {
    id: "serviceAgree",
    label: "[필수] 서비스 이용 약관 동의",
    externalLink:
      "https://www.notion.so/19a47a6ecf8880bcbba9c000f6f9bc17?source=copy_link",
  },
  {
    id: "personalInformationAgree",
    label: "[필수] 개인정보 처리방침 동의",
    externalLink:
      "https://www.notion.so/21947a6ecf8880e586a1f35ca18561a3?source=copy_link",
  },
  {
    id: "marketingAgree",
    label: "[선택] 마케팅 정보 수신 동의",
    externalLink: "",
  },
] as const;

const FormSchema = z.object({
  agreeItems: z
    .array(z.string())
    .refine((value) => value.includes("serviceAgree"), {
      message: "서비스 이용 약관에 동의해야 합니다.",
    })
    .refine((value) => value.includes("personalInformationAgree"), {
      message: "개인정보 처리방침에 동의해야 합니다.",
    })
    .refine((value) => value.includes("locationBasedServiceAgree"), {
      message: "위치기반 서비스에 동의해야 합니다.",
    }),
});

const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    clearErrors,
  } = useForm<SignUpForm>();

  const [status, setStatus] = useState<InputLabelStatus>("default");
  const [message, setMessage] = useState<string>("");

  const { tempToken } = useTempTokenStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      agreeItems: [],
    },
  });

  const router = useRouter();

  const getRandomNickname = useGetTypingRandomNickname();
  const validateNickname = useTypingValidateNickname();
  const postSignUp = usePostSignUp(tempToken ?? "");

  const { toast } = useToast();

  const makeRandomNickname = () => {
    getRandomNickname.mutate(undefined, {
      onSuccess: (data) => {
        setValue("nickname", data.data.data.nickname);
        validationCheckNickname(data.data.data.nickname);
      },
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validationCheckNickname = useCallback(
    debounce((nickname: string) => {
      validateNickname.mutate(
        { nickname },
        {
          onSuccess: (data) => {
            const validateCheck = data.data;
            if (validateCheck && validateCheck.message === "success") {
              clearErrors("nickname");
              setStatus("correct");
              setMessage("사용 가능한 닉네임입니다.");
            }
          },
          onError: (error) => {
            console.error(error);
            if (axios.isAxiosError(error)) {
              const errorMessage =
                error.response?.data?.message || "서버 오류가 발생했습니다.";
              setError("nickname", {
                type: "manual",
                message: errorMessage,
              });
              setStatus("error");
            } else {
              setError("nickname", {
                type: "manual",
                message: "알 수 없는 오류가 발생했습니다.",
              });
            }
          },
        },
      );
    }, 500),
    [],
  );

  const handleChangeNickname = (nickname: string) => {
    validationCheckNickname(nickname);
  };

  const updateNickname: SubmitHandler<SignUpForm> = (data) => {
    postSignUp.mutate(
      {
        nickname: data.nickname,
        agreements: ["TERMS_OF_SERVICE", "PRIVACY_POLICY"],
      },
      {
        onSuccess: () => {
          toast({ title: "타자모어에 오신 걸 환영합니다." });
          router.push("/");
        },
      },
    );
  };

  const agreeAndStartService: SubmitHandler<{ agreeItems: string[] }> = (
    data: z.infer<typeof FormSchema>,
  ) => {
    if (data.agreeItems) {
      // TODO: 동의항목 db 저장 필요
      // postUserAgree.mutate(
      //   {
      //     agreeItems: data.agreeItems,
      //   },
      //   {
      //     onSuccess: () => {
      //       setAgree(true);
      //     },
      //   },
      // );
    }
  };
  const isError = form.formState.errors.agreeItems?.message;
  const isDisabled =
    !form.getValues("agreeItems").includes("serviceAgree") ||
    !form.getValues("agreeItems").includes("personalInformationAgree");

  const handleAllAgreeChange = (checked: boolean) => {
    const allAgreeItems = checked ? agreeItems.map((item) => item.id) : [];
    form.setValue("agreeItems", allAgreeItems);
  };

  const handleIndividualChange = (
    itemId: string,
    checked: string | boolean,
  ) => {
    const currentValues = form.getValues("agreeItems");
    let newValues;

    // 체크박스 상태 업데이트
    if (checked) {
      newValues = [...currentValues, itemId];
    } else {
      newValues = currentValues.filter((value) => value !== itemId);
    }

    form.setValue("agreeItems", newValues);

    // 전체 동의 체크박스 상태 업데이트
    const allChecked = agreeItems
      .filter((item) => item.id !== "allAgree") // "allAgree" 제외
      .every((item) => newValues.includes(item.id));

    if (allChecked) {
      form.setValue("agreeItems", [...newValues, "allAgree"]);
    } else {
      form.setValue(
        "agreeItems",
        newValues.filter((value) => value !== "allAgree"),
      );
    }
  };

  const marketingAgreeClassName = (id: UserServiceAgreeFormEnum) => {
    if (id === "marketingAgree") {
      return "items-start";
    }
  };

  useEffect(() => {
    makeRandomNickname();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col w-full desktop:h-[calc(100vh-70px)] tablet:h-[calc(100vh-70px)] mobile:h-[calc(100vh-48px)] justify-start items-center p-4 gap-8">
      <section className="flex desktop:w-[400px] tablet:w-[312px] mobile:w-full flex-col desktop:justify-center tablet:justify-center mobile:justify-start desktop:items-center tablet:items-center mobile:items-start gap-8">
        <div className="font-extrabold desktop:text-[40px] tablet:text-[28px] mobile:text-[24px]">
          타자모어에서 사용할 <br /> 닉네임을 입력해주세요.
        </div>
        <div className="flex w-full flex-col desktop:justify-center tablet:justify-center mobile:justify-start desktop:items-center tablet:items-center mobile:items-start">
          <div className="flex desktop:text-lg tablet:text-sm mobile:text-sm font-medium">
            닉네임은 공백없이 12자 이하,
          </div>
          <div className="flex desktop:text-lg tablet:text-sm mobile:text-sm font-medium">
            기호는 - _ . 만 사용가능합니다.
          </div>
        </div>
      </section>
      <form
        onSubmit={handleSubmit(updateNickname)}
        className="flex flex-col desktop:w-[400px] tablet:w-[312px] mobile:w-full  desktop:gap-[60px] tablet:gap-[64px] mobile:gap-[147px]"
      >
        <div className="flex flex-col desktop:gap-[40px] tablet:gap-7 mobile:gap-7">
          <div className="flex flex-row desktop:h-[77px] tablet:h-[77px] mobile:h-[62px] gap-[14px]">
            <Controller
              name="nickname"
              control={control}
              defaultValue=""
              rules={{
                required: "닉네임은 필수로 작성해주셔야 해요.",
                minLength: {
                  value: 2,
                  message: "2자 ~ 12자까지 가능해요.",
                },
                maxLength: {
                  value: 12,
                  message: "닉네임은 최대 12자까지 설정 가능합니다.",
                },
              }}
              render={({ field }) => (
                <InputLabel
                  labelContent="닉네임 입력"
                  placeholder="닉네임을 입력해주세요."
                  error={!!errors.nickname}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleChangeNickname(e.target.value);
                  }}
                  onBlur={field.onBlur}
                  value={field.value}
                  status={status}
                  required
                  message={errors.nickname?.message || message}
                />
              )}
            />
            <div className="flex items-end desktop:h-[77px] tablet:h-[67px] mobile:h-[62px]">
              <Button
                variant="ghost"
                type="button"
                className="desktop:w-[120px] tablet:w-[99px] mobile:w-[56px] desktop:h-14 tablet:h-[52px] mobile:h-[48px] bg-black desktop:hover:bg-custom-divGrayBackground tablet:active:bg-custom-divGrayBackground mobile:active:bg-custom-divGrayBackground text-base font-semibold px-3 py-4 rounded-md"
                onClick={makeRandomNickname}
              >
                <div className="flex flex-row gap-1 mobile:text-sm">
                  <div className="desktop:w-6 tablet:w-6 mobile:w-5 desktop:h-6 tablet:h-6 mobile:h-5">
                    <Image
                      src="/icons/retry_nickname.svg"
                      alt="random nickname"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[92px] text-xs text-center desktop:w-[400px] tablet:w-[312px] mobile:w-[339px]">
          부적절한 닉네임은 제한 될 수 있습니다.
        </div>
        <Button
          className="flex justify-center items-center desktop:w-[400px] tablet:w-[312px] mobile:w-[339px] h-14 bg-custom-purple hover:bg-custom-hoverPurple rounded-sm absolute bottom-[28px]"
          disabled={
            (!!errors.nickname && status !== "correct") ||
            status === "default" ||
            isDisabled
            // !watch("ageRange") ||
            // !watch("gender")
          }
        >
          <div className="desktop:text-xl tablet:text-base mobile:text-base text-center desktop:w-[400px] tablet:w-[312px] mobile:w-[339px]">
            가입 완료
          </div>
        </Button>
      </form>
      <div className="flex items-center justify-start w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(agreeAndStartService)}
            className="flex flex-col w-full gap-7"
          >
            <FormField
              control={form.control}
              name="agreeItems"
              render={() => (
                <FormItem>
                  <div className="flex flex-row items-center justify-start gap-1">
                    <FormControl>
                      <div className="flex items-center justify-center w-6 h-6">
                        <Checkbox
                          id={"allAgree"}
                          checked={form
                            .watch("agreeItems")
                            .includes("allAgree")}
                          onCheckedChange={handleAllAgreeChange}
                          className="w-[18px] h-[18px] rounded-full"
                        />
                      </div>
                    </FormControl>
                    <FormLabel
                      htmlFor="allAgree"
                      className={twMerge(
                        "text-base font-semibold",
                        isError && "text-custom-textBlackColor",
                      )}
                    >
                      약관 전체 동의
                    </FormLabel>
                  </div>
                  <Divider className="my-[18px]" />
                  {agreeItems.map(
                    (item) =>
                      item.id !== "allAgree" && (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="agreeItems"
                          render={({ field }) => {
                            return (
                              <div>
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-center justify-between"
                                >
                                  <div
                                    className={twMerge(
                                      "flex items-center justify-center gap-1",
                                      marketingAgreeClassName(item.id),
                                    )}
                                  >
                                    <FormControl>
                                      <div className="flex items-center justify-center w-6 h-6">
                                        <div className="flex items-center justify-center h-full">
                                          <Checkbox
                                            id={item.id}
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              handleIndividualChange(
                                                item.id,
                                                checked,
                                              );
                                            }}
                                            className="w-[18px] h-[18px] rounded-full"
                                          />
                                        </div>
                                      </div>
                                    </FormControl>
                                    <FormLabel
                                      htmlFor={item.id}
                                      className={twMerge(
                                        "flex items-center desktop:max-w-[251px] tablet:max-w-[206px] mobile:max-w-[206px] text-sm font-medium",
                                        isError &&
                                          !field.value.includes(item.id) &&
                                          item.id !== "marketingAgree"
                                          ? "text-custom-error"
                                          : "text-custom-textBlackColor",
                                      )}
                                    >
                                      {item.label}
                                    </FormLabel>
                                  </div>
                                  {item.externalLink && (
                                    <div>
                                      <Link
                                        href={item.externalLink}
                                        target="_blank"
                                      >
                                        <Image
                                          src="/icons/agree_arrow_right.svg"
                                          alt="agree_arrow_right"
                                          width={20}
                                          height={20}
                                        />
                                      </Link>
                                    </div>
                                  )}
                                </FormItem>
                              </div>
                            );
                          }}
                        />
                      ),
                  )}
                  <FormMessage
                    className={
                      isError
                        ? "text-custom-error"
                        : "text-custom-textBlackColor"
                    }
                  />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
