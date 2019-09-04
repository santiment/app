import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import list from '../../components/Plans/list'
import styles from './Enterprise.module.scss'

const features = [
  'Unlimited signals',
  'Handcrafted reports',
  'All types of signals',
  'Bundles with all data providers',
  'Unlimited metrics data',
  '24/7 prioritized support',
  'Samples data'
]

const { Component: Btn } = list.ENTERPRISE

const Enterprise = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.title}>Enterprise</div>
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
