import React from 'react'
import cx from 'classnames'
import Tooltip from '@santiment-network/ui/Tooltip'
import styles from './DarkTooltip.module.scss'

const DarkTooltip = ({ className, arrowClassName, ...props }) => (
  <Tooltip
    {...props}
    withArrow
    arrowClassName={cx(styles.arrow, arrowClassName)}
    className={cx(styles.tooltip, className)}
  />
)

export default DarkTooltip
