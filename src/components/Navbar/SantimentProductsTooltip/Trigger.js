import React from 'react'
import cx from 'classnames'
import styles from './SantimentProductsTooltip.module.scss'

export const ProductsTrigger = ({ isOpen, className }) => (
  <div className={cx(styles.trigger, isOpen && styles.opened, className)}>
    <svg width='16' height='16' fill='none'>
      <rect
        width='6'
        height='6'
        x='.5'
        y='.5'
        stroke='var(--jungle-green)'
        rx='.5'
      />
      <rect
        width='6'
        height='6'
        x='9.5'
        y='9.5'
        stroke='var(--texas-rose)'
        rx='.5'
      />
      <rect
        width='6'
        height='6'
        x='.5'
        y='9.5'
        stroke='var(--dodger-blue)'
        rx='.5'
      />
      <circle cx='12.5' cy='3.5' r='3' stroke='var(--heliotrope)' />
    </svg>
  </div>
)
