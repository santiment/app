import * as actions from './actions'

export const initialState = {
  all: []
}

const getNewFilteredSignals = (signals, signalId) =>
  signals.filter(({ id }) => id !== signalId)

export default (state = initialState, { type, payload, data }) => {
  switch (type) {
    case actions.SIGNAL_FETCH_ALL_SUCCESS:
      return {
        ...state,
        all: [...state.all, ...payload.triggers]
      }
    case actions.SIGNAL_CREATE_SUCCESS: {
      return {
        ...state,
        all: [...state.all, payload]
      }
    }
    case actions.SIGNAL_UPDATE_SUCCESS: {
      return {
        ...state,
        all: [
          ...state.all.map(item => (item.id === payload.id ? payload : item))
        ]
      }
    }
    case actions.SIGNAL_REMOVE_BY_ID_SUCCESS: {
      return {
        ...state,
        all: getNewFilteredSignals(state.all, payload.id)
      }
    }
    case actions.SIGNAL_REMOVE_BY_ID_FAILED: {
      return {
        ...state,
        all: getNewFilteredSignals(state.all, data.id)
      }
    }
    default:
      return state
  }
}
