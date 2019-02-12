import { Observable } from 'rxjs'
import { APP_TOGGLE_SEARCH_FOCUS, APP_LAUNCHED } from './../actions/types'

const keyboard$ = Observable.fromEvent(window, 'keydown')

const keyboardEpic = (action$, store, { client }) =>
  action$.ofType(APP_LAUNCHED).mergeMap(() =>
    keyboard$
      .filter(({ key }) => {
        const bodyHasFocus = document.activeElement === document.body
        return key === '/' && bodyHasFocus
      })
      .mergeMap(event => {
        return Observable.merge(
          Observable.of({ type: APP_TOGGLE_SEARCH_FOCUS })
        )
      })
  )

export default keyboardEpic
