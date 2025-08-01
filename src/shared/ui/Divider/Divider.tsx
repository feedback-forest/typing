import { cn } from "@/shared/lib/utils";

interface DividerProps {
  isDashed?: boolean;
  className?: string;
}
const Divider = ({ isDashed, className }: DividerProps) => {
  return (
    <hr
      className={cn("divide-solid", className, isDashed && "border-dashed")}
    ></hr>
  );
};

export default Divider;
