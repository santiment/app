import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import { Popup } from 'semantic-ui-react'

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
  position = 'bottom center',
  trigger = HelpPopupTrigger
}) => {
  const render = content || children
  return (
    <Popup
      content={render}
      trigger={trigger}
      position={position}
      on='hover'
      style={style}
    />
  )
}

export default HelpPopup
