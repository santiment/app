import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel/Panel'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import { useControlledModal, newModalController } from '../../hooks/modal'
import styles from './index.module.scss'

const Button = ({
  forwardedRef,
  children,
  Trigger,
  isOpened,
  open,
  onClick
}) => (
  <div className={styles.btn} ref={forwardedRef}>
    <Trigger className={styles.trigger} onClick={onClick}>
      {children}
    </Trigger>

    <div className={cx(styles.more, isOpened && styles.more_opened)}>
      <Icon type='arrow-down' className={styles.arrow} onClick={open} />
    </div>
  </div>
)
Button.defaultProps = {
  Trigger: 'div'
}

const actionsMenuController = newModalController(
  'ActionsMenu',
  ({ children, trigger, Trigger, onTriggerClick, ...props }) => {
    const { open: isOpened, onOpen } = props

    return (
      <ContextMenu
        align='end'
        {...props}
        trigger={
          <Button
            Trigger={Trigger}
            isOpened={isOpened}
            open={onOpen}
            onClick={onTriggerClick}
          >
            {trigger}
          </Button>
        }
      >
        <Panel variant='modal' className={styles.modal}>
          {children}
        </Panel>
      </ContextMenu>
    )
  }
)

export const useControlledActionsMenu = () =>
  useControlledModal(actionsMenuController)

const ActionsMenu = props => {
  const Controller = useControlledActionsMenu().ActionsMenu
  return <Controller {...props} />
}

export default ActionsMenu
