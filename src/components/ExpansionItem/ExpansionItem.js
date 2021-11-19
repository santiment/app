import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import { useDialogState } from '../../hooks/dialog'
import AccordionContent from '../AccordionContent'
import styles from './ExpansionItem.module.scss'

const ExpansionItem = ({
  title,
  children,
  isOpen,
  classes = {},
  style,
  onClick,
  iconType
}) => {
  const { openDialog, isOpened, closeDialog } = useDialogState(isOpen)

  const handleItemClick = () => {
    onClick && onClick(isOpened)
    isOpened ? closeDialog() : openDialog()
  }

  return (
    <div className={cx(styles.container, classes.expansion)} style={style}>
      <div
        className={cx(styles.title, classes.title, isOpened && classes.opened)}
        onClick={handleItemClick}
      >
        {title}

        <Icon
          className={cx(
            styles.arrow,
            classes.arrow,
            isOpened && styles.arrowOpened
          )}
          type={iconType || 'arrow-down-big'}
        />
      </div>

      <AccordionContent show={isOpened}>{children}</AccordionContent>
    </div>
  )
}

export default ExpansionItem
