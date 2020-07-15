import update from "immutability-helper";
import {
	FETCH_FILE,
	UPDATE_FILE,
  FETCH_FILE_BY_USER,
  FETCH_LIST_FILE,
  FETCH_LIST_SAVED_FILE
} from '../constant';

const initState = {
  file: {},
  list_file: [],
  list_saved_file: []
 };

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_FILE:
      return update(state, {
        file: { $set: action.payload },
			});
		case FETCH_FILE_BY_USER: 
			return update(state, {
				file: { $set: action.payload },
			});
    case UPDATE_FILE:
      return update( state, { file: { $set: action.payload } } );
    case FETCH_LIST_FILE:
      return update( state, { list_file: { $set: action.payload } } );
    case FETCH_LIST_SAVED_FILE:
      return update( state, { list_saved_file: { $set: action.payload } } );
    default:
      return state;
  }
};
