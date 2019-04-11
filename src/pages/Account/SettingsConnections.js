import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Label, Button } from '@santiment-network/ui'
import Settings from './Settings'
import * as actions from '../../actions/types'
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

const getTelegramBtnText = (connected, connecting) => {
  if (connected) {
    return 'Connected'
  }

  return connecting ? 'Connecting' : 'Connect'
}

class SettingsConnections extends PureComponent {
  componentDidMount () {
    this.props.generateTelegramDeepLink()
  }

  render () {
    const {
      address,
      connectTelegram,
      isTelegramConnecting,
      connectNewWallet,
      removeConnectedWallet,
      telegramDeepLink,
      isConnectWalletPending,
      hasTelegramConnected
    } = this.props

    return (
      <Settings id='connections' header='Connections'>
        <Settings.Row>
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
            onClick={address ? removeConnectedWallet : connectNewWallet}
          >
            {getMetamaskBtnText(address, isConnectWalletPending)}
          </Button>
        </Settings.Row>

        <Settings.Row>
          <div className={styles.setting__left}>
            <Label>Telegram</Label>
            <Label className={styles.setting__description} accent='waterloo'>
              You will get the ability to connect the bot and log in through
              Telegram.
              <br />
              Please do not use Telegram Web as it might not be able to link
              account correctly.
            </Label>
          </div>
          <Button
            variant='fill'
            accent='positive'
            as='a'
            href={telegramDeepLink}
            rel='noopener noreferrer'
            target='_blank'
            onClick={connectTelegram}
          >
            {getTelegramBtnText(hasTelegramConnected, isTelegramConnecting)}
          </Button>
        </Settings.Row>
      </Settings>
    )
  }
}

const mapStateToProps = ({
  user: {
    data: {
      email,
      ethAccounts = [],
      settings: {
        telegramDeepLink,
        isTelegramConnecting,
        hasTelegramConnected
      } = {}
    }
  },
  accountUi: { isConnectWalletPending, isConnectWalletFailed }
}) => ({
  hasEmail: !!email,
  address: ethAccounts.length > 0 && ethAccounts[0].address,
  telegramDeepLink,
  isTelegramConnecting,
  hasTelegramConnected,
  isConnectWalletPending,
  isConnectWalletFailed
})

const mapDispatchToProps = dispatch => ({
  removeConnectedWallet: () =>
    dispatch({ type: actions.SETTINGS_REMOVE_CONNECTED_WALLET }),
  connectNewWallet: () =>
    dispatch({ type: actions.SETTINGS_CONNECT_NEW_WALLET }),
  generateTelegramDeepLink: () =>
    dispatch({ type: actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsConnections)
