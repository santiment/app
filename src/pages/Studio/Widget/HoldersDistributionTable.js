import React, { useMemo } from 'react'
import ReactDOM from 'react-dom'
import HoldersDistributionTable from '../../../ducks/Studio/Widget/HoldersDistributionTable/HoldersDistributionTable'

const HoldersDistributionTableWidget = ({ widget, target, settings }) => {
  const { from, to } = settings
  widget.datesRange = useMemo(() => [new Date(from), new Date(to)], [from, to])
  if (target) {
    target.classList.remove('widget')
    target.classList.remove('border')
  }

  return target
    ? ReactDOM.createPortal(
      <HoldersDistributionTable
        widget={widget}
        settings={settings}
        deleteWidget={widget.delete}
      />,
      target
    )
    : null
}

export default HoldersDistributionTableWidget
