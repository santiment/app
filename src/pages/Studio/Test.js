import React, { useState, useRef, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { get } from 'svelte/store'
import Studio from 'studio'
import { Metric } from 'studio/metrics'
import { newWidget } from 'studio/stores/widgets'
import { globals } from 'studio/stores/globals'
import { mapview as mapviewStore } from 'studio/stores/mapview'
import { studio as settingsStore } from 'studio/stores/studio'
import ChartWidget from 'studio/ChartWidget'
import HolderDistributionWidget from 'studio/HolderDistributionWidget'
import 'webkit/styles/color.css'
import 'webkit/styles/text.css'
import 'webkit/styles/layout.css'
import 'webkit/styles/elements.css'

import { useStore, getSvelteContext } from './stores'
import { useTheme } from '../../stores/ui/theme'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import { Header } from '../../ducks/Studio/Header'
import ProjectSelector from '../../ducks/Studio/Sidebar/ProjectSelector'
import TopTransactionsTable from '../../ducks/Studio/Widget/TopTransactionsTable'
import StudioInfo from '../../ducks/SANCharts/Header'
import styles from './index.module.scss'
import Widget, { useWidgets } from './ChartWidget'
import Sidewidget from './Sidewidget'
import ProjectInfo from './ProjectInfo'
import Sidebar from './Sidebar'

const settingsImmute = store => Object.assign({}, store)
const Test = ({ ...props }) => {
  const ref = useRef()
  const [studio, setStudio] = useState()
  const [headerNode, setHeaderNode] = useState()
  const [subwidgets, setSubwidgets] = useState([])
  const theme = useTheme()
  const userInfo = useUserSubscriptionStatus()
  const settings = useStore(settingsStore, settingsImmute)
  const mapview = useStore(mapviewStore)
  const widgets = useStore(getSvelteContext(studio, 'widgets')) || []
  const widgetsController = useWidgets()
  const [svelteStudio, setSvelteStudio] = useState()

  useEffect(() => {
    const page = ref.current
    const studio = new Studio({
      target: page,
      props: {
        onSubwidget,
        onWidget: widgetsController.onWidget,
        widgets: [
          newWidget(ChartWidget, {
            metrics: [Metric.price_usd]
          }),
          newWidget(HolderDistributionWidget, {})
        ]
      }
    })

    setStudio(studio)
    setHeaderNode(page.querySelector('.header'))

    function onSubwidget (target, subwidget, parentWidget) {
      const widget = TopTransactionsTable.new({ parentWidget })
      const Render = props =>
        ReactDOM.createPortal(
          <widget.Widget
            {...props}
            widget={widget}
            deleteWidget={deleteWidget}
            rerenderWidgets={() => {}}
          />,
          target
        )
      setSubwidgets([Render])

      const filter = subwidget => subwidget !== Render
      function deleteWidget () {
        setSubwidgets(subwidgets => subwidgets.filter(filter))
      }
      return deleteWidget
    }

    return () => studio.$destroy()
  }, [])

  useEffect(
    () => {
      globals.toggle('isNightMode', theme.isNightMode)
      globals.toggle('isLoggedIn', userInfo.isLoggedIn)
      globals.toggle('isPro', userInfo.isPro)
      globals.toggle('isProPlus', userInfo.isProPlus)
    },
    [userInfo, theme]
  )

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

      <Sidebar
        studio={studio}
        settings={settings}
        onProjectSelect={onProjectSelect}
      />

      {headerNode &&
        ReactDOM.createPortal(
          <Header
            settings={settings}
            widgets={widgets}
            metrics={[]}
            headerRef={{ current: headerNode }}
            isOverviewOpened={mapview > 0}
            changeTimePeriod={settingsStore.setPeriod}
            toggleOverview={mapviewStore.toggle}
          />,
          headerNode
        )}

      {widgetsController.widgets.map(item => (
        <Widget key={item.widget.id} {...item} />
      ))}

      <Sidewidget studio={studio} project={settings} />

      {subwidgets.map((Subwidget, i) => (
        <Subwidget key={i} settings={settings} />
      ))}
    </div>
  )
}

export default Test
