import Raven from 'raven-js'
import { Observable } from 'rxjs'

export const handleErrorAndTriggerAction = action => error => {
  Raven.captureException(error)
  return Observable.of({
    type: action,
    payload: error
  })
}
