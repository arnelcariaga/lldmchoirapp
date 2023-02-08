// Constants
const dataInicial = {
  toggleSearch: false,
  searchHome: "",
  searchCategories: "",
  searchFavorites: "",
};

// types
const SEARCH_HOME_SUCCESS = "SEARCH_HOME_SUCCESS";
const OPEN_SEARCH_CATEGORIES_SUCCESS = "OPEN_SEARCH_CATEGORIES_SUCCESS";
const SEARCH_CATEGORIES_SUCCESS = "SEARCH_CATEGORIES_SUCCESS";
const OPEN_SEARCH_FAVORITES_SUCCESS = "OPEN_SEARCH_FAVORITES_SUCCESS";
const SEARCH_FAVORITES_SUCCESS = "SEARCH_FAVORITES_SUCCESS";
const TOGGLE_SEARCH_SUCCESS = "TOGGLE_SEARCH_SUCCESS";

// reducer
export default function filesReducer(state = dataInicial, action) {
  switch (action.type) {
    case TOGGLE_SEARCH_SUCCESS:
      return { ...state, toggleSearch: action.payload };
    case SEARCH_HOME_SUCCESS:
      return { ...state, searchHome: action.payload };
    case OPEN_SEARCH_CATEGORIES_SUCCESS:
      return { ...state, openSearchCategories: action.payload };
    case SEARCH_CATEGORIES_SUCCESS:
      return { ...state, searchCategories: action.payload };
    case OPEN_SEARCH_FAVORITES_SUCCESS:
      return { ...state, openSearchFavorites: action.payload };
    case SEARCH_FAVORITES_SUCCESS:
      return { ...state, searchFavorites: action.payload };
    default:
      return state;
  }
}

// actions
export const toggleSearchAction = (val) => (dispatch) => {
  dispatch({
    type: TOGGLE_SEARCH_SUCCESS,
    payload: val,
  });

  dispatch({
    type: SEARCH_HOME_SUCCESS,
    payload: "",
  });

  dispatch({
    type: SEARCH_CATEGORIES_SUCCESS,
    payload: "",
  });

  dispatch({
    type: SEARCH_FAVORITES_SUCCESS,
    payload: "",
  });
};

export const searchHomeAction = (val) => (dispatch) => {
  dispatch({
    type: SEARCH_HOME_SUCCESS,
    payload: val,
  });
};

export const searchCategoriesAction = (val) => (dispatch) => {
  dispatch({
    type: SEARCH_CATEGORIES_SUCCESS,
    payload: val,
  });
};

export const searchFavoritesAction = (val) => (dispatch) => {
  dispatch({
    type: SEARCH_FAVORITES_SUCCESS,
    payload: val,
  });
};
