import React, { useMemo, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { millify } from '../../../utils/formatting'
import ProjectsBarChart from '../../Stablecoins/ProjectsBarChart/ProjectsBarChart'
import { formIntervalSettings } from '../../SANCharts/IntervalSelector'
import PageLoader from '../../../components/Loader/PageLoader'
import HelpPopup from '../../../components/HelpPopup/HelpPopup'
import styles from './FeesDistribution.module.scss'

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
      <div className={styles.text}>Fees Distribution</div>{' '}
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
      <FeesDistributionChart />
    </>
  )
}

const DEFAULT_SETTINGS = formIntervalSettings('7d')

export const FeesDistributionChart = () => {
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

  return (
    <div className={styles.container}>
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
