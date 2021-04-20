import React from 'react'
import cx from 'classnames'
import styles from './Trigger.module.scss'

export const ProductsTrigger = ({ isOpen, className }) => (
  <div className={cx(styles.trigger, isOpen && styles.opened, className)}>
    <svg width='16' height='16' fill='none'>
      <rect width='7' height='7' fill='var(--jungle-green-light-3)' rx='1' />
      <rect
        width='7'
        height='7'
        x='9'
        y='9'
        fill='var(--texas-rose-light-3)'
        rx='1'
      />
      <rect
        width='7'
        height='7'
        y='9'
        fill='var(--dodger-blue)'
        opacity='.5'
        rx='1'
      />
      <circle cx='12.5' cy='3.5' r='3.5' fill='var(--heliotrope-light-2)' />
    </svg>
  </div>
)
