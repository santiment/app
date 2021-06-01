import React, { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Button from '@santiment-network/ui/Button'
import gql from 'graphql-tag'
import Settings from './Settings'
import Mobile from './devices/Mobile'
import Tablet from './devices/Tablet'
import Desktop from './devices/Desktop'
import { sortBy } from '../../utils/sortMethods'
import { addDays, getDateFormats, getTimeFormats } from '../../utils/dates'
import styles from './SettingsSessions.module.scss'

const SESSIONS_QUERY = gql`
  query {
    getAuthSessions {
      client
      createdAt
      expiresAt
      isCurrent
      jti
      lastActiveAt
      platform
      type
    }
  }
`

const ARRAY = []
export const TODAY = new Date().toLocaleDateString()
export const YESTERDAY = addDays(new Date(), -1).toLocaleDateString()

const sortSessions = sessions => sessions.sort(sortBy('lastActiveAt'))

const getPlatformIcon = platform => {
  if (platform.match(/Tablet|iPad/i)) return <Tablet />
  if (
    platform.match(
      /Mobile|Windows Phone|Lumia|Android|webOS|iPhone|iPod|Blackberry|PlayBook|BB10|Opera Mini|\bCrMo\/|Opera Mobi/i
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
  const { data, loading } = useQuery(SESSIONS_QUERY)

  return useMemo(
    () => [
      data && data.getAuthSessions ? sortSessions(data.getAuthSessions) : ARRAY,
      loading
    ],
    [data]
  )
}

const SettingsSessions = () => {
  const [sessions] = useUserSessions()
  return (
    <Settings id='sessions' header='Current authorized sessions'>
      {sessions.map(({ client, platform, isCurrent, lastActiveAt }) => (
        <Settings.Row className={styles.wrapper}>
          <div className={styles.image}>{getPlatformIcon(platform)}</div>
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
          {/* <Button accent='negative' className={styles.revoke}>Revoke</Button> */}
        </Settings.Row>
      ))}
    </Settings>
  )
}

export default SettingsSessions
