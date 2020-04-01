import { SET_COUNTRIES, setCountryList } from '../actions/index'
import { combineReducers } from 'redux';

const initialState = {
  contries: []
}
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COUNTRIES:
      return {
        ...state,
        countries: action.payload
      }
      default:
        return state
  }
}

export default combineReducers({
  rootReducer
});
