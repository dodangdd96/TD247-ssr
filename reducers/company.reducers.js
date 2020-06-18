import update from "immutability-helper";
import {
  FETCH_LIST_COMPANY,
  FETCH_COMPANY,
  UPDATE_COMPANY
} from 'constant';

const initState = {
	list_company: [],
  company: {},
 };

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_LIST_COMPANY:
      return update(state, {
        list_company: { $set: action.payload },
      });
    case FETCH_COMPANY:
      return update(state, {
        company: { $set: action.payload },
      });
    case UPDATE_COMPANY:
      return update( state, { company: { $set: action.payload } } );
    default:
      return state;
  }
};
