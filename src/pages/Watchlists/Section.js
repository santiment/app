import React from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

const Section = ({ children, title, isGrid, className }) => (
  <>
    {title && <h2 className={styles.title}>{title}</h2>}
    <div className={cx(styles.section, className, isGrid && styles.grid)}>
      {children}
    </div>
  </>
)

export default Section
