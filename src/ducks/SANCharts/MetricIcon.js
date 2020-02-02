import React from 'react'
import Label from '@santiment-network/ui/Label'
import Icon from '@santiment-network/ui/Icon'

export default ({ node, color, ...rest }) => {
  if (!node) {
    return <Label variant='circle' accent='persimmon' {...rest} />
  }

  const props =
    node === 'bar'
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
