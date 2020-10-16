import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import * as actions from '../../actions/types'
import Loader from '@santiment-network/ui/Loader/Loader'
import Button from '@santiment-network/ui/Button'
import Label from '@santiment-network/ui/Label'
import { useUserSettings } from '../../stores/user/settings'
import styles from './AccountPage.module.scss'

const getTelegramBtnText = (connected, connecting) => {
  if (connected) {
    return 'Reconnect'
  }

  return connecting ? 'Connecting' : 'Connect'
}

const ConnectTelegramBlock = ({
  generateTelegramDeepLink,
  connectTelegram,
  isTelegramConnecting,
  telegramDeepLink,
  classes = {}
}) => {
  const {
    settings: { hasTelegramConnected }
  } = useUserSettings()

  useEffect(
    () => {
      !telegramDeepLink && generateTelegramDeepLink()
    },
    [telegramDeepLink]
  )

  return (
    <div className={cx(styles.telegram, classes.container)}>
      <div className={cx(styles.setting__left, classes.left)}>
        <Label>Telegram</Label>
        <Label className={styles.setting__description} accent='waterloo'>
          You will get the ability to connect the bot and log in through
          Telegram.
          <br />
          Please do not use Telegram Web as it might not be able to link account
          correctly.
        </Label>
      </div>
      {isTelegramConnecting && (
        <Loader className={styles.connecting_telegram} />
      )}
      {telegramDeepLink && (
        <Button
          variant='fill'
          accent='positive'
          as='a'
          disabled={isTelegramConnecting}
          className={cx(styles.connect_telegram, classes.right)}
          href={telegramDeepLink}
          rel='noopener noreferrer'
          target='_blank'
          onClick={connectTelegram}
        >
          {getTelegramBtnText(hasTelegramConnected, isTelegramConnecting)}
        </Button>
      )}
    </div>
  )
}

const mapStateToProps = ({
  user: {
    data: { settings: { telegramDeepLink, isTelegramConnecting } = {} }
  }
}) => ({
  telegramDeepLink,
  isTelegramConnecting
})

const mapDispatchToProps = dispatch => ({
  generateTelegramDeepLink: () =>
    dispatch({ type: actions.SETTINGS_GENERATE_TELEGRAM_DEEP_LINK })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectTelegramBlock)
