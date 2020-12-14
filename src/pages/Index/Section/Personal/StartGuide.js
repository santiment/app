import React, { useMemo } from 'react'
import gql from 'graphql-tag'
import cx from 'classnames'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import Icon from '@santiment-network/ui/Icon'
import { Row as BaseRow } from '../index'
import NewWatchlist from '../../../../ducks/Watchlists/Actions/New'
import styles from './index.module.scss'

const FETCH_POLICY = {
  fetchPolicy: 'cache-and-network'
}
export const USER_QUERY = gql`
  {
    currentUser {
      id
      email
      username
      settings {
        hasTelegramConnected
      }
      chartConfigurations {
        id
      }
      watchlists {
        id
      }
    }
  }
`

const DEFAULT_STATS = {
  loginHref: '/login'
}

function useUserStats () {
  const { data } = useQuery(USER_QUERY, FETCH_POLICY)

  return useMemo(
    () => {
      if (!data || !data.currentUser) return DEFAULT_STATS

      const {
        email,
        username,
        settings,
        watchlists,
        chartConfigurations
      } = data.currentUser

      return {
        personalInfo: !!(email && username),
        telegram: settings.hasTelegramConnected,
        watchlists: !!watchlists.length,
        charts: !!chartConfigurations.length
      }
    },
    [data]
  )
}

const Row = ({ title, href, isActive, onClick }) => (
  <BaseRow
    className={styles.row}
    to={href}
    As={href && Link}
    onClick={isActive ? undefined : onClick}
  >
    <div className={cx(styles.status, isActive && styles.status_active)}>
      {isActive && <Icon type='checkmark' className={styles.checkmark} />}
    </div>
    {title}
    <Icon type='arrow-right-big' className={styles.arrow} />
  </BaseRow>
)

const StartGuide = () => {
  const {
    personalInfo,
    telegram,
    watchlists,
    charts,
    loginHref
  } = useUserStats()

  return (
    <>
      <Row
        title='Fill out your profile with personal information'
        href='/account'
        isActive={personalInfo}
      />
      <Row title='Connect with Telegram' href='/account' isActive={telegram} />
      <Row
        title='Create your first Chart Layout'
        href={loginHref || '/studio'}
        isActive={charts}
      />
      <NewWatchlist
        type='watchlist'
        trigger={
          <Row
            title='Create your first Watchlist'
            href={loginHref}
            isActive={watchlists}
          />
        }
      />
    </>
  )
}

export default StartGuide
