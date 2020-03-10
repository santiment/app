import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Metrics } from '../../SANCharts/data'
import styles from './IcoPrice.module.scss'

const PROJECT_ICO_PRICE_QUERY = gql`
  query($slug: String!) {
    project: projectBySlug(slug: $slug) {
      id
      icoPrice
    }
  }
`

const { price_usd } = Metrics
const { formatter } = price_usd

const IcoPrice = ({ chart, scale, slug, className }) => {
  const [{ top, price }, setValue] = useState({})
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

      if (!icoPrice) return

      const { min, max } = priceMinMax

      setValue({
        top: scale(height, min, max)(icoPrice),
        price: formatter(data.project.icoPrice)
      })
    },
    [data, priceMinMax, height]
  )

  return !loading && top ? (
    <div className={cx(styles.wrapper, className)} style={{ left, top }}>
      <div className={styles.label}>
        ICO price
        <span className={styles.value}> {price}</span>
      </div>
    </div>
  ) : null
}

export default props => {
  const { chart, metrics } = props

  return chart && metrics.includes(price_usd) ? <IcoPrice {...props} /> : null
}
