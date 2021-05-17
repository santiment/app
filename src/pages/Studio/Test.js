import React, { useState, useRef, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { get } from 'svelte/store'
import Studio from 'san-studio'
import { Metric } from 'san-studio/metrics'
import { newWidget } from 'san-studio/stores/widgets'
import { globals } from 'san-studio/stores/globals'
import { mapview } from 'san-studio/stores/mapview'
import { studio as settingsStore } from 'san-studio/stores/studio'
import ChartWidget from 'san-studio/ChartWidget'
import HolderDistributionWidget from 'san-studio/HolderDistributionWidget'
import 'webkit/styles/main.css'

import { useTheme } from '../../stores/ui/theme'
import { useUserSubscriptionStatus } from '../../stores/user/subscriptions'
import { Header } from '../../ducks/Studio/Header'
import ProjectSelector from '../../ducks/Studio/Sidebar/ProjectSelector'
import SpentCoinCost from '../../ducks/Studio/AdvancedView/PriceHistogram'

const getContextStore = (cmp, ctx) => cmp && cmp.$$.context.get(ctx)
function useStore(store) {
  const [state, setState] = useState(() => store && get(store))
  useEffect(() => store && store.subscribe(setState), [store])
  return state
}

const KeyToSidewidget = {
  /* [SelectorNode.spent_coin_cost]: SpentCoinCost, */
  spent_coin_cost: SpentCoinCost,
}
const Sidewidget = ({ studio, project }) => {
  const sidewidget = useStore(getContextStore(studio, 'sidewidget')) || null
  const [[Widget, node], setState] = useState([])

  useEffect(
    () => {
      const widget = sidewidget && KeyToSidewidget[sidewidget.key]
      setState(
        widget ? [widget, document.querySelector('.studio-sidewidget')] : [],
      )
    },
    [sidewidget],
  )

  return Widget
    ? ReactDOM.createPortal(<Widget project={project} />, node)
    : null
}

const Test = ({ ...props }) => {
  const ref = useRef()
  const [studio, setStudio] = useState()
  const [projectSelectorNode, setProjectSelectorNode] = useState()
  const [headerNode, setHeaderNode] = useState()
  const theme = useTheme()
  const userInfo = useUserSubscriptionStatus()
  const settings = useStore(settingsStore)
  const widgets = useStore(getContextStore(studio, 'widgets')) || []

  useEffect(() => {
    const page = ref.current
    const studio = new Studio({
      target: page,
      props: {
        widgets: [
          newWidget(ChartWidget, {
            metrics: [Metric.price_usd],
          }),
          newWidget(HolderDistributionWidget, {}),
        ],
      },
    })

    setStudio(studio)
    setProjectSelectorNode(page.querySelector('.sidebar-project'))
    setHeaderNode(page.querySelector('.header'))

    return () => studio.$destroy()
  }, [])

  useEffect(
    () => {
      globals.toggle('isNightMode', theme.isNightMode)
      globals.toggle('isPro', userInfo.isPro)
      globals.toggle('isProPlus', userInfo.isProPlus)
    },
    [userInfo, theme],
  )

  return (
    <div ref={ref}>
      {projectSelectorNode &&
        ReactDOM.createPortal(
          <ProjectSelector project={settings} />,
          projectSelectorNode,
        )}

      {headerNode &&
        ReactDOM.createPortal(
          <Header
            settings={settings}
            widgets={widgets}
            metrics={[]}
            headerRef={{ current: headerNode }}
            toggleOverview={mapview.toggle}
          />,
          headerNode,
        )}
      <Sidewidget studio={studio} project={settings} />
    </div>
  )
}

export default Test
