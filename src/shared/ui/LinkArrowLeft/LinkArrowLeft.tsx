import Image from "next/image";
import Link from "next/link";

interface LinkArrowLeftProps {
  width: number;
  height: number;
  href: string;
}

const LinkArrowLeft = (props: LinkArrowLeftProps) => {
  const { width, height, href } = props;

  return (
    <Link href={href}>
      <Image
        src="/icons/back_arrow_left.svg"
        alt="back"
        width={width}
        height={height}
      />
    </Link>
  );
};

export default LinkArrowLeft;
