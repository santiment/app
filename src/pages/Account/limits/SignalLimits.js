import React, { useCallback } from 'react'
import Input from '@santiment-network/ui/Input'
import {
  updateUserSettingsCache,
  useUpdateUserSettings
} from '../../../stores/user/settings'
import externalStyles from './../AccountPage.module.scss'
import styles from './SignalLimits.module.scss'

const VALIDATION_PROPS = {
  min: 0,
  type: 'number'
}

const SignalLimits = ({ alertsPerDayLimit }) => {
  const { email = 0, telegram = 0 } = alertsPerDayLimit
  const [updateUserSettings] = useUpdateUserSettings()

  const onChange = useCallback(
    (key, value) => {
      if (value) {
        const updates = {
          alertsPerDayLimit: { ...alertsPerDayLimit, [key]: value }
        }

        updateUserSettings(updates)
        updateUserSettingsCache(updates)
      }
    },
    [alertsPerDayLimit]
  )

  return (
    <div className={styles.limits}>
      <div className={styles.title}>Daily limits:</div>

      <div className={styles.limitBlock}>
        <div className={externalStyles.setting__left}>Email notifications</div>
        <div className={externalStyles.setting__right}>
          <Input
            value={email}
            {...VALIDATION_PROPS}
            className={styles.input}
            onChange={({ target: { value } }) => onChange('email', value)}
          />
        </div>
      </div>

      <div className={styles.limitBlock}>
        <div className={externalStyles.setting__left}>
          Telegram notifications
        </div>
        <div className={externalStyles.setting__right}>
          <Input
            value={telegram}
            {...VALIDATION_PROPS}
            className={styles.input}
            onChange={({ target: { value } }) => onChange('telegram', value)}
          />
        </div>
      </div>
    </div>
  )
}

export default SignalLimits
