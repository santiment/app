import React from 'react'
import cx from 'classnames'
import toReact from 'svelte-adapter/react'
import SvelteInsightCardWithMarketcap from './index.svelte'
import styles from './index.module.scss'

const ReactInsightCardWithMarketCap = toReact(
  SvelteInsightCardWithMarketcap,
  {},
  'div'
)

const InsightCardWithMarketcap = ({ insight, className }) => (
  <ReactInsightCardWithMarketCap
    insight={insight}
    className={cx(styles.wrapper, className)}
  />
)

export default InsightCardWithMarketcap
