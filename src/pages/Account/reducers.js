import * as userActions from '../../actions/types'

export const initialState = {
  isConnectWalletPending: false,
  isConnectWalletFailed: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case userActions.SETTINGS_CONNECT_NEW_WALLET:
      return {
        ...state,
        isConnectWalletPending: true,
        isConnectWalletFailed: false
      }
    case userActions.SETTINGS_CONNECT_NEW_WALLET_FAILED:
      return {
        ...state,
        isConnectWalletPending: false,
        isConnectWalletFailed: true
      }
    default:
      return state
  }
}
