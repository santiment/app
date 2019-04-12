import gql from 'graphql-tag'
import { Observable } from 'rxjs'
import { showNotification } from './../actions/rootActions'
import { handleErrorAndTriggerAction } from './utils'
import { userGQL } from './handleLaunch'
import * as actions from './../actions/types'

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
      let data = proxy.readQuery({ query: userGQL })
      data.currentUser.privacyPolicyAccepted =
        newData.data.updateTermsAndConditions.privacyPolicyAccepted
      data.currentUser.marketingAccepted =
        newData.data.updateTermsAndConditions.marketingAccepted
      proxy.writeQuery({ query: userGQL, data })
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
        .catch(handleErrorAndTriggerAction(actions.APP_TOGGLE_GDPR_FAILED))
    })

export default handleGDPR
