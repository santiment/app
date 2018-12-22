export const handleErrorAndTriggerAction = action => error => {
  Raven.captureException(error)
  return Observable.of({
    type: action,
    payload: error
  })
}
