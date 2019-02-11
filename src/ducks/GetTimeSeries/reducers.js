import * as actions from './actions'

export const initialState = {}

export const ERRORS = {
  COMPLEXITY: 'COMPLEXITY',
  ANY: 'ANY'
}

const getErrorType = payload => {
  try {
    const message = payload.networkError.result.errors[0].message
    if (/complex/i.test(message)) {
      return ERRORS.COMPLEXITY
    }
  } catch (e) {
    // pass
  }
  return ERRORS.ANY
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.TIMESERIES_FETCH:
      return {
        ...state
      }
    case actions.TIMESERIES_FETCH_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case actions.TIMESERIES_FETCH_FAILED:
      return {
        ...initialState,
        isError: true,
        error: { ...action.payload },
        errorType: getErrorType(action.payload)
      }
    default:
      return state
  }
}
