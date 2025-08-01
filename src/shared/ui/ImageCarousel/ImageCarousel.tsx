import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../Carousel";
import { Dispatch, SetStateAction } from "react";

import Image from "next/image";

export interface CarouselImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ImageCarouselProps {
  setApi: Dispatch<SetStateAction<CarouselApi | undefined>>;
  images: CarouselImage[];
  isPreviousIcon?: boolean;
  isNextIcon?: boolean;
}

const ImageCarousel = ({
  setApi,
  images,
  isPreviousIcon,
  isNextIcon,
}: ImageCarouselProps) => {
  return (
    <Carousel setApi={setApi} className="w-full">
      <CarouselContent>
        {images.map((image) => {
          return (
            <CarouselItem key={image.alt}>
              <div className="flex items-center justify-center">
                <Image
                  className={`w-[${image.width}] h-[${image.height}] object-cover overflow-hidden mobile:object-cover`}
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                />
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      {isPreviousIcon && (
        <CarouselPrevious variant="ghost" className="hover:bg-transparent" />
      )}
      {isNextIcon && (
        <CarouselNext variant="ghost" className="hover:bg-transparent" />
      )}
    </Carousel>
  );
};

export default ImageCarousel;
