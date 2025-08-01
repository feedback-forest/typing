/* eslint-disable react/prop-types */
"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";

// import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/shared/lib/utils";

const AgeRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
AgeRadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const AgeRadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, content, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
        props.checked
          ? "bg-custom-purple text-white"
          : "bg-custom-buttonGrayBackground text-primary",
      )}
      {...props}
    >
      {content}
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center"></RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
AgeRadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { AgeRadioGroup, AgeRadioGroupItem };
