import React from 'react'
import { connect } from 'react-redux'
import { Input, Button } from '@santiment-network/ui'
import { getUserWallet } from './../UserSelectors'
import * as actions from './../../actions/types'

const AccountEthKeyForm = ({
  address,
  loading,
  hasEmail,
  removeConnectedWallet,
  connectNewWallet,
  isConnectWalletFailed,
  isConnectWalletPending
}) => {
  return (
    <div>
      <label>Eth Public Key</label>
      {address && (
        <div>
          <Input readOnly disabled={!address} defaultValue={address} />
          {hasEmail && (
            <Button onClick={removeConnectedWallet}>
              Remove connected wallet
            </Button>
          )}
        </div>
      )}
      {!address && (
        <div>
          <Button
            disabled={isConnectWalletPending}
            variant='border'
            accent='positive'
            onClick={connectNewWallet}
          >
            Connect with metamask
          </Button>
          {isConnectWalletFailed && (
            <p>Connecting metamask wallet failed - it is already being used</p>
          )}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  address: getUserWallet(state),
  loading: state.user.isLoading,
  hasEmail: !!state.user.data.email,
  isConnectWalletFailed: state.accountUi.isConnectWalletFailed,
  isConnectWalletPending: state.accountUi.isConnectWalletPending
})

const mapDispatchToProps = dispatch => ({
  removeConnectedWallet: () =>
    dispatch({ type: actions.SETTINGS_REMOVE_CONNECTED_WALLET }),
  connectNewWallet: () =>
    dispatch({ type: actions.SETTINGS_CONNECT_NEW_WALLET })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountEthKeyForm)
