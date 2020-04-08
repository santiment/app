import React from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import Panel from '@santiment-network/ui/Panel'
import styles from './HelpPopup.module.scss'

export const HelpPopupTrigger = (
  <Icon className={styles.trigger} type='question-round-small' />
)

const HelpPopup = ({
  children,
  content,
  className,
  wrapperClassName,
  position = 'bottom',
  align = 'center',
  trigger = HelpPopupTrigger
}) => {
  const render = content || children
  return (
    <Tooltip
      trigger={trigger}
      position={position}
      align={align}
      on='click'
      className={cx(styles.wrapper, className)}
    >
      <Panel className={styles.panel}>{render}</Panel>
    </Tooltip>
  )
}

export default HelpPopup
