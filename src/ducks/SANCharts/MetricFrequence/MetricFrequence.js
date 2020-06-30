import React from 'react'
import cx from 'classnames'
import Frequences from '../../dataHub/metrics/frequences'
import styles from './MetricFrequence.module.scss'

const MetricFrequence = ({ metric: { key }, classes = {} }) => {
  const fr = Frequences[key]

  if (!fr) {
    return null
  }

  return (
    <div className={classes.frequency}>
      <div className={cx(styles.title, classes.frequencyTitle)}>Frequency:</div>

      {fr}
    </div>
  )
}

export default MetricFrequence
