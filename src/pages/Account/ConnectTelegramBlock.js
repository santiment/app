import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import * as actions from '../../actions/types'
import Loader from '@santiment-network/ui/Loader/Loader'
import Button from '@santiment-network/ui/Button'
import Label from '@santiment-network/ui/Label'
import { useUserSettings } from '../../stores/user/settings'
import styles from './AccountPage.module.scss'

const TgButton = ({
  connectTelegram,
  isTelegramConnecting,
  telegramDeepLink,
  classes,
  className,
  children,
  ...rest
}) => {
  return (
    <Button
      as='a'
      className={cx(styles.connect_telegram, classes.right, className)}
      href={telegramDeepLink}
      rel='noopener noreferrer'
      target='_blank'
      onClick={connectTelegram}
      {...rest}
    >
      {children}
    </Button>
  )
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
          Connect the notification bot to your Telegram account
        </Label>
      </div>
      {isTelegramConnecting && (
        <Loader className={styles.connecting_telegram} />
      )}
      {telegramDeepLink && (
        <div className={styles.actions}>
          <TgButton
            variant='fill'
            accent='positive'
            classes={classes}
            disabled={isTelegramConnecting || hasTelegramConnected}
            telegramDeepLink={telegramDeepLink}
            connectTelegram={connectTelegram}
          >
            {isTelegramConnecting
              ? 'Connecting'
              : hasTelegramConnected
                ? 'Connected'
                : 'Connect'}
          </TgButton>

          {hasTelegramConnected && (
            <div className={styles.reconnect}>
              Have another account?{' '}
              <TgButton
                accent='positive'
                classes={classes}
                disabled={isTelegramConnecting}
                telegramDeepLink={telegramDeepLink}
                connectTelegram={connectTelegram}
                className={styles.link}
              >
                Reconnect
              </TgButton>
            </div>
          )}
        </div>
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
