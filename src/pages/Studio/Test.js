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

import { useTheme } from '../../stores/ui/theme'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import { Header } from '../../ducks/Studio/Header'
import ProjectSelector from '../../ducks/Studio/Sidebar/ProjectSelector'
import SpentCoinCost from '../../ducks/Studio/AdvancedView/PriceHistogram'
import TopTransactionsTable from '../../ducks/Studio/Widget/TopTransactionsTable'
import StudioInfo from '../../ducks/SANCharts/Header'
import styles from './index.module.scss'
import Widget, { useWidgets } from './ChartWidget'

const getContextStore = (cmp, ctx) => cmp && cmp.$$.context.get(ctx)
function useStore (store, immute = _ => _) {
  const [state, setState] = useState(() => store && get(store))
  useEffect(
    () =>
      store &&
      store.subscribe(value => {
        setState(immute(value))
      }),
    [store]
  )
  return state
}

const KeyToSidewidget = {
  /* [SelectorNode.spent_coin_cost]: SpentCoinCost, */
  spent_coin_cost: SpentCoinCost
}
const Sidewidget = ({ studio, project }) => {
  const sidewidget = useStore(getContextStore(studio, 'sidewidget')) || null
  const [[Widget, node], setState] = useState([])

  useEffect(
    () => {
      const widget = sidewidget && KeyToSidewidget[sidewidget.key]
      setState(
        widget ? [widget, document.querySelector('.studio-sidewidget')] : []
      )
    },
    [sidewidget]
  )

  return Widget
    ? ReactDOM.createPortal(<Widget project={project} />, node)
    : null
}

const ProjectInfo = ({ node, settings, onProjectSelect }) => {
  if (node) {
    node.classList.add(styles.project)
  }
  return (
    <>
      {node &&
        ReactDOM.createPortal(
          <StudioInfo slug={settings.slug} onSlugSelect={onProjectSelect} />,
          node
        )}
    </>
  )
}

const settingsImmute = store => Object.assign({}, store)
const Test = ({ ...props }) => {
  const ref = useRef()
  const [studio, setStudio] = useState()
  const [projectSelectorNode, setProjectSelectorNode] = useState()
  const [headerNode, setHeaderNode] = useState()
  const [topNode, setTopNode] = useState()
  const [subwidgets, setSubwidgets] = useState([])
  const theme = useTheme()
  const userInfo = useUserSubscriptionStatus()
  const settings = useStore(settingsStore, settingsImmute)
  const mapview = useStore(mapviewStore)
  const widgets = useStore(getContextStore(studio, 'widgets')) || []
  const widgetsController = useWidgets()

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
    setProjectSelectorNode(page.querySelector('.sidebar-project'))
    setHeaderNode(page.querySelector('.header'))
    setTopNode(page.querySelector('.studio-top'))

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
        settings={settings}
        node={topNode}
        onProjectSelect={onProjectSelect}
      />

      {projectSelectorNode &&
        ReactDOM.createPortal(
          <ProjectSelector
            project={settings}
            onProjectSelect={onProjectSelect}
          />,
          projectSelectorNode
        )}

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
