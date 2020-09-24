import React, { useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { millify } from '../../../utils/formatting'
import { BlockHeader } from '../../../pages/StablecoinsPage/StablecoinsPageStructure'
import ProjectsBarChartWrapper from '../../Stablecoins/ProjectsBarChart/ProjectsBarChartWrapper'
import { formIntervalSettings } from '../../SANCharts/IntervalSelector'
import PageLoader from '../../../components/Loader/PageLoader'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import MakeProSubscriptionCard from '../../../pages/feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard'
import styles from './FeesDistribution.module.scss'

export const FEE_RANGES = [
  { value: '1h', label: '1h' },
  { value: '1d', label: '24h' },
  { value: '7d', label: '7d' },
  { value: '30d', label: '30d' }
]

const FEES_DISTRIBUTION = gql`
  query ethFeesDistribution($from: DateTime!, $to: DateTime!) {
    ethFeesDistribution(from: $from, to: $to) {
      slug
      ticker
      address
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

export const FeesDistributionTitle = ({ setInterval }) => {
  return (
    <BlockHeader
      setInterval={setInterval}
      defaultIndex={2}
      ranges={FEE_RANGES}
      title='Fees Distribution'
      description='The initial launch of $UNI clogged the Ethereum network and prompted record-high transaction fees. This dashboards tracks the recent share of UNI - and other tokens - in transaction fees paid.'
    />
  )
}

const FeesDistribution = () => {
  const [interval, setInterval] = useState('7d')
  return (
    <>
      <FeesDistributionTitle setInterval={setInterval} />
      <FeesDistributionChart className={styles.chart} interval={interval} />
    </>
  )
}

export const FeesDistributionChart = ({ className, interval }) => {
  const [settings, setSettings] = useState(formIntervalSettings(interval))

  useEffect(
    () => {
      setSettings({ ...interval, ...formIntervalSettings(interval) })
    },
    [interval]
  )

  const { data, loading } = useFeeDistributions(settings)

  const prepared = useMemo(
    () => {
      return data.map(item => {
        return {
          ...item,
          clickable: !!item.slug
        }
      })
    },
    [data]
  )

  const { isPro } = useUserSubscriptionStatus()

  if (!isPro) {
    return <MakeProSubscriptionCard classes={{ card: className }} />
  }

  return (
    <div className={cx(styles.container, className)}>
      {loading ? (
        <PageLoader />
      ) : (
        <ProjectsBarChartWrapper
          data={prepared}
          settings={{
            valueFormatter: val => `${millify(val)}`
          }}
          dataKey='fees'
          layout='vertical'
        />
      )}
    </div>
  )
}

export default FeesDistribution
