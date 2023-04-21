import * as types from "./types";

export const Update_data = (payload) => {
    return {
        type: types.FETCH_USER_DATA,
        payload: payload
    }
};

export const Logout_user =()=>{
    return{
        type: types.LOGOUT_USER
    }
};