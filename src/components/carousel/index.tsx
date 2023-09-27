import useCarousel from "./useCarousel";

import Image from "../image";
import Pagination from "../pagination";
import "./index.scss";

function Carousel() {
  const { isLoading, sliders, scrollHandler, slideNumber, carousel } =
    useCarousel();

  return (
    <section className="pdx-carousel">
      <div
        ref={carousel}
        className="pdx-carousel__wrapper"
        onScroll={(e) => scrollHandler(e.currentTarget.scrollLeft)}
      >
        {isLoading ? (
          <Image isLoading />
        ) : (
          sliders.map((sld, idx) => <Image slide={sld} key={idx} />)
        )}
      </div>
      {!isLoading && (
        <div className="pdx-carousel__pagination">
          <Pagination dotCount={sliders.length} slideNumber={slideNumber} />
        </div>
      )}
    </section>
  );
}

export default Carousel;
