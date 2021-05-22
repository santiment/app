import React, { useState, useRef, useEffect } from 'react'
import SanStudio from 'studio'
import { Metric } from 'studio/metrics'
import { newWidget } from 'studio/stores/widgets'
import { studio as settingsStore } from 'studio/stores/studio'
import ChartWidget from 'studio/ChartWidget'
import {
  useGlobalsUpdater,
  useSettings,
  useWidgetsStore,
  useStudioMetrics,
  useWidgets
} from './stores'
import Widget, { getExternalWidget } from './Widget'
import Sidewidget from './Sidewidget'
import ProjectInfo from './ProjectInfo'
import Header from './Header'
import Sidebar from './Sidebar'
import Subwidgets, { useSubwidgetsController } from './Subwidgets'
import { useInsightsStoreCreator } from './Insights'
import { useRedrawer } from '../../hooks'
import 'webkit/styles/color.css'
import 'webkit/styles/text.css'
import 'webkit/styles/layout.css'
import 'webkit/styles/elements.css'
import styles from './index.module.scss'

const Studio = ({
  slug,
  defaultSettings,
  defaultWidgets,
  defaultSidewidget,
  Extensions,
  ...props
}) => {
  const ref = useRef()
  const [studio, setStudio] = useState()
  const settings = useSettings()
  const widgetsStore = useWidgetsStore(studio)
  const widgets = useWidgets(studio)
  const subwidgetsController = useSubwidgetsController()
  const metrics = useStudioMetrics(studio)
  const InsightsStore = useInsightsStoreCreator()
  const redraw = useRedrawer()[1]

  useGlobalsUpdater()
  useEffect(() => {
    const page = ref.current
    const studio = new SanStudio({
      target: page,
      props: {
        getExternalWidget,
        defaultSettings,
        onWidget: () => redraw(),
        onSubwidget: subwidgetsController.onSubwidget,
        InsightsContextStore: InsightsStore,
        sidewidget: defaultSidewidget,
        widgets: defaultWidgets || [
          newWidget(ChartWidget, {
            metrics: [Metric.price_usd]
          })
        ]
      }
    })

    setStudio(studio)
    return () => studio.$destroy()
  }, [])

  useEffect(
    () => {
      if (slug) settingsStore.setProject({ slug })
    },
    [slug]
  )

  useEffect(
    () => {
      if (defaultSettings) settingsStore.setProject(defaultSettings)
      if (studio && defaultWidgets) widgetsStore.set(defaultWidgets)
    },
    [studio, defaultSettings, defaultWidgets]
  )

  function onProjectSelect (project) {
    if (project) {
      const { slug, ticker, name, id } = project
      settingsStore.setProject({
        slug,
        ticker,
        name,
        projectId: id
      })
    }
  }

  return (
    <div ref={ref} className={styles.wrapper}>
      {studio && (
        <>
          <ProjectInfo
            studio={studio}
            settings={settings}
            onProjectSelect={onProjectSelect}
          />

          <Header
            studio={studio}
            settings={settings}
            widgets={widgets}
            metrics={metrics}
          />

          <Sidebar
            studio={studio}
            settings={settings}
            onProjectSelect={onProjectSelect}
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

          <Sidewidget studio={studio} project={settings} metrics={metrics} />

          <Subwidgets
            subwidgets={subwidgetsController.subwidgets}
            settings={settings}
          />
        </>
      )}

      <Extensions
        {...props}
        widgets={widgets}
        subwidgets={subwidgetsController.subwidgets}
        settings={settings}
      />
    </div>
  )
}

export default Studio
