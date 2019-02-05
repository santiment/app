import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Input, Button } from '@santiment-network/ui'
import * as actions from './../../actions/types'

const AccountEthKeyForm = ({
  ethAccounts,
  loading,
  hasEmail,
  removeConnectedWallet,
  connectNewWallet
}) => {
  const doesUserHaveEthAccounts = ethAccounts && ethAccounts.length > 0
  const address = doesUserHaveEthAccounts ? ethAccounts[0].address : ''
  return (
    <div>
      <label>Eth Public Key</label>
      {address && (
        <Fragment>
          <Input readOnly disabled={!address} defaultValue={address} />
          {hasEmail && (
            <Button onClick={removeConnectedWallet}>
              Remove connected wallet
            </Button>
          )}
        </Fragment>
      )}
      {!address && (
        <Button onClick={connectNewWallet}>Connect with metamask</Button>
      )}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  removeConnectedWallet: () =>
    dispatch({ type: actions.SETTINGS_REMOVE_CONNECTED_WALLET }),
  connectNewWallet: () =>
    dispatch({ type: actions.SETTINGS_CONNECT_NEW_WALLET })
})

export default connect(
  undefined,
  mapDispatchToProps
)(AccountEthKeyForm)
