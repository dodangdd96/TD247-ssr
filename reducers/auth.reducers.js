import update from "immutability-helper";
import jwtDecode from "jwt-decode";
import {
  LOGIN_SUCCESS
} from 'constant';

const initState = { 
  user: {} 
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return update(state, {
        accessToken: { $set: action.payload },
        user: { $set: jwtDecode(action.payload) },
      });
    default:
      return state;
  }
};
