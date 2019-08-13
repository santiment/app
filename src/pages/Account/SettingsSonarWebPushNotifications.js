import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Toggle from '@santiment-network/ui/Toggle'
import styles from './AccountPage.module.scss'
import {
  registerSonarActivitiesSw,
  requestNotificationPermission
} from '../../serviceWorker'
import { Loader } from 'semantic-ui-react'

export const getSanSonarSW = registrations =>
  registrations.find(
    ({ active: { scriptURL, state } } = {}) =>
      scriptURL.endsWith('san-sonar-service-worker.js') && state === 'activated'
  )

const SettingsSonarWebPushNotifications = ({ classes = {} }) => {
  const [isActive, setIsActive] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const toggle = value => {
    console.log('set ', value)
    setIsActive(value)
    setIsLoading(false)
  }

  useEffect(() => {
    navigator.serviceWorker &&
      navigator.serviceWorker.getRegistrations &&
      navigator.serviceWorker.getRegistrations().then(registrations => {
        const sanServiceRegistration = getSanSonarSW(registrations)
        if (sanServiceRegistration) {
          toggle(true)
        } else {
          toggle(false)
        }
      })
  })

  const preToggle = enable => {
    setIsLoading(true)

    if (!enable) {
      navigator.serviceWorker &&
        navigator.serviceWorker.getRegistrations &&
        navigator.serviceWorker.getRegistrations().then(registrations => {
          const sw = getSanSonarSW(registrations)
          console.log('unregister registration', sw)
          if (sw) {
            sw.unregister().then(() => {
              console.log('unregisterED registration', sw)
              toggle(false)
            })
          } else {
            toggle(false)
          }
        })
    } else {
      navigator.serviceWorker &&
        navigator.serviceWorker.getRegistrations &&
        navigator.serviceWorker.getRegistrations().then(registrations => {
          const sw = getSanSonarSW(registrations)

          console.log('register registration', sw)
          if (!sw) {
            registerSonarActivitiesSw({
              hideRegistrationChecking: true,
              callback: () => {
                requestNotificationPermission()
                toggle(true)
              }
            })
          } else {
            toggle(true)
          }
        })
    }
  }

  return (
    <div className={cx(classes.container, styles.settingBlock)}>
      <Label className={classes.left}>Sonar Web Push notifications</Label>
      <div className={cx(styles.setting__right_notifications, classes.right)}>
        {!isLoading && (
          <Toggle isActive={isActive} onClick={() => preToggle(!isActive)} />
        )}
        {isLoading && <Loader />}
      </div>
    </div>
  )
}

export default SettingsSonarWebPushNotifications
