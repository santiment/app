import React from 'react'
import cx from 'classnames'
import withSizes from 'react-sizes'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import Panel from '@santiment-network/ui/Panel'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import { mapSizesToProps } from '../../utils/withSizes'
import styles from './HelpPopup.module.scss'

export const HelpPopupTrigger = ({ className, ...props }) => (
  <Icon
    {...props}
    className={cx(styles.trigger, className)}
    type='info-round'
  />
)

const HelpPopup = ({
  children,
  content,
  className,
  position = 'bottom',
  align = 'center',
  on = 'click',
  trigger: Trigger = HelpPopupTrigger,
  isPhone,
  triggerClassName
}) => {
  const render = content || children

  return isPhone ? (
    <ContextMenu trigger={<Trigger className={triggerClassName} />}>
      <Panel className={styles.panel}>{render}</Panel>
    </ContextMenu>
  ) : (
    <Tooltip
      trigger={<Trigger className={triggerClassName} />}
      position={position}
      align={align}
      on={on}
      className={cx(styles.wrapper, className)}
    >
      <Panel className={styles.panel}>{render}</Panel>
    </Tooltip>
  )
}

export default withSizes(mapSizesToProps)(HelpPopup)
