export const CHANNEL_LINK = 'https://www.youtube.com/channel/UCSzP_Z3MrygWlbLMyrNmMkg'

const HIDDEN_LIVE_WEBINAR_URL = 'HIDDEN_LIVE_WEBINAR_URL'

export const checkIsHidden = (id) => {
  const hiddenId = localStorage.getItem(HIDDEN_LIVE_WEBINAR_URL)
  return hiddenId && id === hiddenId
}

export const hideWidget = (url) => {
  localStorage.setItem(HIDDEN_LIVE_WEBINAR_URL, url)
}

const PAUSED_CODE = 2
const PlAYING_CODE = 1

export const checkIsActive = (state) => state === PlAYING_CODE || state === PAUSED_CODE
