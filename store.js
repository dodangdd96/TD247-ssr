import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import reducers from './reducers';

export const initStore = (initState = {}) =>
  createStore(
    reducers,
    initState,
    compose(
      applyMiddleware(thunkMiddleware),
      typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
  );