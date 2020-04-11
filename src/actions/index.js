export const SET_COUNTRIES="SET_COUNTRIES"
export const setCountryList = (countries) => ({
  type: SET_COUNTRIES,
  payload: countries
});

export const SET_COUNTRY_CITIES="SET_COUNTRY_CITIES"
export const setCountryCities = (cities) => ({
  type: SET_COUNTRY_CITIES,
  payload: cities
});

export const SET_SELECTED_COUNTRY_CITY="SET_SELECTED_COUNTRY_CITY"
export const setCountryCitYSelection = (countryCity) => ({
  type: SET_SELECTED_COUNTRY_CITY,
  payload: countryCity
});

export const SET_STATE_WISE_CITY_DATA="SET_STATE_WISE_CITY_DATA"
export const setStateWiseData = (data) => ({
  type: SET_STATE_WISE_CITY_DATA,
  payload: data
});

export const SET_CASE_SERIES="SET_CASE_SERIES"
export const setCaseSeries = (data) => ({
  type: SET_CASE_SERIES,
  payload: data
});

export const SET_HEADER_SEARCH="SET_HEADER_SEARCH"
export const setHeaderSearch= (data) => ({
  type: SET_HEADER_SEARCH,
  payload: data
});

export const SET_LOADER="SET_LOADER"
export const setLoader= (bool) => ({
  type: SET_LOADER,
  payload: bool
});
export const SHOW_SNACKBAR="SHOW_SNACKBAR"
export const showMessage= (mode,msg) => ({
  type: SHOW_SNACKBAR,
  payload: msg,
  mode
});
export const HIDE_SNACKBAR="HIDE_SNACKBAR"
export const hideMessage= () => ({
  type: HIDE_SNACKBAR,
  payload:false
});