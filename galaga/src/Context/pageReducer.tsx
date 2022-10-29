import PageType from "../model/pageType.enum";
import Action from "./gameReducer";

export interface PageReducerState {
  currentPage: PageType;
}

export function pageReducer(
  state: PageReducerState,
  action: Action<PageType, any>
) {
  switch (action.type) {
    case PageType.Menu: {
      return { ...state, currentPage: action.payload } as PageReducerState;
    }
    default: {
      return { ...state };
    }
  }
}
