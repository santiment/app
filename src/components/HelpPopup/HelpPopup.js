import React from 'react'
import { Icon } from '@santiment-network/ui'
import { Popup } from 'semantic-ui-react'

export const style = {
  maxWidth: 465,
  padding: '2rem 1.8rem'
}

const HelpPopup = ({
  children,
  content,
  className,
  trigger = (
    <Icon style={{ cursor: 'pointer' }} type='help-round' fill='#ada6bc' />
  )
}) => {
  const render = content || children
  return (
    <Popup
      content={render}
      trigger={trigger}
      position='bottom center'
      on='hover'
      style={style}
    />
  )
}

export default HelpPopup
