import { useEffect, useState } from "react";

import { CarouselApi } from "../ui";

export const useCarouselApi = (api: CarouselApi) => {
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const handleSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api, count, current]);

  return { current, count };
};
