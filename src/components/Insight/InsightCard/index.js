import React from 'react'
import cx from 'classnames'
import toReact from 'svelte-adapter/react'
import SvelteInsightCard from './index.svelte'
import styles from '../InsightCardWithMarketcap/index.module.scss'

const ReactInsightCard = toReact(SvelteInsightCard, {}, 'div')

const InsightCard = ({ insight, className }) => (
  <ReactInsightCard
    insight={insight}
    className={cx(styles.wrapper, className)}
  />
)

export default InsightCard
