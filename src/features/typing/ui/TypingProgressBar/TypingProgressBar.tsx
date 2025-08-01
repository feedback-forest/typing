import useTypingPercent from "@/shared/store/typingPercent";
import { Progress } from "@/shared/ui";

const TypingProgressBar = () => {
  const { typingPercent } = useTypingPercent();

  return typingPercent ? (
    <Progress value={typingPercent.percent} className="h-[1px]" />
  ) : (
    <Progress value={0} className="h-[1px]" />
  );
};

export default TypingProgressBar;
