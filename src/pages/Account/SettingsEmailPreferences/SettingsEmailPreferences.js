import React from 'react'
import cx from 'classnames'
import Settings from '../Settings'
import EmailPreference from './EmailPreference/EmailPreference'
import { useUpdateUserSettings, useUserSettings } from '../../../stores/user/settings'
import { EMAIL_PREFERENCES } from './constants'
import styles from './SettingsEmailPreferences.module.scss'

const SettingsEmailPreferences = () => {
  const { settings } = useUserSettings()
  const [updateUserSettings] = useUpdateUserSettings()

  function handleUnsubscribeAll() {
    updateUserSettings({
      isSubscribedBiweeklyReport: false,
      isSubscribedCommentsEmails: false,
      isSubscribedEduEmails: false,
      isSubscribedLikesEmails: false,
      isSubscribedMarketingEmails: false,
      isSubscribedMonthlyNewsletter: false,
    })
  }

  return (
    <Settings id='email-preferences' header='Email Preferences'>
      {EMAIL_PREFERENCES.map((preference) => (
        <Settings.Row key={preference.title}>
          <EmailPreference {...preference} settings={settings} />
        </Settings.Row>
      ))}
      <Settings.Row>
        <div className='column'>
          <button className={cx(styles.btn, 'btn')} onClick={handleUnsubscribeAll}>
            Unsubscribe from all of the above
          </button>
          <div className='c-waterloo'>
            You will still receive important administrative emails, such as login information
          </div>
        </div>
      </Settings.Row>
    </Settings>
  )
}

export default SettingsEmailPreferences
