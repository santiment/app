import { useEffect, useState } from 'react'

export const useTableEffects = ({
  datesRange,
  rerenderWidgets,
  deleteConnectedWidget,
  widget,
  parentWidget
}) => {
  const [dates, setDates] = useState(widget.datesRange)

  useEffect(
    () => {
      if (datesRange) {
        const newRange = [new Date(datesRange[0]), new Date(datesRange[1])]
        newRange[0].setHours(0, 0, 0, 0)
        newRange[1].setHours(23, 59, 59, 999)
        onCalendarChange(newRange)
      }
    },
    [datesRange]
  )

  function onCalendarChange (newDates) {
    widget.datesRange = newDates
    setDates(newDates)
    rerenderWidgets() // NOTE: Used to sync search query [@vanguard | Nov 2, 2020]
  }

  function onCloseClick () {
    deleteConnectedWidget(widget, parentWidget)
  }

  return {
    dates,
    onCalendarChange,
    onCloseClick
  }
}
