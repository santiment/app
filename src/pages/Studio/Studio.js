import React, { useState, useRef, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
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
import { getExternalWidget } from './Widget'
import ProjectInfo from './ProjectInfo'
import Sidebar from './Sidebar'
import { useSubwidgetsController } from './Subwidgets'
import { useInsightsStoreCreator } from './Insights'
import { useSidewidget } from './Sidewidget'
import StudioTab from './Tabs/Studio'
import KeyStatsTab from './Tabs/KeyStats'
import InsightsTab from './Tabs/Insights'
import { useRedrawer } from '../../hooks'
import { Tab } from '../../ducks/Studio/Tabs'
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
  pathname,
  Extensions,
  ...props
}) => {
  const ref = useRef()
  const setWidgetsRef = useRef()
  const [studio, setStudio] = useState()
  const settings = useSettings()
  const widgetsStore = useWidgetsStore(studio)
  const widgets = useWidgets(studio, setWidgetsRef)
  const sidewidget = useSidewidget(studio)
  const subwidgetsController = useSubwidgetsController()
  const metrics = useStudioMetrics(studio)
  const InsightsStore = useInsightsStoreCreator()
  const redraw = useRedrawer()[1]
  const [mountedScreen, setMountedScreen] = useState()
  const [modRange, setModRange] = useState()

  useEffect(
    () => {
      if (!studio) return

      let screen
      if (pathname.includes(Tab.stats.path)) screen = Tab.stats.path
      if (pathname.includes(Tab.insights.path)) screen = Tab.insights.path

      studio.$$set({ screen })
    },
    [studio, pathname]
  )

  useGlobalsUpdater()
  useEffect(() => {
    const page = ref.current
    const studio = new SanStudio({
      target: page,
      props: {
        getExternalWidget,
        defaultSettings,
        onModRangeSelect,
        onWidget: () => redraw(),
        onWidgetInit: () => setWidgetsRef.current(widgets => widgets.slice()),
        onSubwidget: subwidgetsController.onSubwidget,
        onScreenMount: setMountedScreen,
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

  function onModRangeSelect (start, end, e) {
    setModRange([new Date(start.value), new Date(end.value)])
  }

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
          <Sidebar
            studio={studio}
            settings={settings}
            onProjectSelect={onProjectSelect}
          />
        </>
      )}

      {studio && (
        <Switch>
          <Route path='/:base/related-insights'>
            {mountedScreen === Tab.insights.path && (
              <InsightsTab settings={settings} />
            )}
          </Route>
          <Route path='/:base/stats'>
            {mountedScreen === Tab.stats.path && (
              <KeyStatsTab settings={settings} />
            )}
          </Route>
          <Route>
            {!mountedScreen && (
              <StudioTab
                studio={studio}
                settings={settings}
                widgets={widgets}
                metrics={metrics}
                sidewidget={sidewidget}
                modRange={modRange}
                InsightsStore={InsightsStore}
                subwidgetsController={subwidgetsController}
              />
            )}
          </Route>
        </Switch>
      )}

      <Extensions
        {...props}
        widgets={widgets}
        sidewidget={sidewidget}
        subwidgets={subwidgetsController.subwidgets}
        settings={settings}
      />
    </div>
  )
}

export default Studio
