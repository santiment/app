import React from 'react'
import cx from 'classnames'
import Widget from './Widget'
import styles from './Widget.module.scss'

const SecondaryWidget = ({ className, ...props }) => (
  <Widget {...props} className={cx(styles.widget_secondary, className)} />
)

export default SecondaryWidget
