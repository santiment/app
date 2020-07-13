import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import ExplanationTooltip from '../ExplanationTooltip/ExplanationTooltip'
import styles from './index.module.scss'

export const VisibilityIndicator = ({ isPublic, offset = 7 }) => (
  <ExplanationTooltip
    text={isPublic ? 'Public' : 'Private'}
    className={styles.explanation}
    offsetY={offset}
  >
    <Icon type={isPublic ? 'eye' : 'lock-small'} className={styles.icon} />
  </ExplanationTooltip>
)
