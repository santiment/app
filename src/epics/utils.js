import React from 'react'
import Raven from 'raven-js'
import { Observable } from 'rxjs'
import { showNotification } from '../actions/rootActions'
import { Link } from 'react-router-dom'

export const handleErrorAndTriggerAction = action => error => {
  Raven.captureException(error)

  const isSubscriptionError = error.message.indexOf('subscription') !== -1

  if (isSubscriptionError) {
    return Observable.merge(
      Observable.of({ type: action, payload: error }),
      Observable.of(
        showNotification({
          variant: 'error',
          title: `Error`,
          description: (
            <div>
              <div>
                You have reached the maximum number of allowed signals for your
                current subscription plan. Please upgrade to PRO subscription
                plan for unlimited signals
              </div>
              <Link to='/account'>Upgrade plan</Link>
            </div>
          ),
          dismissAfter: 3000
        })
      )
    )
  } else {
    return Observable.of({ type: action, payload: error })
  }
}
