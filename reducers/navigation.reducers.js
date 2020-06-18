import {
  COLLAPSED
} from '../constant';

const initialState = {
  collapsed: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case COLLAPSED:
      return { ...state, collapsed: !state.collapsed };
  }
  return state;
};