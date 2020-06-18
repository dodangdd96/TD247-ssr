import update from "immutability-helper";
import {
  FETCH_JOB_POST,
  CREATE_JOB_POST,
  UPDATE_JOB_POST,
  FETCH_JOB
} from '../constant';
const initState = {
	list_jobs: [],
  job: {},
 };

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_JOB_POST:
      return update(state, {
        list_jobs: { $set: action.payload },
      });
    case FETCH_JOB:
      return update(state, {
        job: { $set: action.payload },
      });
    case UPDATE_JOB_POST:
      return update( state, { job: { $set: action.payload } } );
    case CREATE_JOB_POST:
      return update( state, { job: { $set: action.payload } } );
    default:
      return state;
  }
};
