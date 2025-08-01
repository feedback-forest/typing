import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip";

import { twMerge } from "tailwind-merge";

interface UnifiedTooltipProps {
  triggerItem: JSX.Element;
  tooltipContent: JSX.Element;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  contentClassName?: string;
}

const UnifiedTooltip = ({
  triggerItem,
  tooltipContent,
  side,
  sideOffset,
  align,
  alignOffset,
  open,
  defaultOpen,
  onOpenChange,

  contentClassName,
}: UnifiedTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <TooltipTrigger asChild>{triggerItem}</TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          className={twMerge("relative", contentClassName)}
        >
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UnifiedTooltip;
