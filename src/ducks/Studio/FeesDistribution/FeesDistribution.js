import React, { useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { millify } from '../../../utils/formatting'
import ProjectsBarChart from '../../Stablecoins/ProjectsBarChart/ProjectsBarChart'
import { formIntervalSettings } from '../../SANCharts/IntervalSelector'
import PageLoader from '../../../components/Loader/PageLoader'
import HelpPopup from '../../../components/HelpPopup/HelpPopup'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import MakeProSubscriptionCard from '../../../pages/feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard'
import IntervalsComponent from '../../../components/IntervalsComponent/IntervalsComponent'
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
    <div className={styles.title}>
      <div className={styles.text}>Fees Distribution</div>{' '}
      <HelpPopup on='hover' position='top'>
        This represents the amount of Ether spent on fees broken down by
        projects
      </HelpPopup>
      <IntervalsComponent
        onChange={setInterval}
        className={styles.interval}
        defaultIndex={1}
        ranges={FEE_RANGES}
      />
    </div>
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
          ticker: item.ticker || item.address,
          slug: item.slug || item.address,
          value: item.fees,
          clickable: !!item.slug
        }
      })
    },
    [data]
  )

  const { isPro } = useUserSubscriptionStatus()

  if (!isPro) {
    return (
      <div className={cx(styles.container, className)}>
        <MakeProSubscriptionCard />
      </div>
    )
  }

  return (
    <div className={cx(styles.container, className)}>
      {loading ? (
        <PageLoader />
      ) : (
        <ProjectsBarChart
          data={prepared}
          settings={{
            yTickFormatter: val => `${millify(val)}`
          }}
        />
      )}
    </div>
  )
}

export default FeesDistribution
