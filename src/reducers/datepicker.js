import { SET_START_DATE,SET_END_DATE } from '../actions/datepicker'

const initialState = {
  startDate:"02/01/2020",
  endDate:new Date(Date.now() - 24*60*60*1000).toLocaleDateString('en-US')
}
function datepicker(state = initialState, action) {
  switch (action.type) {
    case SET_START_DATE:
      return {
        ...state,
        startDate: action.payload
      }
      case SET_END_DATE:
      return {
        ...state,
        endDate: action.payload
      }
      default:
        return state
  }
}

export default datepicker
