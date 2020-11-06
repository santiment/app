import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import list from '../../../components/Plans/list'
import styles from './Enterprise.module.scss'

const features = [
  'Access to all alert types',
  'Unlimited active alerts',
  'Sanbase metrics - 5 years of historical data',
  'Sanbase metrics - including present-day data',
  'Exclusive market reports'
]

const { Component: Btn } = list.ENTERPRISE

const Enterprise = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.title}>Custom</div>
        <div className={styles.description}>
          For organizations that need advanced data and support
        </div>
        <Btn label='Contact sales' />
      </div>
      <div className={styles.right}>
        {features.map(feature => (
          <div key={feature} className={styles.feature}>
            <Icon type='checkmark' className={styles.check} />
            {feature}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Enterprise
