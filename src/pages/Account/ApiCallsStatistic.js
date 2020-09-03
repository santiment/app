import React, { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Settings from './Settings'
import { startOfMonth } from '../../utils/dates'
import styles from './ApiCallsStatistic.module.scss'

export const API_CALLS_QUERY = gql`
  query currentUser($from: DateTime!, $to: DateTime!) {
    currentUser {
      id
      apikeys
      apiCallsHistory(from: $from, to: $to, interval: "1d") {
        datetime
        apiCallsCount
      }
    }
  }
`

const useApiCalls = ({ from, to }) => {
  const { data, loading, error } = useQuery(API_CALLS_QUERY, {
    variables: { from, to }
  })
  return { data: data ? data.currentUser : {}, loading, error }
}

const NOW = new Date()
const MONTH_START = startOfMonth(NOW)

const ApiCallsStatistic = () => {
  const {
    data: { apikeys = [], apiCallsHistory = [] },
    loading
  } = useApiCalls({
    from: MONTH_START,
    to: NOW
  })

  const count = useMemo(
    () => {
      return apiCallsHistory.reduce((acc, item) => item.apiCallsCount + acc, 0)
    },
    [apiCallsHistory]
  )

  if (loading || apikeys.length === 0) {
    return null
  }

  return (
    <Settings.Row>
      <div className={styles.panel}>
        <div className={styles.title}>API Usage</div>
        <div className={styles.info}>
          Count of API calls this month:{' '}
          <span className={styles.count}>{count}</span>
        </div>
      </div>
    </Settings.Row>
  )
}

export default ApiCallsStatistic
