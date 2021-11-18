import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { SelectorNode } from 'studio/metrics/selector'
import TopTransactionsTable from '../../ducks/Studio/Widget/TopTransactionsTable'

export const KeyToSubwidget = {
  [SelectorNode.TopTransactionsTable.key]: TopTransactionsTable
}

export function useSubwidgetsController () {
  const [subwidgets, setSubwidgets] = useState([])

  function onSubwidget (target, subwidgetNode, parentWidget) {
    if (!subwidgetNode) return
    const subwidget = KeyToSubwidget[subwidgetNode.key]
    if (!subwidget) return

    const Subwidget = {
      target,
      deleteWidget,
      subwidget: subwidget.new({ parentWidget })
    }
    setSubwidgets(subwidgets => [...subwidgets, Subwidget])

    const filter = widget => widget !== Subwidget
    function deleteWidget () {
      setSubwidgets(subwidgets => subwidgets.filter(filter))
      parentWidget.subwidgets = parentWidget.subwidgets.filter(
        w => w !== subwidgetNode
      )
    }

    return deleteWidget
  }

  return {
    subwidgets,
    onSubwidget
  }
}

const Subwidgets = ({ subwidgets, settings, modRange }) =>
  subwidgets.map(({ subwidget, target, deleteWidget }) =>
    ReactDOM.createPortal(
      <subwidget.Widget
        key={subwidget.id}
        widget={subwidget}
        settings={settings}
        datesRange={modRange}
        deleteWidget={deleteWidget}
        rerenderWidgets={() => {}}
      />,
      target
    )
  )

export default Subwidgets
