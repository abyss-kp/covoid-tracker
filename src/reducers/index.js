import { SET_COUNTRIES,SET_COUNTRY_CITIES ,SET_SELECTED_COUNTRY_CITY} from '../actions/index'
import { combineReducers } from 'redux';

const initialState = {
  countries: [],
  states:{},
  selectedCountryCity:{
    country:"",
    city:""
  }
}
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COUNTRIES:
      return {
        ...state,
        countries: action.payload
      }
      case SET_COUNTRY_CITIES:
      return {
        ...state,
        states: action.payload
      }
      case SET_SELECTED_COUNTRY_CITY:
      return {
        ...state,
        selectedCountryCity: action.payload
      }
      default:
        return state
  }
}

export default combineReducers({
  rootReducer
});
