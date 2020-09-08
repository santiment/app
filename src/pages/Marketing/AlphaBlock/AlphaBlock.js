import React from 'react'
import cx from 'classnames'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import AlphaCard from '../AlphaCard/AlphaCard'
import PageLoader from '../../../components/Loader/PageLoader'
import styles from './AlphaBlock.module.scss'
import ProPriceDivergenceCard from '../ProTemplateCard/ProPriceDivergenceCard'

const REPORTS_QUERY = gql`
  {
    getReports {
      name
      description
      url
    }
  }
`

export const useAlphaReports = () => {
  const { data, loading, error } = useQuery(REPORTS_QUERY)
  return [data ? data.getReports : [], loading, error]
}

const AlphaBlock = ({ classes = {} }) => {
  const [reports, loading] = useAlphaReports()

  if (loading) {
    return <PageLoader />
  }

  return (
    <>
      <div className={cx(classes.description, styles.description)}>
        A growing collection of in-house strategies and new approaches to market
        analysis developed by the Santiment team. New Alphas added weekly!
      </div>

      {loading ? (
        <PageLoader />
      ) : (
        <div className={styles.cards}>
          <ProPriceDivergenceCard />
          {reports.map((item, index) => (
            <AlphaCard key={index} data={item} />
          ))}
        </div>
      )}
    </>
  )
}

export default AlphaBlock
