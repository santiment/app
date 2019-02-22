export const SIGNAL_CREATE = '[signal] CREATE_SIGNAL'
export const SIGNAL_CREATE_SUCCESS = '[signal] CREATE_SIGNAL_SUCCESS'
export const SIGNAL_CREATE_FAILED = '[signal] CREATE_SIGNAL_FAILED'
export const SIGNAL_UPDATE = '[signal] UPDATE_SIGNAL'
export const SIGNAL_UPDATE_SUCCESS = '[signal] UPDATE_SIGNAL_SUCCESS'
export const SIGNAL_UPDATE_FAILED = '[signal] UPDATE_SIGNAL_FAILED'
export const SIGNAL_FETCH_ALL = '[signal] FETCH_ALL'
export const SIGNAL_FETCH_ALL_SUCCESS = '[signal] FETCH_ALL_SUCCESS'
export const SIGNAL_FETCH_ALL_ERROR = '[signal] FETCH_ALL_ERROR'

export const WithoutChannelsError =
  'You must setup at least one channel for new signal'

export const createTrigger = ({
  target,
  metric,
  channels,
  percentThreshold,
  timeWindow,
  title,
  description,
  cooldown
}) => {
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
        type: metric
      },
      isPublic: false,
      title,
      description,
      cooldown
    }
  }
}
