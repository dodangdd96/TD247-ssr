import {
  LOGIN_SUCCESS
} from '../constant';

export const loginSuccess = (accessToken) => (dispatch) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: accessToken,
  });
};