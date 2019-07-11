import { Observable } from 'rxjs'
import {
  USER_TOGGLE_BETA_MODE,
  APP_USER_BETA_MODE_SAVE,
  APP_USER_NEWS_SAVE
} from './../actions/types'
import { saveKeyState } from '../utils/localStorage'

const handleBetaModeToggle = (action$, store) =>
  action$
    .ofType(USER_TOGGLE_BETA_MODE)
    .debounceTime(200)
    .map(() => {
      const isBetaModeEnabled = !store.getState().rootUi.isBetaModeEnabled
      saveKeyState('isBetaModeEnabled', isBetaModeEnabled)
      if (!isBetaModeEnabled) saveKeyState('isNewsEnabled', false)
      return Observable.of(isBetaModeEnabled)
    })
    .mergeMap(({ value }) => {
      return value
        ? Observable.of({
          type: APP_USER_BETA_MODE_SAVE,
          payload: value
        })
        : Observable.from([
          {
            type: APP_USER_BETA_MODE_SAVE,
            payload: value
          },
          // NOTE(haritonasty): News are connected with beta mode. We should turn news off - if beta turned off
          {
            type: APP_USER_NEWS_SAVE,
            payload: false
          }
        ])
    })

export default handleBetaModeToggle
