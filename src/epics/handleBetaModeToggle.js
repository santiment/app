import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import { handleErrorAndTriggerAction } from './utils'
import {
  USER_TOGGLE_BETA_MODE,
  APP_USER_BETA_MODE_SAVE,
  APP_USER_BETA_MODE_SAVE_FAILED,
  CHANGE_USER_DATA
} from '../actions/types'
import { saveKeyState, loadKeyState } from '../utils/localStorage'
import { updateIsBetaMode } from '../stores/ui'

const BETA_MODE_MUTATION = gql`
  mutation updateUserSettings($isBetaMode: Boolean!) {
    updateUserSettings(settings: { isBetaMode: $isBetaMode }) {
      isBetaMode
    }
  }
`

const handleBetaModeToggle = (action$, store, { client }) =>
  action$
    .ofType(USER_TOGGLE_BETA_MODE)
    .map(() => {
      const isBetaModeEnabled = !store.getState().rootUi.isBetaModeEnabled
      saveKeyState('isBetaMode', isBetaModeEnabled)
      updateIsBetaMode(isBetaModeEnabled)
      return Observable.of(isBetaModeEnabled)
    })
    .mergeMap(({ value }) => {
      const { data } = store.getState().user
      if (data && data.id) {
        const mutation = client.mutate({
          mutation: BETA_MODE_MUTATION,
          variables: { isBetaMode: value }
        })
        return Observable.from(mutation)
          .mergeMap(({ data: { updateUserSettings: { isBetaMode } } }) => {
            return value
              ? Observable.of({
                type: APP_USER_BETA_MODE_SAVE,
                payload: true
              })
              : Observable.of({
                type: APP_USER_BETA_MODE_SAVE,
                payload: false
              })
          })
          .catch(handleErrorAndTriggerAction(APP_USER_BETA_MODE_SAVE_FAILED))
      }
      return value
        ? Observable.of({ type: APP_USER_BETA_MODE_SAVE, payload: true })
        : Observable.of({ type: APP_USER_BETA_MODE_SAVE, payload: false })
    })

export const saveBetaModeAfterLaunch = action$ =>
  action$
    .ofType(CHANGE_USER_DATA)
    .filter(({ user = {} }) => user.settings && user.settings.isBetaMode)
    .filter(() => loadKeyState('isBetaMode') === undefined)
    .mergeMap(() => {
      saveKeyState('isBetaMode', true)
      return Observable.of({ type: APP_USER_BETA_MODE_SAVE, payload: true })
    })

// NOTE(haritonasty): for preventing diff between "isBetaModeEnabled" in LS = true (deprecated) and false on server
export const sendBetaModeIfDiff = (action$, store, { client }) =>
  action$
    .ofType(CHANGE_USER_DATA)
    .filter(
      () =>
        loadKeyState('isBetaMode') === undefined &&
        loadKeyState('isBetaModeEnabled') === true
    )
    .mergeMap(({ user: { settings: { isBetaMode } } }) => {
      saveKeyState('isBetaMode', true)
      const mutation = client.mutate({
        mutation: BETA_MODE_MUTATION,
        variables: { isBetaMode: true }
      })
      return Observable.from(mutation)
        .mergeMap(({ data: { updateUserSettings: { isBetaMode } } }) => {
          return Observable.of({
            type: APP_USER_BETA_MODE_SAVE,
            payload: isBetaMode
          })
        })
        .catch(handleErrorAndTriggerAction(APP_USER_BETA_MODE_SAVE_FAILED))
    })

export default handleBetaModeToggle
