import React, { useState } from 'react'
import qs from 'query-string'
import Button from '@santiment-network/ui/Button'
import PageLoader from '../../components/Loader/PageLoader'
import Email from '../../components/Illustrations/Email'
import Success from '../../components/Illustrations/Success'
import { useUser } from '../../stores/user'
import {
  useUpdateUserSettings,
  useUserSettings
} from '../../stores/user/settings'
import styles from './Unsubscribe.module.scss'

const Unsubscribe = () => {
  const [startUpdate, setStartUpdate] = useState(false)
  const { md_email: email, target } = qs.parse(window.location.search)
  const { user = {}, isLoggedIn, loading } = useUser()
  const {
    loading: settingsLoading,
    email: emailFromSettings,
    settings: { signalNotifyEmail }
  } = useUserSettings()

  const [updateUserSettings] = useUpdateUserSettings()

  const isLoading = loading || settingsLoading

  if (
    !isLoading &&
    isLoggedIn &&
    user.email &&
    signalNotifyEmail &&
    target === 'signals' &&
    !startUpdate
  ) {
    setStartUpdate(true)
    setTimeout(() => updateUserSettings({ signalNotifyEmail: false }), 1000)
  }

  if (target === 'signals' && isLoading) {
    return <PageLoader className={styles.loader} />
  }

  return target === 'signals' && (!user || !user.email || !isLoggedIn) ? (
    <div className={styles.wrapper}>
      <Email />
      <h3 className={styles.heading}>Signal email notifications</h3>
      <p className={styles.desc}>
        Please, log in into account with your email and disable signal email
        notifications in settings
      </p>
      <Button
        variant='fill'
        accent='positive'
        className={styles.btn}
        as={'a'}
        rel='noopener noreferrer'
        href={'/login'}
      >
        Log in
      </Button>
    </div>
  ) : (
    <div className={styles.wrapper}>
      <Success />
      <h3 className={styles.heading}>You've been unsubscribed</h3>
      {target === 'signals' ? (
        <>
          <p className={styles.desc}>
            You succesfully disabled signal email notifications for{' '}
            <b>{user.email}</b>. If you want to change it, you can manage email
            notifications in your user settings.
          </p>
          <Button
            variant='fill'
            accent='positive'
            className={styles.btn}
            as={'a'}
            rel='noopener noreferrer'
            href={'/account#notifications'}
          >
            Go to account
          </Button>
        </>
      ) : (
        <p className={styles.desc}>
          Your email address<b>{email ? ` ${email} ` : ' '}</b> has been removed
          from our mailing list. We are sorry to see you go, but we won't be
          sending any more email to your address.
        </p>
      )}
    </div>
  )
}

export default Unsubscribe
