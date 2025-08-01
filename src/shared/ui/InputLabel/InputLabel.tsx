import Image from "next/image";
import { Input } from "..";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputLabelProps {
  labelContent: string;
  placeholder: string;
  disabled?: boolean;
  status?: InputLabelStatus;
  type?: string;
  message?: string;
  value?: string;
  error?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

export type InputLabelStatus = "default" | "correct" | "error";

const InputLabel = forwardRef<HTMLInputElement, InputLabelProps>(
  (
    {
      labelContent,
      placeholder,
      value,
      disabled,
      status = "default",
      type = "text",
      message,
      // error,
      required,
      onChange,
      onBlur,
    },
    ref,
  ) => {
    const containerClassName = () => {
      return "flex flex-col w-full gap-1";
    };

    const labelColor = () => {
      if (disabled) {
        return "text-custom-textSemiBoldBlackColor";
      }
      return "text-custom-purple";
    };

    const borderColor = () => {
      if (disabled) {
        return "border-custom-disabled";
      }
      if (status === "error") {
        return "border-custom-error";
      }
      if (status === "correct") {
        return "border-custom-correct";
      }
      return "border-custom-purple";
    };

    const textColor = () => {
      if (status === "error") {
        return "text-custom-error";
      }

      if (status === "correct") {
        return "text-custom-correct";
      }
    };

    return (
      <div className={containerClassName()}>
        <div className="flex flex-col w-full">
          <div
            className={twMerge(
              "desktop:text-base tablet:text-sm desktop:h-[21px] tablet:h-[18px]",
              labelColor(),
            )}
          >
            <div className="flex items-center w-fit relative">
              {labelContent}
              {required && (
                <div className="absolute top-1 right-[-8px]">
                  <Image
                    src="/icons/required.svg"
                    alt="required"
                    width={5}
                    height={5}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={twMerge(`flex w-full border-b-2`, borderColor())}>
            <Input
              type={type}
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              className="desktop:text-xl tablet:text-base mobile:text-base desktop:h-14 tablet:h-11 border-none shadow-none focus-visible:ring-0 tablet:px-0 mobile:px-0 data-[placeholder]:text-custom-textDescriptionGrayColor"
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
            />
          </div>
        </div>
        <div className={twMerge("flex w-full text-base", textColor())}>
          {message}
        </div>
      </div>
    );
  },
);

InputLabel.displayName = "InputLabel";

export default InputLabel;
