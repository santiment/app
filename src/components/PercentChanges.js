import React from 'react'
import cx from 'classnames'
import ValueChange from './ValueChange/ValueChange'
import styles from './PercentChanges.module.scss'

const render = change => `${parseFloat(change).toFixed(2)} %`

const PercentChanges = ({ className, changes }) => (
  <ValueChange
    className={cx(styles.change, className)}
    change={changes}
    render={render}
  />
)

export default PercentChanges
