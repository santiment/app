import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Metric } from '../../dataHub/metrics'
import styles from './IcoPrice.module.scss'

const PROJECT_ICO_PRICE_QUERY = gql`
  query($slug: String!) {
    project: projectBySlug(slug: $slug) {
      id
      icoPrice
    }
  }
`

const { formatter } = Metric.price_usd

const DEFAULT_VALUE = {}

const IcoPrice = ({ chart, scale, slug, className, onEmptyResult }) => {
  const [{ top, price, isOnChart }, setValue] = useState(DEFAULT_VALUE)
  const { data, loading } = useQuery(PROJECT_ICO_PRICE_QUERY, {
    variables: {
      slug
    }
  })

  const { height, minMaxes, left } = chart
  const priceMinMax = minMaxes && minMaxes.price_usd

  useEffect(
    () => {
      if (!data || !priceMinMax) return

      const { icoPrice } = data.project

      if (!icoPrice) {
        setValue(DEFAULT_VALUE)
        return onEmptyResult && onEmptyResult()
      }

      const { min, max } = priceMinMax

      const isOnChart = icoPrice > min && icoPrice < max

      setValue({
        isOnChart,
        top: isOnChart ? scale(chart, min, max)(icoPrice) : 0,
        price: formatter(icoPrice)
      })
    },
    [data, priceMinMax, height]
  )

  return !loading && price ? (
    <div
      className={cx(styles.wrapper, isOnChart && styles.dashed, className)}
      style={{ left, top }}
    >
      <div className={styles.label}>
        ICO price
        <span className={styles.value}> {price}</span>
      </div>
    </div>
  ) : null
}

export default IcoPrice
