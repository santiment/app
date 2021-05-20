import React, { useState, useRef, useEffect } from 'react'
import SanStudio from 'studio'
import { Metric } from 'studio/metrics'
import { newWidget } from 'studio/stores/widgets'
import { studio as settingsStore } from 'studio/stores/studio'
import ChartWidget from 'studio/ChartWidget'
import {
  useGlobalsUpdater,
  useSettings,
  useWidgets,
  useStudioMetrics
} from './stores'
import Widget, { useWidgetsController } from './ChartWidget'
import Sidewidget from './Sidewidget'
import ProjectInfo from './ProjectInfo'
import Header from './Header'
import Sidebar from './Sidebar'
import Subwidgets, { useSubwidgetsController } from './Subwidgets'
import { useInsightsStoreCreator } from './Insights'
import 'webkit/styles/color.css'
import 'webkit/styles/text.css'
import 'webkit/styles/layout.css'
import 'webkit/styles/elements.css'
import styles from './index.module.scss'

const Studio = ({ defaultWidgets, defaultSidewidget }) => {
  const ref = useRef()
  const [studio, setStudio] = useState()
  const settings = useSettings()
  const widgets = useWidgets()
  const widgetsController = useWidgetsController()
  const subwidgetsController = useSubwidgetsController()
  const metrics = useStudioMetrics(studio)
  const InsightsStore = useInsightsStoreCreator()

  useGlobalsUpdater()
  useEffect(() => {
    const page = ref.current
    const studio = new SanStudio({
      target: page,
      props: {
        InsightsContextStore: InsightsStore,
        onSubwidget: subwidgetsController.onSubwidget,
        onWidget: widgetsController.onWidget,
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

  function onProjectSelect (project) {
    if (project) {
      const { slug, ticker, name } = project
      settingsStore.setProject({ slug, ticker, name })
    }
  }

  return (
    <div ref={ref} className={styles.wrapper}>
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

      {widgetsController.widgets.map(item => (
        <Widget key={item.widget.id} {...item} InsightsStore={InsightsStore} />
      ))}

      <Sidewidget studio={studio} project={settings} metrics={metrics} />

      <Subwidgets
        subwidgets={subwidgetsController.subwidgets}
        settings={settings}
      />
    </div>
  )
}

export default Studio
