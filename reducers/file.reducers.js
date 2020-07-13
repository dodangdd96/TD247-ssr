import update from "immutability-helper";
import {
	FETCH_FILE,
	UPDATE_FILE
} from '../constant';
const initState = {
	file: {}
 };

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_FILE:
      return update(state, {
        file: { $set: action.payload },
      });
    case UPDATE_FILE:
      return update( state, { file: { $set: action.payload } } );
    default:
      return state;
  }
};
