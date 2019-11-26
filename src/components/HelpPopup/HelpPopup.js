import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import Panel from '@santiment-network/ui/Panel'
import styles from './HelpPopup.module.scss'

export const style = {
  maxWidth: 465,
  padding: '2rem 1.8rem'
}

export const HelpPopupTrigger = (
  <Icon style={{ cursor: 'pointer' }} type='help-round' fill='#ada6bc' />
)

const HelpPopup = ({
  children,
  content,
  className,
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
      on='hover'
      style={style}
    >
      <Panel className={styles.panel}>{render}</Panel>
    </Tooltip>
  )
}

export default HelpPopup
