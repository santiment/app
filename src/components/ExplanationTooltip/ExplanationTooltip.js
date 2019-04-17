import React from 'react'
import { Tooltip } from '@santiment-network/ui'
import styles from './ExplanationTooltip.module.scss'

const ExplanationTooltip = ({ text, children, ...props }) => (
  <Tooltip
    {...props}
    className={styles.wrapper}
    closeTimeout={0}
    trigger={children}
  >
    {text}
  </Tooltip>
)

export default ExplanationTooltip
