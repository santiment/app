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
import { getTimePeriod } from '../../../pages/TrendsExplore/utils'
import DaysSelector from './DaySelector'
import { newWidget } from '../Widget/utils'
import { DAY, getTimeIntervalFromToday } from '../../../utils/dates'
import styles from './FeesDistribution.module.scss'

export const FEE_RANGES = [
  { value: '1h', label: '1h' },
  { value: '1d', label: '24h' },
  { value: '7d', label: '7d' },
  { value: '30d', label: '30d' }
]

const { from, to } = getTimeIntervalFromToday(-1, DAY)
const DEFAULT_DATES = [from, to]

const FEES_DISTRIBUTION = gql`
  query ethFeesDistribution($from: DateTime!, $to: DateTime!) {
    ethFeesDistribution(from: $from, to: $to) {
      address
      fees
      project {
        logoUrl
        slug
        ticker
      }
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
    data: data
      ? data.ethFeesDistribution.map(item => ({ ...item.project, ...item }))
      : [],
    loading,
    error
  }
}

export const FeesDistributionTitle = ({ setInterval }) => {
  return (
    <BlockHeader
      setInterval={setInterval}
      defaultIndex={1}
      ranges={FEE_RANGES}
      title='Fees Distribution'
      className={styles.header}
    />
  )
}

const FeesDistribution = ({ onDisable }) => {
  const [interval, setInterval] = useState('1d')
  const [customDate, setCustomDate] = useState(null)
  const [settings, setSettings] = useState(formIntervalSettings(interval))

  useEffect(
    () => {
      setSettings({ ...interval, ...formIntervalSettings(interval) })
    },
    [interval]
  )

  const { isPro } = useUserSubscriptionStatus()

  return (
    <>
      <FeesDistributionTitle
        setInterval={setInterval}
        interval={interval}
        customDate={customDate}
      />
      {isPro ? (
        <FeesDistributionChart
          className={styles.chart}
          settings={settings}
          interval={interval}
          onDisable={onDisable}
          onChangePeriod={setCustomDate}
        />
      ) : (
        <MakeProSubscriptionCard />
      )}
    </>
  )
}

export const FeesDistributionChart = ({
  className,
  settings,
  onDisable,
  interval,
  onChangePeriod
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState(null)
  const { data, loading, error } = useFeeDistributions(
    selectedPeriod ? { ...settings, ...selectedPeriod } : { ...settings }
  )

  const prepared = useMemo(
    () => {
      return data.map(item => {
        return {
          ...item,
          key: item.slug || item.address,
          clickable: !!item.slug
        }
      })
    },
    [data]
  )

  useEffect(
    () => {
      if (interval !== '1d' && selectedPeriod) {
        setSelectedPeriod(null)
        onChangePeriod(null)
      }
    },
    [interval]
  )

  if (!loading && error) {
    onDisable && onDisable()
    return null
  }

  function changeDay (date) {
    setSelectedPeriod(getTimePeriod(date))
    onChangePeriod(date)
  }

  return (
    <div className={cx(styles.container, className)}>
      {interval === '1d' && (
        <DaysSelector className={styles.daysSelector} onDayChange={changeDay} />
      )}
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

FeesDistribution.new = props =>
  newWidget(FeesDistribution, {
    datesRange: DEFAULT_DATES,
    ...props
  })

export default FeesDistribution
