import React from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

export const Section = ({ title, children, className }) => (
  <section className={cx(styles.wrapper, className)}>
    {title && <h2 className={styles.title}>{title}</h2>}
    {children}
  </section>
)

export const Container = ({ className, children }) => (
  <div className={cx(styles.container, className)}>{children}</div>
)

export const Row = ({ className, ...props }) => (
  <div {...props} className={cx(styles.row, className)} />
)
