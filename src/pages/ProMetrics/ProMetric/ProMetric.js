import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import UpgradeBtn from '../../../components/UpgradeBtn/UpgradeBtn'
import styles from './ProMetric.module.scss'

const ProMetric = ({ metric: { title, description, svg, isLeft } }) => {
  return (
    <div className={cx(styles.container, isLeft && styles.isLeft)}>
      <div className={styles.descriptions}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        <UpgradeToUser className={styles.upgrade} />
      </div>
      <div className={cx(styles.svg, isLeft && styles.svgLeft)}>{svg}</div>
    </div>
  )
}

export const UpgradeToUser = ({ className }) => {
  return (
    <UpgradeBtn
      className={className}
      variant='flat'
      trigger={
        <>
          Upgrade to use{' '}
          <Icon className={styles.upgradeIcon} type='pointer-right' />
        </>
      }
    />
  )
}

export default ProMetric
