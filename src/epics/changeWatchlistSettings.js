import Raven from 'raven-js'
import { Observable } from 'rxjs'
import { saveKeyState } from '../utils/localStorage'
import * as actions from './../actions/types'

export const changeColumnsSettingsEpic = (action$, store, { client }) =>
  action$.ofType(actions.ASSETS_TOGGLE_COLUMNS).switchMap(({ payload }) => {
    const { key, hiddenColumns } = payload
    const allSettings = store.getState().watchlistUi.watchlistsSettings || {}
    const listSettings = allSettings[key] || {}
    console.log(allSettings, listSettings)
    saveKeyState('watchlistsSettings', {
      ...allSettings,
      [key]: { ...listSettings, hiddenColumns }
    })
    const { data } = store.getState().user
    if (data && data.id) {
      console.log('here')
    }
    return Observable.of({ type: actions.ASSETS_TOGGLE_COLUMNS_SAVE, payload })
  })
