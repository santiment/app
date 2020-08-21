import React, { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { getIntervalByTimeRange } from '../../../utils/dates'
import ProjectsBarChart from '../ProjectsBarChart/ProjectsBarChart'
import PageLoader from '../../../components/Loader/PageLoader'
import styles from './TransactionsDominance.module.scss'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import MakeProSubscriptionCard from '../../../pages/feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard'

const DEFAULT_SETTINGS = {
  ...getIntervalByTimeRange('1d')
}

const TRANSACTION_DOMINANCE_QUERY = gql`
  query allProjectsByFunction($from: DateTime!, $to: DateTime!) {
    allProjectsByFunction(
      function: "{\\"args\\":{\\"filters\\":[{\\"args\\":{\\"market_segments\\": [\\"Stablecoin\\"]},\\"name\\":\\"market_segments\\"}]},\\"name\\":\\"selector\\"}"
    ) {
      stats {
        projectsCount
      }
      projects {
        slug
        trx_volume: aggregatedTimeseriesData(
          metric: "transaction_volume"
          from: $from
          to: $to
          aggregation: SUM
        )
      }
    }
  }
`

const useTransactionsDominance = ({ from, to }) => {
  const { data, loading, error } = useQuery(TRANSACTION_DOMINANCE_QUERY, {
    variables: {
      from,
      to
    }
  })

  return {
    data: data ? data.allProjectsByFunction.projects : [],
    loading,
    error
  }
}

export const sortByVolume = (a, b) => b.trx_volume - a.trx_volume

const TransactionsDominance = () => {
  const { data, loading } = useTransactionsDominance(DEFAULT_SETTINGS)

  const prepared = useMemo(
    () => {
      return data.filter(({ trx_volume }) => trx_volume > 0).sort(sortByVolume)
    },
    [data]
  )

  const { isPro } = useUserSubscriptionStatus()

  if (!isPro) {
    return <MakeProSubscriptionCard />
  }

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className={styles.container}>
      <ProjectsBarChart data={prepared} dataKey={'trx_volume'} />
    </div>
  )
}

export default TransactionsDominance
