import React from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

export const Title = ({ id, children }) => (
  <h2 id={id} className={styles.title}>
    {children}
  </h2>
)

export const Content = ({ className, children, isGrid }) => (
  <div className={cx(styles.section, className, isGrid && styles.grid)}>{children}</div>
)

const Section = ({ children, title, isGrid }) => (
  <>
    <Title>{title}</Title>
    <Content isGrid={isGrid}>{children}</Content>
  </>
)

export default Section
