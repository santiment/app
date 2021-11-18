import React, { useMemo } from 'react'
import { withExternal } from './utils'
import HoldersDistributionTable from '../../../ducks/Studio/Widget/HoldersDistributionTable/HoldersDistributionTable'

const Widget = withExternal(HoldersDistributionTable)
const HoldersDistributionTableWidget = ({ widget, target, settings }) => {
  const { from, to } = settings
  widget.datesRange = useMemo(() => [new Date(from), new Date(to)], [from, to])

  return (
    <Widget
      target={target}
      widget={widget}
      settings={settings}
      deleteWidget={widget.deleteWithHistory || widget.delete}
      rerenderWidgets={() => {}}
    />
  )
}

export default HoldersDistributionTableWidget
