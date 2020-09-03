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

const SERVICE_WORKER_NAME = 'san-sonar-service-worker.js'

export const getSanSonarSW = registrations => {
  return registrations
    ? registrations
      .filter(({ active }) => !!active)
      .find((props = {}) => {
        const { waiting } = props

        if (waiting) {
          const { scriptURL } = waiting
          if (scriptURL.endsWith(SERVICE_WORKER_NAME)) {
            return true
          }
        }

        const { active: { scriptURL } = {} } = props

        return scriptURL.endsWith(SERVICE_WORKER_NAME)
      })
    : undefined
}

const postMessage = data => {
  if (
    navigator &&
    navigator.serviceWorker &&
    navigator.serviceWorker.controller
  ) {
    navigator.serviceWorker.controller.postMessage(data)
  } else {
    setTimeout(() => {
      postMessage(data)
    }, 1000)
  }
}

export const sendParams = () => {
  setTimeout(() => {
    postMessage(
      {
        type: 'SONAR_FEED_PARAMS_START',
        data: {
          PUBLIC_API_ROUTE: getAPIUrl(),
          PUBLIC_FRONTEND_ROUTE: getOrigin()
        }
      },
      1000
    )
  })
}

const SettingsSonarWebPushNotifications = ({
  classes = {},
  className,
  recheckBrowserNotifications,
  description
}) => {
  const [isActive, setIsActive] = useState(false)
  const [isPermissionsGranted, setPermissionsGranted] = useState(true)

  const toggle = value => {
    setIsActive(value)
    value &&
      requestNotificationPermission(() => {
        setPermissionsGranted(true)
      }, noPermissionsCallback)
  }

  const noPermissionsCallback = () => {
    unRegisterSw()
    setPermissionsGranted(false)
  }

  useEffect(
    () => {
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
    },
    [isActive]
  )

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
          recheckBrowserNotifications && recheckBrowserNotifications()
        })
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
                console.log('Registered sonar service worker')
                requestNotificationPermission(null, noPermissionsCallback)
                sendParams()
                recheckBrowserNotifications && recheckBrowserNotifications()
                toggle(true)
              }
            })
            toggle(true)
          } else {
            sendParams()
            toggle(true)
          }
        })
    }
  }

  return (
    <div className={cx(classes.container, styles.settingBlock, className)}>
      <div className={classes.left}>
        <div>Push notifications</div>
        {!isPermissionsGranted && (
          <Label
            className={cx(styles.description, styles.warning)}
            accent='waterloo'
          >
            Notification permissions denied in browser settings. Please, check
            your browser notification settings.
          </Label>
        )}
      </div>
      <div className={cx(styles.setting__right_notifications, classes.right)}>
        <SidecarExplanationTooltip
          closeTimeout={500}
          localStorageSuffix='_TRIGGER_PUSH_NOTIFICATION_EXPLANATION'
          align='end'
          title='Push Notifications'
          withArrow
          description='Get fast notifications through Push Notifications'
          className={styles.tooltip}
        >
          <div className={styles.toggleWrapper}>
            {description}
            <Toggle isActive={isActive} onClick={() => preToggle(!isActive)} />
          </div>
        </SidecarExplanationTooltip>
      </div>
    </div>
  )
}

export default SettingsSonarWebPushNotifications
