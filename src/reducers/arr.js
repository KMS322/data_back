import produce from "../util/produce";

export const initialState = {
  loadArrsLoading: false,
  loadArrsDone: false,
  loadArrsError: null,
  downArrsLoading: false,
  downArrsDone: false,
  downArrsError: null,
  arrs: null,
};

export const LOAD_ARRS_REQUEST = "LOAD_ARRS_REQUEST";
export const LOAD_ARRS_SUCCESS = "LOAD_ARRS_SUCCESS";
export const LOAD_ARRS_FAILURE = "LOAD_ARRS_FAILURE";

export const DOWN_ARRS_REQUEST = "DOWN_ARRS_REQUEST";
export const DOWN_ARRS_SUCCESS = "DOWN_ARRS_SUCCESS";
export const DOWN_ARRS_FAILURE = "DOWN_ARRS_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_ARRS_REQUEST:
        draft.loadArrsLoading = true;
        draft.loadArrsError = null;
        draft.loadArrsDone = false;
        break;
      case LOAD_ARRS_SUCCESS:
        draft.loadArrsLoading = false;
        draft.arrs = action.data;
        draft.loadArrsDone = true;
        break;
      case LOAD_ARRS_FAILURE:
        draft.loadArrsLoading = false;
        draft.loadArrsError = action.error;
        break;
      case DOWN_ARRS_REQUEST:
        draft.downArrsLoading = true;
        draft.downArrsError = null;
        draft.downArrsDone = false;
        break;
      case DOWN_ARRS_SUCCESS:
        draft.downArrsLoading = false;
        draft.downArrsDone = true;
        break;
      case DOWN_ARRS_FAILURE:
        draft.downArrsLoading = false;
        draft.downArrsError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
