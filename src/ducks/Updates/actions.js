// timeseries
export const NEW_APP_AVAILABLE = '[version] NEW_APP_AVAILABLE'
export const IS_LATEST_APP = '[version] IS_LATEST_APP'

export const newAppAvailable = () => ({
  type: NEW_APP_AVAILABLE
})
export const markAsLatestApp = () => ({
  type: IS_LATEST_APP
})
