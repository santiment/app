import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import * as actions from '../../actions/types'
import Label from '@santiment-network/ui/Label'
import { hasMetamask } from '../../web3Helpers'
import styles from './AccountPage.module.scss'

const getMetamaskBtnText = (address, connecting) => {
  if (!hasMetamask()) {
    return "Can't detect Metamask"
  }

  if (address) {
    return 'Disconnect'
  }

  return connecting ? 'Connecting' : 'Connect'
}

const ConnectMetamaskBlock = ({
  address,
  connectNewWallet,
  removeConnectedWallet,
  isConnectWalletPending,
}) => {
  return (
    <div className={cx(styles.metamask, 'row justify')}>
      <div className={styles.setting__left}>
        <Label className={styles.label}>Metamask</Label>
        {address ? (
          <div className={cx(styles.metasmask_address, 'c-waterloo mrg-m mrg--b')}>{address}</div>
        ) : (
          <div className='c-waterloo mrg-m mrg--b'>
            You will get the ability to deposit tokens to your Sanbase account.
            <br />
            Please follow futher instructions.
          </div>
        )}
      </div>

      <button
        className={address ? 'btn-0' : 'btn-1'}
        disabled={!hasMetamask()}
        onClick={address ? removeConnectedWallet : connectNewWallet}
      >
        {getMetamaskBtnText(address, isConnectWalletPending)}
      </button>
    </div>
  )
}

const mapStateToProps = ({
  user: {
    data: { ethAccounts = [] },
  },
  accountUi: { isConnectWalletPending, isConnectWalletFailed },
}) => ({
  address: ethAccounts.length > 0 && ethAccounts[0].address,
  isConnectWalletPending,
  isConnectWalletFailed,
})

const mapDispatchToProps = (dispatch) => ({
  removeConnectedWallet: () => dispatch({ type: actions.SETTINGS_REMOVE_CONNECTED_WALLET }),
  connectNewWallet: () => dispatch({ type: actions.SETTINGS_CONNECT_NEW_WALLET }),
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectMetamaskBlock)
