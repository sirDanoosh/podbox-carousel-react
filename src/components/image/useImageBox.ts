import { useEffect, useState } from "react";
import { TImage } from ".";

function useImage(props: TImage) {
  const { slide } = props;
  const [imgUrl, setImgUrl] = useState<string>("");
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  function imageLoadedTrigger() {
    setImageLoading(false);
  }

  function imageLoadingTrigger() {
    setImageLoading(true);
  }

  useEffect(() => {
    if (!slide) return;

    if (window.innerWidth > 1280) {
      if (imgUrl === slide.imageUrl) return;
      setImgUrl(slide.imageUrl);
      imageLoadingTrigger();
    } else if (window.innerWidth > 768) {
      if (imgUrl === slide.mediumImageUrl) return;
      setImgUrl(slide.mediumImageUrl);
      imageLoadingTrigger();
    } else {
      if (imgUrl === slide.smallImageUrl) return;
      setImgUrl(slide.smallImageUrl);
      imageLoadingTrigger();
    }
  }, [window.innerWidth]);

  return {
    imageLoadedTrigger,
    imageLoading,
    imgUrl,
  };
}

export default useImage;
