import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Toggle from '@santiment-network/ui/Toggle'
import { useUpdateUserSettings } from '../../../../stores/user/settings'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import styles from './EmailPreference.module.scss'

const EmailPreference = ({ settings, title, description, isPro, settingsPropName, notProText }) => {
  const [updateUserSettings] = useUpdateUserSettings()
  const { isPro: isProStatus, isProPlus: isProPlusStatus } = useUserSubscriptionStatus()

  const emailPreferenceSetting = settings[settingsPropName]

  function handleUpdateEmailPreference() {
    updateUserSettings({
      [settingsPropName]: !emailPreferenceSetting,
    })
  }

  const isDisabled = !isProStatus && !isProPlusStatus && notProText

  return (
    <div className='row fluid v-center justify'>
      <div className={cx(styles.textWrapper, 'column')}>
        <div className='row v-center txt-m c-black'>
          {title}
          {isPro && (
            <div className={cx(styles.proBadge, 'mrg--l mrg-s caption txt-m c-white')}>PRO</div>
          )}
        </div>
        <div className='c-waterloo'>
          {description}
          {isDisabled && (
            <span>
              <Link to='/pricing' className={cx(styles.link, 'mrg--l mrg--r mrg-xs txt-m')}>
                Update your Plan
              </Link>
              {notProText}
            </span>
          )}
        </div>
      </div>
      <div className='row v-center'>
        {!isDisabled && <div className='mrg--r mrg-s'>{emailPreferenceSetting ? 'On' : 'Off'}</div>}
        <Toggle
          isActive={emailPreferenceSetting}
          onClick={handleUpdateEmailPreference}
          disabled={isDisabled}
        />
      </div>
    </div>
  )
}

export default EmailPreference
