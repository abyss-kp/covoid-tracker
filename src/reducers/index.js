import { SET_COUNTRIES,SET_COUNTRY_CITIES ,SET_SELECTED_COUNTRY_CITY,SET_STATE_WISE_CITY_DATA,SET_CASE_SERIES} from '../actions/index'
import { combineReducers } from 'redux';

const initialState = {
  countries: [],
  states:{},
  selectedCountryCity:{
    country:"",
    city:""
  },
  statewise:[],
  caseSeries:[]
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
      case SET_STATE_WISE_CITY_DATA:
      return {
        ...state,
        statewise: action.payload
      }
      case SET_CASE_SERIES:
      return {
        ...state,
        caseSeries: action.payload
      }
      default:
        return state
  }
}

export default combineReducers({
  rootReducer
});
