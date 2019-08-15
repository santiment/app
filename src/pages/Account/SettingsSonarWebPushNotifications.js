import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Toggle from '@santiment-network/ui/Toggle'
import {
  registerSonarActivitiesSw,
  requestNotificationPermission
} from '../../serviceWorker'
import SidecarExplanationTooltip from '../../ducks/SANCharts/SidecarExplanationTooltip'
import { getAPIUrl, getOrigin } from '../../utils/utils'
import styles from './AccountPage.module.scss'

export const getSanSonarSW = registrations => {
  return registrations
    ? registrations
      .filter(({ active }) => !!active)
      .find(
        ({ active: { scriptURL, state } = {} } = {}) =>
          scriptURL.endsWith('san-sonar-service-worker.js') &&
            state === 'activated'
      )
    : undefined
}

const SettingsSonarWebPushNotifications = ({ classes = {} }) => {
  const [isActive, setIsActive] = useState(false)

  const toggle = value => {
    setIsActive(value)
  }

  useEffect(() => {
    if (navigator.serviceWorker && navigator.serviceWorker.getRegistrations) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        const sanServiceRegistration = getSanSonarSW(registrations)
        if (sanServiceRegistration) {
          toggle(true)
        } else {
          toggle(false)
        }
      })
    }
  })

  const postMessage = data => {
    navigator &&
      navigator.serviceWorker &&
      navigator.serviceWorker.controller &&
      navigator.serviceWorker.controller.postMessage(data)
  }

  const unRegisterSw = () => {
    postMessage({
      type: 'SONAR_FEED_ACTIVITY_STOP'
    })

    setTimeout(() => {
      navigator.serviceWorker &&
        navigator.serviceWorker.getRegistrations &&
        navigator.serviceWorker.getRegistrations().then(registrations => {
          const sw = getSanSonarSW(registrations)
          if (sw) {
            sw.unregister().then(data => {
              toggle(false)
            })
          } else {
            toggle(false)
          }
        }, 1000)
    })
  }

  const preToggle = enable => {
    if (!enable) {
      unRegisterSw()
    } else {
      navigator.serviceWorker &&
        navigator.serviceWorker.getRegistrations &&
        navigator.serviceWorker.getRegistrations().then(registrations => {
          const sw = getSanSonarSW(registrations)

          if (!sw) {
            registerSonarActivitiesSw({
              hideRegistrationChecking: true,
              callback: () => {
                postMessage({
                  type: 'SONAR_FEED_PARAMS_START',
                  data: {
                    PUBLIC_API_ROUTE: getAPIUrl(),
                    PUBLIC_FRONTEND_ROUTE: getOrigin()
                  }
                })
                requestNotificationPermission(unRegisterSw)
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
        <SidecarExplanationTooltip
          closeTimeout={500}
          localStorageSuffix='_TRIGGER_PUSH_NOTIFICATION_EXPLANATION'
          position='top'
          title='Sonar Web Pushes'
          description='Get fast notifications through Push Notifications'
        >
          <>
            <Toggle isActive={isActive} onClick={() => preToggle(!isActive)} />
          </>
        </SidecarExplanationTooltip>
      </div>
    </div>
  )
}

export default SettingsSonarWebPushNotifications
