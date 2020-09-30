import React from 'react'
import Label from '@santiment-network/ui/Label'
import Icon from '@santiment-network/ui/Icon'
import { BARS } from '../Chart/nodes'

const CASPER = '#9faac4'

export default ({ node, color = CASPER, ...rest }) => {
  if (!node) {
    return <Label variant='circle' accent='persimmon' {...rest} />
  }

  const props = BARS.has(node)
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
