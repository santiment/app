import React from 'react'
import Frequences from '../../dataHub/metrics/frequences'
import styles from './MetricFrequence.module.scss'

const MetricFrequence = ({ metric: { key } }) => {
  const fr = Frequences[key]

  if (!fr) {
    return null
  }

  return (
    <>
      <div className={styles.title}>Frequency:</div>

      {fr}
    </>
  )
}

export default MetricFrequence
