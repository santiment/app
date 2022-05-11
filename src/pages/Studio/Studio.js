import React, { useState, useRef, useEffect, useMemo } from 'react'
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
  useWidgets,
} from './stores'
import LoginCTA from './LoginCTA'
import { getExternalWidget } from './Widget'
import ProjectInfo from './ProjectInfo'
import Sidebar from './Sidebar'
import { useSubwidgetsController } from './Subwidgets'
import { useInsightsStoreCreator } from './Insights'
import { useSidewidget } from './Sidewidget'
import StudioTab from './Tabs/Studio'
import KeyStatsTab from './Tabs/KeyStats'
import InsightsTab from './Tabs/Insights'
import { shareWidgets } from './sharing/share'
import { parseTemplate } from './sharing/template'
import { useRedrawer } from '../../hooks'
import { SAN_HEADER_HEIGHT } from '../../constants'
import { Tab } from '../../ducks/Studio/Tabs'
import {
  notifyAnonCreation,
  notifyCreation,
  notifySave,
} from '../../ducks/Studio/Template/notifications'
import styles from './index.module.scss'

window.notifyLayoutSave = notifySave
window.notifyLayoutEdit = notifySave
window.notifyLayoutCreation = notifyCreation
window.notifyLayoutAnonCreation = notifyAnonCreation

function getScreen() {
  const { pathname } = window.location

  let screen
  if (pathname.includes(Tab.stats.path)) screen = Tab.stats.path
  if (pathname.includes(Tab.insights.path)) screen = Tab.insights.path
  return screen
}

const getToday = () => new Date()
const Studio = ({
  slug,
  address,
  defaultSettings,
  defaultWidgets,
  defaultSidewidget,
  pathname,
  Extensions,
  ...props
}) => {
  const ref = useRef()
  const setWidgetsRef = useRef()
  const isMapviewDisabledRef = useRef()
  const selectMetricRef = useRef()
  const onSidebarProjectMountRef = useRef()
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
  const [modDate, setModDate] = useState(getToday)
  const [isLoginCTAOpened, setIsLoginCTAOpened] = useState(false)

  useMemo(() => (address || slug) && settingsStore.setProject({ slug, address }), [slug, address])

  const onChartPointClick = (point, e) => setModDate(new Date(point.value))

  useGlobalsUpdater()
  useEffect(() => {
    const page = ref.current
    const studio = new SanStudio({
      target: page,
      props: {
        getExternalWidget,
        defaultSettings,
        onModRangeSelect,
        onChartPointClick,
        parseLayoutWidgets: parseTemplate,
        shareLayoutWidgets: shareWidgets,
        onAnonFavoriteClick: () => setIsLoginCTAOpened(true),
        onWidget: () => redraw(),
        onWidgetInit: () => setWidgetsRef.current((widgets) => widgets.slice()),
        onSubwidget: subwidgetsController.onSubwidget,
        onScreenMount: setMountedScreen,
        onSidebarProjectMount: (node) => onSidebarProjectMountRef.current(node),
        checkIsMapviewDisabled: () => isMapviewDisabledRef.current,
        adjustSelectedMetric: onMetricSelect,
        InsightsContextStore: InsightsStore,
        headerPadding: SAN_HEADER_HEIGHT + 65,
        screen: getScreen(),
        sidewidget: defaultSidewidget,
        widgets: defaultWidgets || [
          newWidget(ChartWidget, {
            metrics: [Metric.price_usd],
          }),
        ],
      },
    })

    setStudio(studio)
    return () => studio.$destroy()
  }, [])

  useEffect(() => {
    if (!studio) return

    const screen = getScreen()

    isMapviewDisabledRef.current = !!screen
    studio.$$set({ screen })
  }, [studio, pathname])

  useEffect(() => {
    if (defaultSettings) settingsStore.setProject(defaultSettings)
    if (studio && defaultWidgets) widgetsStore.set(defaultWidgets)
  }, [studio, defaultSettings, defaultWidgets])

  function onModRangeSelect(start, end, e) {
    setModRange([new Date(start.value), new Date(end.value)])
  }

  function onMetricSelect(node) {
    if (selectMetricRef.current) return selectMetricRef.current(node)
    return node
  }

  return (
    <div ref={ref} className={styles.wrapper}>
      {studio && (
        <>
          <ProjectInfo studio={studio} settings={settings} />
        </>
      )}

      <Sidebar
        studio={studio}
        settings={settings}
        widgets={widgets}
        selectMetricRef={selectMetricRef}
        onSidebarProjectMountRef={onSidebarProjectMountRef}
      />

      {studio && (
        <Switch>
          <Route path='/:base/related-insights'>
            {mountedScreen === Tab.insights.path && <InsightsTab settings={settings} />}
          </Route>
          <Route path='/:base/stats'>
            {mountedScreen === Tab.stats.path && <KeyStatsTab settings={settings} />}
          </Route>
          <Route>
            {!mountedScreen && (
              <StudioTab
                studio={studio}
                settings={settings}
                widgets={widgets}
                metrics={metrics}
                sidewidget={sidewidget}
                modDate={modDate}
                modRange={modRange}
                prevFullUrlRef={props.prevFullUrlRef}
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

      <LoginCTA isLoginCTAOpened={isLoginCTAOpened} setIsLoginCTAOpened={setIsLoginCTAOpened} />
    </div>
  )
}

export default Studio
