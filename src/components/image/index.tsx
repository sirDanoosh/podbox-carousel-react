import logo from "../../../public/assets/logo.svg";
import { ISlider } from "../../types";
import useImageBox from "./useImageBox";

import { Fragment } from "react";
import "./index.scss";

export type TImage =
  | {
      slide?: ISlider;
      isLoading: true;
    }
  | {
      slide: ISlider;
      isLoading?: false;
    };

function Image(props: TImage) {
  const { isLoading, slide } = props;
  const { imageLoading, imageLoadedTrigger, imgUrl } = useImageBox(props);

  return (
    <div
      className={`pdx-slide ${
        imageLoading || isLoading ? "--loading" : ""
      }`.trim()}
    >
      {!isLoading && (
        <Fragment>
          <picture>
            <img
              src={imgUrl}
              // srcSet={`${slide.smallImageUrl} 768w, ${slide.mediumImageUrl} 1280w, ${slide.imageUrl}`}
              className="pdx-slide__img"
              loading="lazy"
              alt="movie image"
              onLoad={imageLoadedTrigger}
            />
          </picture>
          <img src={slide.logoImageUrl} className="pdx-slide__logo" />
        </Fragment>
      )}
      <img className="pdx-slide__loading" src={logo} />
    </div>
  );
}

export default Image;
