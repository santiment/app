import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { useDialogState } from '../../hooks/dialog'
import AccordionContent from '../AccordionContent'
import styles from './ExpansionItem.module.scss'

const ExpansionItem = ({ iconType, title, children, isOpen, classes = {} }) => {
  const { openDialog, isOpened, closeDialog } = useDialogState(isOpen)

  return (
    <div className={cx(styles.container, classes.expansion)}>
      <div
        className={cx(styles.title, classes.title, isOpened && classes.opened)}
        onClick={isOpened ? closeDialog : openDialog}
      >
        {title}
        <Icon
          className={cx(styles.arrow, isOpened && styles.arrowOpened, classes.arrow)}
          type={iconType || 'arrow-down-big'}
        />
      </div>

      <AccordionContent show={isOpened}>{children}</AccordionContent>
    </div>
  )
}

export default ExpansionItem
