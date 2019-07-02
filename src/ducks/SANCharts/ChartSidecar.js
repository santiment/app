import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import styles from './ChartSidecar.module.scss'

const ChartSidecar = () => {
  return (
    <div className={styles.wrapper}>
      <Icon type='arrow-left' className={styles.toggle} />
    </div>
  )
}

export default ChartSidecar
