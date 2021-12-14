import { FETCH_NEWS_REQUEST, FETCH_NEWS_SUCCESS } from "../actions/actionTypes";

const initial_state = {
  items: [],
  loading: false,
};

export default function newsFeedReducer(state = initial_state, action) {
  switch (action.type) {
    case FETCH_NEWS_REQUEST:
      return { ...state, loading: true };
    case FETCH_NEWS_SUCCESS:
      const { items } = action.payload;
      return { ...state, items: [...state.items, ...items], loading: false };
    default:
      return state;
  }
}
