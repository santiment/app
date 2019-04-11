import React from 'react'
import { connect } from 'react-redux'
import { Tabs, Toggle, Label, Button, Selector } from '@santiment-network/ui'
import Settings from './Settings'
import * as actions from '../../actions/types'
import styles from './AccountPage.module.scss'

const SettingsConnections = ({
  address,
  connectNewWallet,
  removeConnectedWallet,
  telegramDeepLink,
  isConnectWalletPending
}) => (
  <Settings id='connections' header='Connections'>
    <Settings.Row>
      <div className={styles.setting__left}>
        <Label>Metamask</Label>
        <Label className={styles.setting__description} accent='waterloo'>
          You will get the ability to deposit tokens to your Sanbase account.
          <br />
          Please follow futher instructions.
        </Label>
      </div>
      <Button
        variant='fill'
        accent='positive'
        onClick={address ? removeConnectedWallet : connectNewWallet}
      >
        {address
          ? 'Disconnect'
          : isConnectWalletPending
            ? 'Connecting'
            : 'Connect'}
      </Button>
    </Settings.Row>

    <Settings.Row>
      <div className={styles.setting__left}>
        <Label>Telegram</Label>
        <Label className={styles.setting__description} accent='waterloo'>
          You will get the ability to connect the bot and log in through
          Telegram.
          <br />
          Please do not use Telegram Web as it might not be able to link account
          correctly.
        </Label>
      </div>
      <Button
        variant='fill'
        accent='positive'
        as='a'
        href={telegramDeepLink}
        rel='noopener noreferrer'
        target='_blank'
      >
        Connect
      </Button>
    </Settings.Row>
  </Settings>
)

const mapStateToProps = ({
  user: {
    data: {
      email,
      ethAccounts,
      settings: {
        telegramDeepLink,
        isTelegramConnecting,
        hasTelegramConnected,
        signalNotifyEmail,
        signalNotifyTelegram
      }
    }
  },
  accountUi: { isConnectWalletPending, isConnectWalletFailed }
}) => ({
  hasEmail: !!email,
  address: ethAccounts.length > 0 && ethAccounts[0].address,
  telegramDeepLink,
  isTelegramConnecting,
  hasTelegramConnected,
  signalNotifyEmail,
  signalNotifyTelegram,
  isConnectWalletPending,
  isConnectWalletFailed
})

const mapDispatchToProps = dispatch => ({
  removeConnectedWallet: () =>
    dispatch({ type: actions.SETTINGS_REMOVE_CONNECTED_WALLET }),
  connectNewWallet: () =>
    dispatch({ type: actions.SETTINGS_CONNECT_NEW_WALLET }),
  generateTelegramDeepLink: () =>
    dispatch({ type: actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK }),
  revokeTelegramDeepLink: () =>
    dispatch({ type: actions.SETTINGS_REVOKE_TELEGRAM_DEEP_LINK }),
  connectTelegram: () => dispatch({ type: actions.SETTINGS_CONNECT_TELEGRAM })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsConnections)
