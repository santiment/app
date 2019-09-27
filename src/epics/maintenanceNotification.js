import React from 'react'
import { Observable } from 'rxjs'
import * as actions from '../actions/types'
import { showNotification } from '../actions/rootActions'

const style = {
  marginLeft: 5,
  textDecoration: 'underline',
  color: 'var(--white)'
}

const ACTION = 'MAINTENANCE_NOTIFICATION_SHOWN'

const wasClosed = () => window.localStorage.getItem(ACTION)
const setClosed = () => window.localStorage.setItem(ACTION, '+')

export const maintenanceNotification = (action$, store, { client }) =>
  action$.ofType(actions.APP_LAUNCHED).mergeMap(() =>
    wasClosed()
      ? Observable.empty()
      : Observable.of(
        showNotification({
          variant: 'error',
          title: `Scheduled 8-hour maintenance on September 28th`,
          onClose: setClosed,
          description: (
              <>
                More details{' '}
                <a
                  style={style}
                  rel='noopener noreferrer'
                  target='_blank'
                  href='https://santiment.net/blog/santiment-maintenance-sep-28/'
                >
                  here
                </a>
              </>
          ),
          solidFill: true
        })
      )
  )
