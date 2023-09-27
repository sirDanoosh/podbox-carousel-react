import "./index.scss";

export interface IPagination {
  slideNumber: number;
  dotCount: number;
}

function Pagination(props: IPagination) {
  const { slideNumber, dotCount } = props;

  return (
    <div className="pdx-pagination">
      <div className="pdx-pagination__viewport">
        {[...Array(dotCount).keys()].map((idx) => (
          <div
            key={idx}
            className={`pdx-pagination__dot ${
              idx === slideNumber ? "--active" : ""
            }`.trim()}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Pagination;
