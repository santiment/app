import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import {
  USER_TOGGLE_NIGHT_MODE,
  APP_USER_NIGHT_MODE_SAVE,
  APP_USER_NIGHT_MODE_SAVE_FAILED,
  CHANGE_USER_DATA
} from './../actions/types'
import { saveKeyState, loadKeyState } from '../utils/localStorage'
import { handleErrorAndTriggerAction } from './utils'
import { isHalloweenDay } from '../utils/utils'

const NIGHT_MODE_MUTATION = gql`
  mutation updateUserSettings($theme: String!) {
    updateUserSettings(settings: { theme: $theme }) {
      theme
    }
  }
`

export const THEME_TYPES = {
  default: 'default',
  nightmode: 'nightmode'
}

const handleNightModeToggle = (action$, store, { client }) =>
  action$
    .ofType(USER_TOGGLE_NIGHT_MODE)
    .exhaustMap(() =>
      Observable.of(document.body.classList.toggle('night-mode'))
    )
    .mergeMap(isNightModeEnabled => {
      saveKeyState('isNightMode', isNightModeEnabled)
      console.log(isNightModeEnabled)

      if (isHalloweenDay) {
        saveKeyState('disabledHalloweenMode', !isNightModeEnabled)
      }

      const { data } = store.getState().user
      if (data && data.id) {
        const mutation = client.mutate({
          mutation: NIGHT_MODE_MUTATION,
          variables: {
            theme: isNightModeEnabled
              ? THEME_TYPES.nightmode
              : THEME_TYPES.default
          }
        })
        return Observable.from(mutation)
          .mergeMap(({ data: { updateUserSettings } }) => {
            return Observable.of({
              type: APP_USER_NIGHT_MODE_SAVE,
              payload: updateUserSettings.theme === THEME_TYPES.nightmode
            })
          })
          .catch(handleErrorAndTriggerAction(APP_USER_NIGHT_MODE_SAVE_FAILED))
      }
      return Observable.of({
        type: APP_USER_NIGHT_MODE_SAVE,
        payload: isNightModeEnabled
      })
    })

export const saveNightModeAfterLaunch = action$ =>
  action$
    .ofType(CHANGE_USER_DATA)
    .filter(
      ({ user = {} }) =>
        user.settings && user.settings.theme === THEME_TYPES.nightmode
    )
    .filter(() => loadKeyState('isNightMode') === undefined)
    .exhaustMap(() => Observable.of(document.body.classList.add('night-mode')))
    .mergeMap(() => {
      saveKeyState('isNightMode', true)
      return Observable.of({
        type: APP_USER_NIGHT_MODE_SAVE,
        payload: true
      })
    })

// NOTE(haritonasty): for preventing diff between "isNightModeEnabled" in LS = true (deprecated) and false on server
export const sendNightModeIfDiff = (action$, store, { client }) =>
  action$
    .ofType(CHANGE_USER_DATA)
    .filter(
      () =>
        loadKeyState('isNightMode') === undefined &&
        loadKeyState('isNightModeEnabled') === true
    )
    .mergeMap(({ user: { settings: { theme } } }) => {
      saveKeyState('isNightMode', true)
      const mutation = client.mutate({
        mutation: NIGHT_MODE_MUTATION,
        variables: { theme: true }
      })
      return Observable.from(mutation)
        .mergeMap(({ data: { updateUserSettings } }) => {
          return Observable.of({
            type: APP_USER_NIGHT_MODE_SAVE,
            payload: updateUserSettings.theme === THEME_TYPES.nightmode
          })
        })
        .catch(handleErrorAndTriggerAction(APP_USER_NIGHT_MODE_SAVE_FAILED))
    })

export default handleNightModeToggle
