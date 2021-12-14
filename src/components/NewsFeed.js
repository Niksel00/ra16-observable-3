import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewsRequest } from "../actions/actionCreators";
import usePrevious from "../hooks/usePrevious";
import News from "./News";

export default function NewsFeed() {
  const { items, loading } = useSelector((state) => state.newsFeed);
  const dispatch = useDispatch();

  let itemId = 0;
  if (items.length) {
    itemId = items[items.length - 1].id;
  }

  useEffect(() => {
    handleLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoad = () => {
    dispatch(fetchNewsRequest(itemId));
  };

  let difference = 5;
  const countPrev = usePrevious(items.length);
  if (!loading && !isNaN(countPrev)) {
    difference = items.length - countPrev;
  }

  return (
    <div className="NewsFeed">
      {items.map((item) => (
        <News key={item.id} data={item} />
      ))}
      {difference === 5 &&
        ((!loading && (
          <div className="NewsFeed__previous" onClick={handleLoad}>
            к предыдущим записям
          </div>
        )) ||
          (loading && (
            <div className="NewsFeed__previous">
              <div className="NewsFeed__loading" />
            </div>
          )))}
    </div>
  );
}
