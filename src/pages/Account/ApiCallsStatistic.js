import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Settings from './Settings'
import { startOfMonth } from '../../utils/dates'
import Skeleton from '../../components/Skeleton/Skeleton'
import styles from './ApiCallsStatistic.module.scss'

export const API_KEYS_STATS = {
  ALL: 'ALL',
  APIKEY: 'APIKEY'
}

export const API_CALLS_QUERY = gql`
  query currentUser(
    $from: DateTime!
    $to: DateTime!
    $authMethod: ApiCallAuthMethod!
  ) {
    currentUser {
      id
      apiCallsCount(from: $from, to: $to, authMethod: $authMethod)
    }
  }
`

const useApiCalls = ({ from, to, type }) => {
  const { data, loading, error } = useQuery(API_CALLS_QUERY, {
    variables: { from, to, authMethod: type }
  })

  return { data: data ? data.currentUser : {}, loading, error }
}

const NOW = new Date()
const MONTH_START = startOfMonth(NOW)

const ApiCallsStatistic = ({ type }) => {
  const { data, loading } = useApiCalls({
    from: MONTH_START,
    to: NOW,
    type
  })

  const { apiCallsCount } = data

  return (
    <Settings.Row>
      <div className={styles.panel}>
        <Skeleton show={loading} repeat={1} className={styles.skeleton} />
        <div className={styles.title}>API Usage</div>
        <div className={styles.info}>
          Count of API calls this month:{' '}
          <span className={styles.count}>{apiCallsCount}</span>
        </div>
      </div>
    </Settings.Row>
  )
}

export default ApiCallsStatistic
