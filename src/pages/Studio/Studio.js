import React, { useState, useRef, useEffect } from 'react'
import SvelteStudio from 'studio'
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
import 'webkit/styles/color.css'
import 'webkit/styles/text.css'
import 'webkit/styles/layout.css'
import 'webkit/styles/elements.css'
import styles from './index.module.scss'
console.log(SvelteStudio)

const Studio = () => {
  const ref = useRef()
  const [studio, setStudio] = useState()
  const settings = useSettings()
  const widgets = useWidgets()
  const widgetsController = useWidgetsController()
  const subwidgetsController = useSubwidgetsController()
  const metrics = useStudioMetrics(studio)

  useGlobalsUpdater()
  useEffect(() => {
    const page = ref.current
    const studio = new SvelteStudio({
      target: page,
      props: {
        onSubwidget: subwidgetsController.onSubwidget,
        onWidget: widgetsController.onWidget,
        widgets: [
          newWidget(ChartWidget, {
            metrics: [Metric.price_usd]
          })
        ]
      }
    })

    console.log(studio)
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
        <Widget key={item.widget.id} {...item} />
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
