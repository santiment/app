import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useChart } from '../../Chart/context'
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

export const IcoPrice = ({
  chart,
  slug,
  className,
  isICOPriceActive,
  onResult
}) => {
  const [{ top, price, isOnChart }, setValue] = useState(DEFAULT_VALUE)
  const { data, loading } = useQuery(PROJECT_ICO_PRICE_QUERY, {
    variables: {
      slug
    }
  })

  const {
    height,
    minMaxes,
    padding: { left, right }
  } = chart
  const priceMinMax = minMaxes && minMaxes.price_usd

  useEffect(
    () => {
      if (!data || !priceMinMax) return

      const { icoPrice } = data.project

      if (!icoPrice) {
        setValue(DEFAULT_VALUE)
        onResult()

        return
      }

      const { min, max } = priceMinMax

      const isOnChart = icoPrice > min && icoPrice < max

      setValue({
        isOnChart,
        top: isOnChart ? chart.scale(chart, min, max)(icoPrice) : 0,
        price: formatter(icoPrice)
      })
      onResult(icoPrice)
    },
    [data, priceMinMax, height]
  )

  return isICOPriceActive && !loading && price ? (
    <div
      className={cx(styles.wrapper, isOnChart && styles.dashed, className)}
      style={{ left, right, top }}
    >
      <div className={styles.label}>
        ICO price
        <span className={styles.value}> {price}</span>
      </div>
    </div>
  ) : null
}

IcoPrice.defaultProps = {
  onResult: () => {}
}

export default props => {
  const chart = useChart()
  return <IcoPrice chart={chart} {...props} />
}
