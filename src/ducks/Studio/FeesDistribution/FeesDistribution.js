import React, { useMemo, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { millify } from '../../../utils/formatting'
import ProjectsBarChart from '../../Stablecoins/ProjectsBarChart/ProjectsBarChart'
import { formIntervalSettings } from '../../SANCharts/IntervalSelector'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import MakeProSubscriptionCard from '../../../pages/feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard'
import PageLoader from '../../../components/Loader/PageLoader'
import styles from './FeesDistribution.module.scss'

const FEES_DISTRIBUTION = gql`
  query ethFeesDistribution($from: DateTime!, $to: DateTime!) {
    ethFeesDistribution(from: $from, to: $to, limit: 10) {
      asset
      fees
    }
  }
`

const useFeeDistributions = ({ from, to }) => {
  const { data, loading, error } = useQuery(FEES_DISTRIBUTION, {
    variables: {
      from,
      to
    }
  })

  return {
    data: data ? data.ethFeesDistribution : [],
    loading,
    error
  }
}

const FeesDistribution = () => {
  const { isPro } = useUserSubscriptionStatus()

  return (
    <div className={styles.container}>
      <div className={styles.title}>Fees Distribution</div>

      {isPro ? <FeeChart /> : <MakeProSubscriptionCard />}
    </div>
  )
}

const FeeChart = () => {
  const [settings] = useState(formIntervalSettings('7d'))

  const { data, loading } = useFeeDistributions(settings)

  const prepared = useMemo(
    () => {
      return data.map(item => {
        return {
          slug: item.asset,
          value: item.fees
        }
      })
    },
    [data]
  )

  if (loading) {
    return <PageLoader />
  }

  return (
    <ProjectsBarChart
      data={prepared}
      settings={{
        yTickFormatter: val => `${millify(val)}`
      }}
    />
  )
}

export default FeesDistribution
