import React from 'react'
import * as Sentry from '@sentry/react'
import { Observable } from 'rxjs'
import { showNotification } from '../actions/rootActions'
import { Link } from 'react-router-dom'
import styles from './epic-items.module.scss'

export const handleErrorAndTriggerAction = action => (error, data) => {
  Sentry.captureException(error)

  const isSubscriptionError = error.message.indexOf('subscription') !== -1

  if (isSubscriptionError) {
    return Observable.merge(
      Observable.of({ type: action, payload: error, data }),
      Observable.of(
        showNotification({
          variant: 'info',
          title: "You've reached your alerts limit (10)",
          description: (
            <div>
              <div className={styles.description}>
                Please upgrade your account for unlimited alerts
              </div>
              <Link className={styles.link} to='/account#subscription'>
                Upgrade plan
              </Link>
            </div>
          ),
          dismissAfter: 8000
        })
      )
    )
  } else {
    return Observable.of({ type: action, payload: error, data })
  }
}
