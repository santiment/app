const SUBSCRIPTION_INTERVAL = {
  anchor: 'outside the allowed interval',
  msg:
    'Requested dates are outside of the allowed interval for your subscription',
}

const PROJECT_FETCH = {
  anchor: 'for project with slug: ',
  msg: "Can't fetch data for this project",
}

const ERRORS = [SUBSCRIPTION_INTERVAL, PROJECT_FETCH]

export function substituteErrorMsg(backendMsg) {
  const error = ERRORS.find(({ anchor }) => backendMsg.includes(anchor))
  if (error) {
    return error.msg
  }

  return backendMsg
}
