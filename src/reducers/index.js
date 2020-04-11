import { SET_COUNTRIES,SET_COUNTRY_CITIES ,SET_SELECTED_COUNTRY_CITY,
  SET_STATE_WISE_CITY_DATA,SET_CASE_SERIES,SET_HEADER_SEARCH,
  SET_LOADER,SHOW_SNACKBAR,HIDE_SNACKBAR} from '../actions/index'
import { combineReducers } from 'redux';

const initialState = {
  // states:{},
  countries: [],
  // selectedCountryCity:{
  //   country:"",
  //   city:""
  // },
  statewise:[],
  caseSeries:[],
  searchField:"",
  message:false,
  loader:false
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
      // case SET_SELECTED_COUNTRY_CITY:
      // return {
      //   ...state,
      //   selectedCountryCity: action.payload
      // }
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
      case SET_HEADER_SEARCH:
      return {
        ...state,
        searchField: action.payload
      }
      case SET_LOADER:
      return {
        ...state,
        loader: action.payload
      }
      case SHOW_SNACKBAR:
      return {
        ...state,
        message: {
          type:action.mode,
          msg:action.payload
        }
      }
      case HIDE_SNACKBAR:
      return {
        ...state,
        message: false
      }
      default:
        return state
  }
}

export default combineReducers({
  rootReducer
});
