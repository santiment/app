import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './PrePublishHelp.module.scss'

const InsightEditorPublishHelp = ({ requiredOptions }) => (
  <div>
    <p className={cx(styles.item, !requiredOptions.title && styles.disabled)}>
      <Icon type='checkmark' className={styles.icon} />
      Title contains more than 5 characters
    </p>
    <p className={cx(styles.item, !requiredOptions.text && styles.disabled)}>
      <Icon type='checkmark' className={styles.icon} />
      Text contains more than 5 characters
    </p>
  </div>
)

export default InsightEditorPublishHelp
