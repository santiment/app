import React from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

const Section = ({ title, children, className }) => (
  <section className={cx(styles.wrapper, className)}>
    {title && <h2 className={styles.title}>{title}</h2>}
    {children}
  </section>
)

export default Section
