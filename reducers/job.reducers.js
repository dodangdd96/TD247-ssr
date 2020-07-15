import update from "immutability-helper";
import {
  FETCH_JOB_POST,
  CREATE_JOB_POST,
  UPDATE_JOB_POST,
  FETCH_JOB,
  FETCH_LIST_SAVED_JOB,
  CREATE_SAVED_JOB,
  FETCH_LIST_APPLIED,
  CREATE_APPLIED,
  CLEAR_JOB
} from '../constant';
const initState = {
	list_jobs: [],
  job: {},
  saved_job: [],
  applied: []
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
    case FETCH_LIST_SAVED_JOB:
      return update(state, {
        saved_job: { $set: action.payload },
      });
    case FETCH_LIST_APPLIED:
      return update(state, {
        applied: { $set: action.payload },
      });
    case UPDATE_JOB_POST:
      return update( state, { job: { $set: action.payload } } );
    case CREATE_SAVED_JOB:
      return update( state, { saved_job: { $set: action.payload } } );
    case CREATE_APPLIED:
      return update( state, { applied: { $set: action.payload } } );
    case CREATE_JOB_POST:
      return update( state, { job: { $set: action.payload } } );
    case CLEAR_JOB:
      return update( state, { job: { $set: {} } } );
    default:
      return state;
  }
};
