import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Button from '@santiment-network/ui/Button'
import AdvancedCalendarPopup from './Popup'
import styles from './index.module.scss'

export default ({ className }) => {
  return (
    <AdvancedCalendarPopup
      trigger={
        <Button border classes={styles} className={cx(styles.btn, className)}>
          1 - 1
        </Button>
      }
    />
  )
}
