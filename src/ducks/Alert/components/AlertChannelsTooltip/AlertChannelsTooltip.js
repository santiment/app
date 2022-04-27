import React, { useCallback, useEffect, useState } from 'react'
import Icon from '@santiment-network/ui/Icon'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import AlertTooltip from '../../../../components/AlertTooltip/AlertTooltip'
import { useUserSettings } from '../../../../stores/user/settings'
import { getSanSonarSW } from '../../../../pages/Account/SettingsSonarWebPushNotifications'
import { capitalizeStr } from '../../../../utils/utils'
import styles from './AlertChannelsTooltip.module.scss'

const AlertChannelsTooltip = ({ signal }) => {
  const [isPushEnabled, setIsPushEnabled] = useState(false)
  const {
    settings: { alertNotifyTelegram: isTelegramConnected, alertNotifyEmail: isEmailConnected },
  } = useUserSettings()
  const {
    settings: { channel },
  } = signal

  const checkPushAvailability = useCallback(() => {
    navigator.serviceWorker &&
      navigator.serviceWorker.getRegistrations &&
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => setIsPushEnabled(!!getSanSonarSW(registrations)))
  }, [setIsPushEnabled])

  useEffect(() => {
    checkPushAvailability()
  }, [])

  const hasUncheckedChannels =
    (!isPushEnabled && channel.includes('push')) ||
    (!isEmailConnected && channel.includes('email')) ||
    (!isTelegramConnected && channel.includes('telegram'))

  const channelItems = Array.isArray(channel) ? channel : []
  const channelTitles = channelItems.map((item) => {
    if (typeof item === 'string') {
      return capitalizeStr(item)
    }

    if ('telegram_channel' in item) {
      return 'Telegram Channel'
    }

    if ('webhook' in item) {
      return 'Webhook'
    }

    return item
  })

  if (!hasUncheckedChannels) {
    return (
      <div className={cx('row hv-center mrg--l mrg-l', styles.wrapper)}>
        <Icon type='bell' className={cx('btn', styles.btn)} />
        <div className={cx('line-clamp body-3 c-waterloo mrg--l mrg-s', styles.text)}>
          {channelTitles.join(', ')}
        </div>
      </div>
    )
  }

  return (
    <div className='row hv-center mrg--l mrg-l'>
      <AlertTooltip
        isVisible
        type='error'
        content={
          <span>
            <span className='txt-m'>Your notifications are disabled!</span> This means you will not
            receive information when this signal is triggered. To enable notifications, update your{' '}
            <Link
              to='/account#notifications'
              className={cx(styles.link, styles.tooltipLink, 'txt-m')}
            >
              Account Settings!
            </Link>
          </span>
        }
      />
    </div>
  )
}

export default AlertChannelsTooltip
