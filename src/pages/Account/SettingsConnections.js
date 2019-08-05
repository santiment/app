import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import Label from '@santiment-network/ui/Label'
import Settings from './Settings'
import * as actions from '../../actions/types'
import { hasMetamask } from '../../web3Helpers'
import ConnectTelegramBlock from './ConnectTelegramBlock'
import styles from './AccountPage.module.scss'
import cx from 'classnames'

const getMetamaskBtnText = (address, connecting) => {
  if (!hasMetamask()) {
    return "Can't detect Metamask"
  }

  if (address) {
    return 'Disconnect'
  }

  return connecting ? 'Connecting' : 'Connect'
}

class SettingsConnections extends PureComponent {
  render () {
    const {
      address,
      connectNewWallet,
      removeConnectedWallet,
      isConnectWalletPending
    } = this.props

    return (
      <Settings id='connections' header='Connections'>
        <Settings.Row>
          <div className={cx(styles.metamask)}>
            <div className={styles.setting__left}>
              <Label>Metamask</Label>
              <Label className={styles.setting__description} accent='waterloo'>
                You will get the ability to deposit tokens to your Sanbase
                account.
                <br />
                Please follow futher instructions.
              </Label>
            </div>
            <Button
              variant='fill'
              accent='positive'
              disabled={!hasMetamask()}
              className={styles.metamask_connect}
              onClick={address ? removeConnectedWallet : connectNewWallet}
            >
              {getMetamaskBtnText(address, isConnectWalletPending)}
            </Button>
          </div>
        </Settings.Row>

        <Settings.Row>
          <ConnectTelegramBlock />
        </Settings.Row>
      </Settings>
    )
  }
}

const mapStateToProps = ({
  user: {
    data: { ethAccounts = [] }
  },
  accountUi: { isConnectWalletPending, isConnectWalletFailed }
}) => ({
  address: ethAccounts.length > 0 && ethAccounts[0].address,
  isConnectWalletPending,
  isConnectWalletFailed
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
)(SettingsConnections)
