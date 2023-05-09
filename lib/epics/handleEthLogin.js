import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { connectWallet } from 'webkit/utils/web3';
import { notifications$ } from 'webkit/ui/Notifications';
import * as web3Helpers from './../web3Helpers';
import * as actions from './../actions/types';
import { handleErrorAndTriggerAction } from './utils';
import { getUserWallet } from '../pages/UserSelectors';
import { savePrevAuthProvider } from '../utils/localStorage';
import GA from './../utils/tracking';
import { USER_GQL_FRAGMENT } from './handleLaunch';
const ETH_LOGIN_QUERY = gql`
  mutation ethLogin(
    $signature: String!
    $address: String!
    $messageHash: String!
  ) {
    ethLogin(
      signature: $signature
      address: $address
      messageHash: $messageHash
    ) {
      token
      user
        ${USER_GQL_FRAGMENT}
    }
  }
`;
export const REMOVE_CONNECTED_WALLET_QUERY = gql`
  mutation removeUserEthAddress($address: String!) {
    removeUserEthAddress(address: $address) {
      ethAccounts {
        address
      }
    }
  }
`;
export const CONNECT_NEW_WALLET_QUERY = gql`
  mutation addUserEthAddress($address: String!, $signature: String!, $messageHash: String!) {
    addUserEthAddress(address: $address, signature: $signature, messageHash: $messageHash) {
      ethAccounts {
        address
      }
    }
  }
`;

const loginWithEthereum = client => {
  return new Promise(async (resolve, reject) => {
    let address = '';

    try {
      address = await web3Helpers.getAccount();
    } catch (error) {
      reject(error);
    }

    web3Helpers.signMessage(address).then(({
      messageHash,
      signature
    }) => {
      const mutation = client.mutate({
        mutation: ETH_LOGIN_QUERY,
        variables: {
          signature,
          address,
          messageHash
        }
      });
      resolve(mutation);
    }).catch(error => {
      reject(error);
    });
  });
};

const handleEthLogin = (action$, store, {
  client
}) => action$.ofType(actions.USER_ETH_LOGIN).takeUntil(action$.ofType(actions.USER_LOGIN_SUCCESS)).switchMap(action => {
  const {
    consent
  } = action.payload;
  return Observable.from(loginWithEthereum(client)).mergeMap(({
    data
  }) => {
    const {
      token,
      user
    } = data.ethLogin;
    GA.update(user);
    savePrevAuthProvider('metamask');
    return Observable.of({
      type: actions.USER_LOGIN_SUCCESS,
      token,
      user,
      consent: user.consent_id || consent
    });
  }).catch(handleErrorAndTriggerAction(actions.USER_LOGIN_FAILED));
});

const connectingNewWallet = () => connectWallet('Login in Santiment with address ').then(({
  ethAccounts
}) => ethAccounts).catch(e => {
  const error = e && (e[0] || e).message;
  notifications$.show({
    type: 'error',
    title: 'Failed to connect wallet',
    description: error
  });
  return new Error(e);
});

export const connectNewWallet = (action$, store, {
  client
}) => action$.ofType(actions.SETTINGS_CONNECT_NEW_WALLET).mergeMap(action => {
  return Observable.from(connectingNewWallet(client)).mergeMap(accounts => {
    return Observable.of({
      type: actions.SETTINGS_CONNECT_NEW_WALLET_SUCCESS,
      payload: {
        accounts
      }
    });
  }).catch(handleErrorAndTriggerAction(actions.SETTINGS_CONNECT_NEW_WALLET_FAILED));
});
export const removeConnectedWallet = (action$, store, {
  client
}) => action$.ofType(actions.SETTINGS_REMOVE_CONNECTED_WALLET).switchMap(action => {
  const address = getUserWallet(store.getState());
  const mutation = client.mutate({
    mutation: REMOVE_CONNECTED_WALLET_QUERY,
    variables: {
      address
    }
  });
  return Observable.from(mutation).mergeMap(({
    data
  }) => {
    const accounts = data.removeUserEthAddress.ethAccounts;
    return Observable.of({
      type: actions.SETTINGS_REMOVE_CONNECTED_WALLET_SUCCESS,
      payload: {
        accounts
      }
    });
  }).catch(handleErrorAndTriggerAction(actions.SETTINGS_REMOVE_CONNECTED_WALLET_FAILED));
});
export default handleEthLogin;