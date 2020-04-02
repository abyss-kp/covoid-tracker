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