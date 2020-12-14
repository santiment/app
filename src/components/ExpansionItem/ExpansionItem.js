import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { useDialogState } from '../../hooks/dialog'
import styles from './ExpansionItem.module.scss'

const ExpansionItem = ({ title, children, isOpen, classes = {} }) => {
  const { openDialog, isOpened, closeDialog } = useDialogState(isOpen)

  return (
    <div className={cx(styles.container, classes.expansion)}>
      <div
        className={cx(styles.title, classes.title, isOpened && classes.opened)}
        onClick={isOpened ? closeDialog : openDialog}
      >
        {title}

        <Icon
          className={cx(styles.arrow, isOpened && styles.arrowOpened)}
          type={isOpened ? 'arrow-up-big' : 'arrow-down-big'}
        />
      </div>

      {isOpened && children}
    </div>
  )
}

export default ExpansionItem
