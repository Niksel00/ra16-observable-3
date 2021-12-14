import { FETCH_NEWS_REQUEST, FETCH_NEWS_SUCCESS } from "./actionTypes";

export function fetchNewsRequest(id = null) {
  return { type: FETCH_NEWS_REQUEST, payload: { id } };
}

export function fetchNewsSuccess(items) {
  return { type: FETCH_NEWS_SUCCESS, payload: { items } };
}
