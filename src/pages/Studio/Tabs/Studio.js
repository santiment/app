import React from 'react'
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
  subwidgetsController
}) => (
  <>
    <Header
      studio={studio}
      settings={settings}
      widgets={widgets}
      metrics={metrics}
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

export default StudioTab
