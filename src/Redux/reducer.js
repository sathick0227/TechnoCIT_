import * as types from './types';

const initialState = {
  userData: "",
  isLoggedIn: false,
};

const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_DATA:
      return {
        ...state,
        userData: action.payload,
        isLoggedIn: true,
      };
    case types.LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};

export default MainReducer;
