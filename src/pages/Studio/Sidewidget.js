import React, { useState, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { SelectorNode } from 'studio/metrics/selector'
import { useStore, getSvelteContext } from './stores'
import SpentCoinCost from '../../ducks/Studio/AdvancedView/PriceHistogram'
import SocialContext from '../../ducks/Studio/AdvancedView/SocialContext'
import { MetricsExplanationContainer as MetricsExplanation } from '../../ducks/Studio/Chart/Sidepanel/MetricsExplanation'
import { METRICS_EXPLANATION_PANE } from '../../ducks/Studio/Chart/Sidepanel/panes'
import styles from './index.module.scss'

export const useSidewidgetStore = studio =>
  useMemo(() => getSvelteContext(studio, 'sidewidget'), [studio])

const useSidewidget = studio => useStore(useSidewidgetStore(studio))

const KeyToSidewidget = {
  [SelectorNode.spent_coin_cost.key]: SpentCoinCost,
  [METRICS_EXPLANATION_PANE]: MetricsExplanation,
  [SelectorNode.SOCIAL_CONTEXT.key]: SocialContext
}

const Sidewidget = ({ studio, project, metrics }) => {
  const sidewidget = useSidewidget(studio)
  const [state, setState] = useState()

  useEffect(
    () => {
      const Widget = sidewidget && KeyToSidewidget[sidewidget.key || sidewidget]
      if (!Widget) return setState()

      const target = document.querySelector('.studio-sidewidget')
      target.classList.add(styles.sidepanel)
      setState({
        Widget,
        target
      })
    },
    [sidewidget]
  )

  return state
    ? ReactDOM.createPortal(
      <state.Widget project={project} metrics={metrics} />,
      state.target
    )
    : null
}

export default Sidewidget
