import { cn } from "@/shared/lib/utils";

interface ResultInfoProps {
  title: string;
  content: string;
  containerClassName?: string;
  contentClassName?: string;
}

const ResultInfo = ({
  title,
  content,
  containerClassName,
  contentClassName,
}: ResultInfoProps) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-start gap-4",
        containerClassName,
      )}
    >
      <div className="text-base font-medium text-custom-textTypingGrayColor">
        {title}
      </div>
      <div className={cn("font-medium text-base", contentClassName)}>
        {content}
      </div>
    </div>
  );
};

export default ResultInfo;
