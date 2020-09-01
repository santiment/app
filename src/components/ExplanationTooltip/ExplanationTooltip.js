import React from 'react'
import cx from 'classnames'
import Tooltip from '@santiment-network/ui/Tooltip'
import styles from './ExplanationTooltip.module.scss'

const ExplanationTooltip = ({
  text,
  children,
  className,
  closeTimeout = 0,
  classes = {},
  ...props
}) => (
  <Tooltip
    {...props}
    classes={classes}
    className={cx(styles.wrapper, className)}
    closeTimeout={closeTimeout}
    arrowClassName={cx(styles.arrow, classes.tooltipArrow)}
    trigger={children}
  >
    {text}
  </Tooltip>
)

export default ExplanationTooltip
