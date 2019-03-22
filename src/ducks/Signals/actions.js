export const SIGNAL_CREATE = '[signal] CREATE_SIGNAL'
export const SIGNAL_CREATE_SUCCESS = '[signal] CREATE_SIGNAL_SUCCESS'
export const SIGNAL_CREATE_FAILED = '[signal] CREATE_SIGNAL_FAILED'
export const SIGNAL_UPDATE = '[signal] UPDATE_SIGNAL'
export const SIGNAL_UPDATE_SUCCESS = '[signal] UPDATE_SIGNAL_SUCCESS'
export const SIGNAL_UPDATE_FAILED = '[signal] UPDATE_SIGNAL_FAILED'
export const SIGNAL_FETCH_ALL = '[signal] FETCH_ALL'
export const SIGNAL_FETCH_ALL_SUCCESS = '[signal] FETCH_ALL_SUCCESS'
export const SIGNAL_FETCH_ALL_ERROR = '[signal] FETCH_ALL_ERROR'
// update signal
export const SIGNAL_TOGGLE_BY_ID = '[signal] TOGGLE_BY_ID'
export const SIGNAL_TOGGLE_SUCCESS = '[signal] TOGGLE_BY_ID_SUCCESS'
export const SIGNAL_TOGGLE_FAILED = '[signal] TOGGLE_BY_ID_FAILED'
// preview of history signal points
export const SIGNAL_FETCH_HISTORY_POINTS = '[signal] FETCH_HISTORY_POINTS'
export const SIGNAL_FETCH_HISTORY_POINTS_SUCCESS =
  '[signal] FETCH_HISTORY_POINTS_SUCCESS'
export const SIGNAL_FETCH_HISTORY_POINTS_FAILED =
  '[signal] FETCH_HISTORY_POINTS_FAILED'

export const WithoutChannelsError =
  'You must setup at least one channel for new signal'

export const createTrigger = ({
  target,
  metric,
  channels,
  timeWindow,
  title,
  description,
  cooldown,
  option,
  values = {
    percentThreshold: null
  }
}) => {
  const { percentThreshold } = values
  if (!channels || channels.length < 1) {
    throw new Error(WithoutChannelsError)
  }
  return {
    type: SIGNAL_CREATE,
    payload: {
      settings: {
        target,
        time_window: timeWindow,
        percent_threshold: percentThreshold,
        channel: channels[0].toLowerCase(),
        type: option
      },
      isPublic: false,
      title,
      description,
      cooldown
    }
  }
}

export const toggleTrigger = ({ id, isActive }) => ({
  type: SIGNAL_TOGGLE_BY_ID,
  payload: {
    id,
    active: !isActive
  }
})

export const fetchHistorySignalPoints = ({ cooldown, settings }) => ({
  type: SIGNAL_FETCH_HISTORY_POINTS,
  payload: {
    settings,
    cooldown
  }
})
