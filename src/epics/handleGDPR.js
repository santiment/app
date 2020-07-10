import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import { showNotification } from './../actions/rootActions'
import { handleErrorAndTriggerAction } from './utils'
import { USER_EMAIL_LOGIN_QEURY } from './handleLaunch'
import Raven from 'raven-js'
import * as actions from './../actions/types'
import { updateUser } from '../contexts/user'

const PRIVACY_QUERY = gql`
  mutation updateTermsAndConditions(
    $privacyPolicyAccepted: Boolean!
    $marketingAccepted: Boolean!
  ) {
    updateTermsAndConditions(
      privacyPolicyAccepted: $privacyPolicyAccepted
      marketingAccepted: $marketingAccepted
    ) {
      id
      privacyPolicyAccepted
      marketingAccepted
    }
  }
`

const getVariablesByType = ({ user, type }) => {
  const marketingAccepted =
    type === actions.USER_TOGGLE_MARKETING
      ? !user.data.marketingAccepted
      : user.data.marketingAccepted
  const privacyPolicyAccepted =
    type === actions.USER_TOGGLE_PRIVACY_POLICY
      ? !user.data.privacyPolicyAccepted
      : user.data.privacyPolicyAccepted
  return {
    marketingAccepted,
    privacyPolicyAccepted
  }
}

const privacyGQLHelper = (user, type) => {
  const variables = getVariablesByType({ user, type })
  updateUser(variables)
  return {
    variables,
    optimisticResponse: {
      __typename: 'Mutation',
      updateTermsAndConditions: {
        __typename: 'User',
        id: user.data.id,
        ...variables
      }
    },
    update: (proxy, newData) => {
      try {
        let data = proxy.readQuery({ query: USER_EMAIL_LOGIN_QEURY })
        data.currentUser.privacyPolicyAccepted =
          newData.data.updateTermsAndConditions.privacyPolicyAccepted
        data.currentUser.marketingAccepted =
          newData.data.updateTermsAndConditions.marketingAccepted
        proxy.writeQuery({ query: USER_EMAIL_LOGIN_QEURY, data })
      } catch (e) {
        Raven.captureException(
          'Updating GDPR apollo cache error: ' + JSON.stringify(e)
        )
      }
    }
  }
}

const handleGDPR = (action$, store, { client }) =>
  action$
    .ofType(actions.USER_TOGGLE_PRIVACY_POLICY, actions.USER_TOGGLE_MARKETING)
    .switchMap(action => {
      const user = store.getState().user
      const mutationPromise = client.mutate({
        mutation: PRIVACY_QUERY,
        ...privacyGQLHelper(user, action.type)
      })
      return Observable.from(mutationPromise)
        .mergeMap(({ data: { updateTermsAndConditions = {} } }) => {
          const { id, __typename, ...payload } = updateTermsAndConditions
          return Observable.merge(
            Observable.of({ type: actions.USER_SETTING_GDPR, payload }),
            Observable.of(showNotification('Privacy settings is changed'))
          )
        })
        .catch(handleErrorAndTriggerAction(actions.APP_GDPR_FAILED))
    })

export default handleGDPR
