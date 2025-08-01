import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface ImageDescriptionProps {
  containerWidth: number;
  containerHeight: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  imageDescription: string;
  handleClick?: () => void;
}

const ImageDescription = ({
  containerWidth,
  containerHeight,
  src,
  alt,
  width,
  height,
  imageDescription,
  handleClick,
}: ImageDescriptionProps) => {
  return (
    <div
      className={twMerge(
        `flex flex-col items-center justify-center gap-3 cursor-pointer`,
        `w-[${containerWidth}px] h-[${containerHeight}px]`,
      )}
      onClick={handleClick}
    >
      <Image src={src} alt={alt} width={width} height={height} />
      <div className="text-gray-500 text-center text-base font-semibold">
        {imageDescription}
      </div>
    </div>
  );
};

export default ImageDescription;
