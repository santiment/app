import React, { useMemo, useState } from 'react'
import * as Sentry from '@sentry/react'
import { store } from '../../redux'
import { Link } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/react-hooks'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import gql from 'graphql-tag'
import Settings from './Settings'
import Mobile from './devices/Mobile'
import Tablet from './devices/Tablet'
import Desktop from './devices/Desktop'
import { sortBy } from '../../utils/sortMethods'
import Skeleton from '../../components/Skeleton/Skeleton'
import { showNotification } from '../../actions/rootActions'
import { addDays, getDateFormats, getTimeFormats } from '../../utils/dates'
import styles from './SettingsSessions.module.scss'

const SESSIONS_QUERY = gql`
  query {
    getAuthSessions {
      client
      createdAt
      expiresAt
      hasExpired
      isCurrent
      jti
      lastActiveAt
      platform
      type
    }
  }
`

const DESTROY_SESSION_QUERY = gql`
  mutation destroySession($refreshTokenJti: String!) {
    destroySession(refreshTokenJti: $refreshTokenJti)
  }
`

const DESTROY_CURRENT_SESSION_QUERY = gql`
  mutation {
    destroyCurrentSession
  }
`

const ARRAY = []
export const TODAY = new Date().toLocaleDateString()
export const YESTERDAY = addDays(new Date(), -1).toLocaleDateString()

const normalizedSessions = sessions =>
  sessions
    .sort(sortBy('lastActiveAt'))
    .filter(({ hasExpired }) => !hasExpired)
    .slice(0, 5)

const getPlatformIcon = platform => {
  if (platform.match(/Tablet|iPad/i)) return <Tablet />
  if (
    platform.match(
      /Mobile|Windows Phone|Lumia|Android|webOS|iPhone|iPod|iOS|Blackberry|PlayBook|BB10|Opera Mini|\bCrMo\/|Opera Mobi/i
    )
  ) {
    return <Mobile />
  } else return <Desktop />
}

const formatDate = date => {
  const dateFormat = new Date(date)
  const { HH, mm } = getTimeFormats(dateFormat)
  const timeString = `at ${HH}:${mm}`

  switch (dateFormat.toLocaleDateString()) {
    case TODAY: {
      return `today ${timeString}`
    }
    case YESTERDAY: {
      return `yesterday ${timeString}`
    }
    default: {
      const { D, MMMM, YYYY } = getDateFormats(dateFormat)
      return `${D} ${MMMM} ${YYYY} ${timeString}`
    }
  }
}

export function useUserSessions () {
  const { data, loading, refetch } = useQuery(SESSIONS_QUERY)

  return useMemo(
    () => [
      data && data.getAuthSessions
        ? normalizedSessions(data.getAuthSessions)
        : ARRAY,
      loading,
      refetch
    ],
    [data]
  )
}

const UNAUTHORIZED_MSG = 'Unauthorized'

export function useRemoveSession (jti, isCurrent, refreshWidget) {
  const [mutate, data] = useMutation(
    isCurrent ? DESTROY_CURRENT_SESSION_QUERY : DESTROY_SESSION_QUERY
  )

  function onRemove () {
    return mutate({ variables: { refreshTokenJti: jti } })
      .then(() => {
        store.dispatch(
          showNotification('Session has been revoked successfully')
        )
        setTimeout(() => isCurrent && window.location.reload(true), 500)
        refreshWidget(jti)
      })
      .catch(err => {
        if (err.message.includes('Unauthorized')) {
          return UNAUTHORIZED_MSG
        } else {
          Sentry.captureException(err)
        }
      })
  }

  return { onRemove, data }
}

const Session = ({
  client,
  platform,
  isCurrent,
  jti,
  refreshWidget,
  lastActiveAt
}) => {
  const {
    onRemove,
    data: { loading }
  } = useRemoveSession(jti, isCurrent, refreshWidget)
  const [error, setError] = useState(false)

  function onClick () {
    onRemove().then(msg => {
      if (msg === UNAUTHORIZED_MSG) {
        setError(true)
      }
    })
  }

  return (
    <>
      <Dialog
        title='Action required'
        size='s'
        open={error}
        onClose={() => setError(false)}
      >
        <Dialog.ScrollContent withPadding>
          The authentification must have been done less than 10 minutes ago.
          Please, relogin to revoke a session.
        </Dialog.ScrollContent>

        <Dialog.Actions>
          <Dialog.Approve accent='negative' as={Link} to='/logout'>
            Log out
          </Dialog.Approve>
          <Dialog.Cancel
            className={styles.closeDialog}
            onClick={() => setError(false)}
          >
            Cancel
          </Dialog.Cancel>
        </Dialog.Actions>
      </Dialog>
      <Settings.Row className={styles.wrapper}>
        {getPlatformIcon(platform)}
        <div className={styles.info}>
          <span className={styles.platform}>
            {platform}, {client}
          </span>
          <span className={styles.time}>
            {isCurrent
              ? 'Current session'
              : `Last active ${formatDate(lastActiveAt)}`}
          </span>
        </div>
        <Button
          accent='negative'
          isLoading={loading}
          className={styles.revoke}
          onClick={onClick}
        >
          Revoke
        </Button>
      </Settings.Row>
    </>
  )
}

const SettingsSessions = () => {
  const [sessions, loading, refetch] = useUserSessions()

  return sessions.length > 0 && !loading ? (
    <Settings id='sessions' header='Current authorized sessions'>
      <Skeleton
        className={styles.loader}
        show={loading && sessions.length === 0}
        repeat={1}
      />
      {sessions.map((session, idx) => (
        <Session {...session} key={idx} refreshWidget={refetch} />
      ))}
    </Settings>
  ) : null
}

export default SettingsSessions
