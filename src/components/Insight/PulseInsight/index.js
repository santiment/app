import React from 'react'
import cx from 'classnames'
import toReact from 'svelte-adapter/react'
import SveltePulseInsight from './index.svelte'
import styles from './index.module.scss'

const ReactPulseInsight = toReact(SveltePulseInsight, {}, 'div')

const PulseInsight = ({ insight, className }) => (
  <ReactPulseInsight
    insight={insight}
    className={cx(styles.wrapper, className)}
  />
)

export default PulseInsight
