import React from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

export const Title = ({ children }) => (
  <h2 className={styles.title}>{children}</h2>
)

export const Content = ({ className, children, isGrid }) => (
  <div className={cx(styles.section, className, isGrid && styles.grid)}>
    {children}
  </div>
)

const Section = ({ children, title, isGrid }) => (
  <>
    <Title>{title}</Title>
    <Content isGrid={isGrid}>{children}</Content>
  </>
)

export default Section
