import React, { useMemo } from 'react'
import ReactDOM from 'react-dom'
import FeesDistribution from '../../../ducks/Studio/FeesDistribution/FeesDistribution'

const FeesDistributionWidget = ({ widget, target, settings }) => {
  if (target) {
    target.classList.remove('widget')
    target.classList.remove('border')
  }

  return target
    ? ReactDOM.createPortal(
      <FeesDistribution settings={settings} deleteWidget={widget.delete} />,
      target
    )
    : null
}

export default FeesDistributionWidget
