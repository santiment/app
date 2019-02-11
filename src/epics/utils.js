import { Observable } from 'rxjs'

export const handleErrorAndTriggerAction = action => error =>
  Observable.of({ type: action, payload: error })
