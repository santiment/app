import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Loader from '@santiment-network/ui/Loader/Loader'
import { getDateFormats, getTimeFormats } from '../../../../../utils/dates'
import styles from './index.module.scss'

const formatDataInfoDate = value => {
  const date = new Date(value)
  const { HH, mm } = getTimeFormats(date)
  const { MMMM, DD, YYYY } = getDateFormats(date)
  return `${HH}:${mm}, ${MMMM} ${DD}, ${YYYY}`
}

const DATA_INFO_QUERY = gql`
  query($metric: String!, $slug: String) {
    getMetric(metric: $metric) {
      availableSince(slug: $slug)
      lastDatetimeComputedAt(slug: $slug)
    }
  }
`

const Value = ({ value }) => {
  return value ? (
    formatDataInfoDate(value)
  ) : (
    <Loader className={styles.loader} />
  )
}

const DataInfo = ({ metric, slug, titleClassName, textClassName }) => {
  const { data, loading, error } = useQuery(DATA_INFO_QUERY, {
    variables: { slug, metric: metric.key }
  })

  if (error) return null

  const { availableSince, lastDatetimeComputedAt } = loading
    ? {}
    : data.getMetric

  return (
    <>
      <div className={styles.subtitle}>Available since</div>
      <div className={styles.text}>
        <Value value={availableSince} />
      </div>
      <div className={styles.subtitle}>Last computed at</div>
      <div className={styles.text}>
        <Value value={lastDatetimeComputedAt} />
      </div>
    </>
  )
}

export default DataInfo
