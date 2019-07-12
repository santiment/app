import { Observable } from 'rxjs'
import { USER_TOGGLE_NEWS, APP_USER_NEWS_SAVE } from './../actions/types'
import { saveKeyState } from '../utils/localStorage'

const handleNewsToggle = (action$, store) =>
  action$
    .ofType(USER_TOGGLE_NEWS)
    .debounceTime(200)
    .map(() => {
      const isNewsEnabled = !store.getState().rootUi.isNewsEnabled
      saveKeyState('isNewsEnabled', isNewsEnabled)
      return Observable.of(isNewsEnabled)
    })
    .mergeMap(({ value }) =>
      Observable.of({
        type: APP_USER_NEWS_SAVE,
        payload: value
      })
    )

export default handleNewsToggle
