import * as actions from './actions'

export const initialState = {
  all: []
}

const getNewFilteredSignals = (signals, signalId) =>
  signals.filter(({ id }) => id !== signalId)

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGNAL_FETCH_ALL_SUCCESS:
      return {
        ...state,
        all: [...state.all, ...action.payload.triggers]
      }
    case actions.SIGNAL_CREATE_SUCCESS: {
      return {
        ...state,
        all: [...state.all, action.payload]
      }
    }
    case actions.SIGNAL_REMOVE_BY_ID_SUCCESS: {
      return {
        ...state,
        all: getNewFilteredSignals(state.all, action.payload.id)
      }
    }
    case actions.SIGNAL_REMOVE_BY_ID_FAILED: {
      return {
        ...state,
        all: getNewFilteredSignals(state.all, action.data.id)
      }
    }
    case actions.SIGNAL_FETCH_HISTORY_POINTS:
      return {
        ...state,
        isLoading: true
      }
    case actions.SIGNAL_FETCH_HISTORY_POINTS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      }
    case actions.SIGNAL_FETCH_HISTORY_POINTS_FAILED:
      return {
        ...initialState,
        isError: true,
        isLoading: false,
        error: { ...action.payload }
      }
    default:
      return state
  }
}
