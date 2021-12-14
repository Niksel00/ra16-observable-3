import { ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { map, tap, mergeMap, retryWhen, delay } from "rxjs/operators";
import { FETCH_NEWS_REQUEST } from "../actions/actionTypes";
import { fetchNewsSuccess } from "../actions/actionCreators";

export const newsFeedEpic = (action$) =>
  action$.pipe(
    ofType(FETCH_NEWS_REQUEST),
    mergeMap((action) =>
      ajax
        .getJSON(
          `${process.env.REACT_APP_API_URL}${
            action.payload.id ? `?lastSeenId=${action.payload.id}` : ""
          }`
        )
        .pipe(
          tap((response) => console.log("response", response)),
          map((res) => {
            const data = res.map((obj) => ({
              id: obj.id,
              date: obj.date,
              text: obj.text,
              likes: obj.likes.count,
              comments: obj.comments.count,
              reposts: obj.reposts.count,
              views: obj.views.count,
            }));
            return data;
          }),
          map((data) => fetchNewsSuccess(data)),
          retryWhen(delay(3000))
        )
    )
  );
