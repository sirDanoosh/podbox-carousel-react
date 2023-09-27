import { useEffect, useRef, useState } from "react";
import { ISlider, ISliderDTO } from "../../types";

function useCarousel(): {
  isLoading: boolean | string;
  sliders: Array<ISlider>;
  slideNumber: number;
  scrollHandler: (scrollLeft: number) => unknown;
  carousel: React.MutableRefObject<HTMLDivElement | null>;
} {
  const [isLoading, setIsLoading] = useState<boolean | string>(true);
  const [sliders, setSliders] = useState<Array<ISlider>>([]);
  const [slideNumber, setSlideNumber] = useState<number>(0);

  const carousel = useRef<HTMLDivElement | null>(null);

  async function fetchSlider() {
    try {
      await fetch("https://boxapi.pod.ir/v3/home/slider").then(async (res) => {
        const result = (await res.json()) as ISliderDTO;
        const filteredResult = result.sliders.filter((slid) => {
          if (slid.logoImageUrl) return slid;
        });

        setSliders(filteredResult);
        setIsLoading(false);
      });
    } catch (e) {
      console.log(e);
      setIsLoading(
        "An error ocurred, please check your network connection and refresh the page!"
      );
    }
  }

  function scrollHandler(scroll: number) {
    setSlideNumber(Math.floor(scroll / window.innerWidth));
  }

  function scrollCalculator(): number {
    return Math.floor(carousel.current!.scrollLeft / window.innerWidth) ===
      sliders.length - 1
      ? 0
      : window.innerWidth + carousel.current!.scrollLeft;
  }

  useEffect(() => {
    if (sliders.length === 0 || !carousel.current) return;

    const timeout = setInterval(() => {
      carousel.current?.scrollTo({
        left: scrollCalculator(),
        behavior: "smooth",
      });
    }, 3000);

    return () => {
      clearInterval(timeout);
    };
  }, [sliders, carousel.current]);

  useEffect(() => {
    fetchSlider();
  }, []);

  return {
    isLoading,
    sliders,
    slideNumber,
    scrollHandler,
    carousel,
  };
}

export default useCarousel;
