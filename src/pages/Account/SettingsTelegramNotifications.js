import React from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Toggle from '@santiment-network/ui/Toggle'
import AlertTooltip from '../../components/AlertTooltip/AlertTooltip'
import { useUpdateUserNotifications, useUserSettings } from '../../stores/user/settings'
import styles from './AccountPage.module.scss'

const SettingsTelegramNotifications = ({ classes = {}, description, count }) => {
  const {
    settings: { alertNotifyTelegram, hasTelegramConnected },
  } = useUserSettings()

  const [update] = useUpdateUserNotifications()

  return (
    <div className={cx(classes.container, styles.settingBlock)}>
      <Label className={cx(classes.left, 'row v-center', styles.label)}>
        <span className='mrg--r mrg-xs'>Telegram notifications</span>
        {count > 0 && (
          <AlertTooltip
            isVisible={!alertNotifyTelegram}
            content={
              <span>
                <span className='txt-m'>Telegram notifications are disabled!</span>{' '}
                <span className={styles.contentText}>
                  This means you will not receive Telegram notifications when this alert is
                  triggered.
                </span>
              </span>
            }
            tooltipClassname={styles.tooltipWidth}
          />
        )}
      </Label>

      <div className={cx(styles.setting__right, classes.right)}>
        {description}
        {hasTelegramConnected ? (
          <Toggle
            isActive={alertNotifyTelegram}
            onClick={() =>
              update({
                alertNotifyTelegram: !alertNotifyTelegram,
              })
            }
          />
        ) : (
          'Please connect to telegram bot to enable notifications'
        )}
      </div>
    </div>
  )
}

export default SettingsTelegramNotifications
