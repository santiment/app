import { Observable } from 'rxjs'
import {
  USER_TOGGLE_WIDE_CHART,
  APP_USER_WIDE_CHART_MODE_SAVE
} from './../actions/types'
import { saveKeyState } from '../utils/localStorage'

const handleWideChartToggle = action$ =>
  action$.ofType(USER_TOGGLE_WIDE_CHART).mergeMap(({ payload }) => {
    saveKeyState('isWideChart', payload)

    return Observable.of({
      type: APP_USER_WIDE_CHART_MODE_SAVE,
      payload: payload
    })
  })

export default handleWideChartToggle
