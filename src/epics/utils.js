import React from 'react'
import Raven from 'raven-js'
import { Observable } from 'rxjs'
import { showNotification } from '../actions/rootActions'
import { Link } from 'react-router-dom'

export const handleErrorAndTriggerAction = action => error => {
  Raven.captureException(error)

  return Observable.merge(
    Observable.of({ type: action, payload: error }),
    Observable.of(
      showNotification({
        variant: 'error',
        title: `Error`,
        description: (
          <div>
            <div>{error.message}</div>
            {error.message.indexOf('subscription') !== -1 && (
              <Link to='/account'>Upgrade plan</Link>
            )}
          </div>
        ),
        dismissAfter: 3000
      })
    )
  )
}
