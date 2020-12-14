import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import ExplanationTooltip from '../ExplanationTooltip/ExplanationTooltip'
import styles from './index.module.scss'

export const VisibilityIndicator = ({ isPublic, offset = 7, className }) => (
  <ExplanationTooltip
    text={isPublic ? 'Public' : 'Private'}
    className={styles.explanation}
    offsetY={offset}
  >
    <Icon
      type={isPublic ? 'eye' : 'eye-disabled'}
      className={cx(styles.icon, className)}
    />
  </ExplanationTooltip>
)
