import React from 'react'
import Icon from '@santiment-network/ui/Icon'

export default ({ isBar, color, ...rest }) => {
  const props = isBar
    ? {
      type: 'chart-bars',
      fill: color
    }
    : {
      type: 'chart-line',
      fill: color,
      stroke: color
    }
  return <Icon {...rest} {...props} />
}
