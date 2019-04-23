import React from 'react'
import cx from 'classnames'
import { Tooltip } from '@santiment-network/ui'
import styles from './ExplanationTooltip.module.scss'

const ExplanationTooltip = ({ text, children, className, ...props }) => (
  <Tooltip
    {...props}
    className={cx(styles.wrapper, className)}
    closeTimeout={0}
    trigger={children}
  >
    {text}
  </Tooltip>
)

export default ExplanationTooltip
