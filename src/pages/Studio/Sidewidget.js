import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { SelectorNode } from 'studio/metrics/selector'
import { useStore, getSvelteContext } from './stores'
import SpentCoinCost from '../../ducks/Studio/AdvancedView/PriceHistogram'

function useSidewidget (studio) {
  return useStore(getSvelteContext(studio, 'sidewidget'))
}

const KeyToSidewidget = {
  [SelectorNode.spent_coin_cost.key]: SpentCoinCost
}

const Sidewidget = ({ studio, project }) => {
  const sidewidget = useSidewidget(studio)
  const [state, setState] = useState()

  useEffect(
    () => {
      const Widget = sidewidget && KeyToSidewidget[sidewidget.key]
      setState(
        Widget && {
          Widget,
          target: document.querySelector('.studio-sidewidget')
        }
      )
    },
    [sidewidget]
  )

  return state
    ? ReactDOM.createPortal(<state.Widget project={project} />, state.target)
    : null
}

export default Sidewidget
