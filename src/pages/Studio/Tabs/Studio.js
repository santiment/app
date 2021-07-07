import React, { useEffect } from 'react'
import { newGlobalShortcut } from 'webkit/utils/events'
import { globals } from 'studio/stores/globals'
import { mapview } from 'studio/stores/mapview'
import { useHistory } from '../stores'
import Header from '../Header'
import Widget from '../Widget'
import Subwidgets from '../Subwidgets'
import Sidewidget from '../Sidewidget'

const StudioTab = ({
  studio,
  settings,
  widgets,
  metrics,
  sidewidget,
  modDate,
  modRange,
  InsightsStore,
  prevFullUrlRef,
  subwidgetsController
}) => {
  const History = useHistory(studio)

  useEffect(() => {
    const unsubL = newGlobalShortcut('L', () => globals.toggle('isNewDrawing'))
    const unsubCmdM = newGlobalShortcut('CMD+M', mapview.toggle)

    return () => {
      unsubL()
      unsubCmdM()
    }
  }, [])

  useEffect(
    () => {
      if (!History) return

      const unsubCmdZ = newGlobalShortcut('CMD+Z', History.undo)
      const unsubCmdShiftZ = newGlobalShortcut('CMD+SHIFT+Z', History.redo)

      return () => {
        unsubCmdZ()
        unsubCmdShiftZ()
      }
    },
    [History]
  )

  return (
    <>
      <Header
        studio={studio}
        settings={settings}
        widgets={widgets}
        metrics={metrics}
        prevFullUrlRef={prevFullUrlRef}
      />

      {widgets.map(
        widget =>
          widget.container && (
            <Widget
              key={widget.id}
              widget={widget}
              target={widget.container}
              settings={settings}
              InsightsStore={InsightsStore}
            />
          )
      )}

      {sidewidget && (
        <Sidewidget
          studio={studio}
          project={settings}
          metrics={metrics}
          sidewidget={sidewidget}
          modDate={modDate}
          modRange={modRange}
        />
      )}

      <Subwidgets
        subwidgets={subwidgetsController.subwidgets}
        settings={settings}
        modRange={modRange}
      />
    </>
  )
}

export default StudioTab
