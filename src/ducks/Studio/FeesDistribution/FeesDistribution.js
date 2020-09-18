import React, { useMemo, useState } from 'react'
import cx from 'classnames'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { millify } from '../../../utils/formatting'
import ProjectsBarChart from '../../Stablecoins/ProjectsBarChart/ProjectsBarChart'
import { formIntervalSettings } from '../../SANCharts/IntervalSelector'
import PageLoader from '../../../components/Loader/PageLoader'
import HelpPopup from '../../../components/HelpPopup/HelpPopup'
import styles from './FeesDistribution.module.scss'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import MakeProSubscriptionCard from '../../../pages/feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard'

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

export const FeesDistributionTitle = () => {
  return (
    <div className={styles.title}>
      <div className={styles.text}>Fees Distribution (last 7 days)</div>{' '}
      <HelpPopup on='hover' position='top'>
        This represents the amount of Ether spent on fees broken down by
        projects
      </HelpPopup>
    </div>
  )
}

const FeesDistribution = () => {
  return (
    <>
      <FeesDistributionTitle />
      <FeesDistributionChart className={styles.chart} />
    </>
  )
}

const DEFAULT_SETTINGS = formIntervalSettings('7d')

export const FeesDistributionChart = ({ className }) => {
  const [settings] = useState(DEFAULT_SETTINGS)

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
    return <MakeProSubscriptionCard />
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
