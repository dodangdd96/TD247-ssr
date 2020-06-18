import { combineReducers } from 'redux';
import navigation from './navigation.reducers';
import user from './auth.reducers';
import company from './company.reducers';
import jobs from './job.reducers';
import file from './file.reducers'

export default combineReducers({
	navigation,
	user,
	company,
	jobs,
	file
});
