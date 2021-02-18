import React from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

const Title = ({ children, className }) => (
  <h3 className={cx(styles.title, className)}>{children}</h3>
)

export default Title
