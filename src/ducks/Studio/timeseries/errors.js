const SUBSCRIPTION_INTERVAL_ANCHOR = 'outside the allowed interval'
const SUBSCRIPTION_INTERVAL_MSG =
  'Requested dates are outside of the allowed interval for your subscription'

export function substituteErrorMsg(backendMsg) {
  if (backendMsg.includes(SUBSCRIPTION_INTERVAL_ANCHOR)) {
    return SUBSCRIPTION_INTERVAL_MSG
  }

  return backendMsg
}
