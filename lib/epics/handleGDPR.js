const _excluded = ["id", "__typename"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { trackGdprAccept } from 'webkit/analytics/events/onboarding';
import { showNotification } from './../actions/rootActions';
import { handleErrorAndTriggerAction } from './utils';
import { USER_EMAIL_LOGIN_QEURY } from './handleLaunch';
import * as Sentry from '@sentry/react';
import * as actions from './../actions/types';
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
`;

const getVariablesByType = ({
  user,
  type
}) => {
  const marketingAccepted = type === actions.USER_TOGGLE_MARKETING ? !user.data.marketingAccepted : user.data.marketingAccepted;
  const privacyPolicyAccepted = type === actions.USER_TOGGLE_PRIVACY_POLICY ? !user.data.privacyPolicyAccepted : user.data.privacyPolicyAccepted;
  return {
    marketingAccepted,
    privacyPolicyAccepted
  };
};

const privacyGQLHelper = (user, type) => {
  const variables = getVariablesByType({
    user,
    type
  });
  return {
    variables,
    optimisticResponse: {
      __typename: 'Mutation',
      updateTermsAndConditions: _objectSpread({
        __typename: 'User',
        id: user.data.id
      }, variables)
    },
    update: (proxy, newData) => {
      try {
        let data = proxy.readQuery({
          query: USER_EMAIL_LOGIN_QEURY
        });
        data.currentUser.privacyPolicyAccepted = newData.data.updateTermsAndConditions.privacyPolicyAccepted;
        data.currentUser.marketingAccepted = newData.data.updateTermsAndConditions.marketingAccepted;
        proxy.writeQuery({
          query: USER_EMAIL_LOGIN_QEURY,
          data
        });
      } catch (e) {
        Sentry.captureException('Updating GDPR apollo cache error: ' + JSON.stringify(e));
      }
    }
  };
};

const handleGDPR = (action$, store, {
  client
}) => action$.ofType(actions.USER_TOGGLE_PRIVACY_POLICY, actions.USER_TOGGLE_MARKETING).switchMap(action => {
  const user = store.getState().user;
  const mutationPromise = client.mutate(_objectSpread({
    mutation: PRIVACY_QUERY
  }, privacyGQLHelper(user, action.type)));
  return Observable.from(mutationPromise).mergeMap(({
    data: {
      updateTermsAndConditions = {}
    }
  }) => {
    const {
      id,
      __typename
    } = updateTermsAndConditions,
          payload = _objectWithoutProperties(updateTermsAndConditions, _excluded);

    if (window.onGdprAccept) {
      window.onGdprAccept();
    }

    trackGdprAccept(true);
    return Observable.merge(Observable.of({
      type: actions.USER_SETTING_GDPR,
      payload
    }), Observable.of(showNotification('Privacy settings is changed')));
  }).catch(handleErrorAndTriggerAction(actions.APP_GDPR_FAILED));
});

export default handleGDPR;