import React from 'react'
import { ManagerContext } from './context'

// NOTE: It's okay to have this map as a shared enitity for every Manager component,
//       since mapped widgets are not shared [@vanguard | Jun 17, 2020]

const WidgetWeakMap = new WeakMap()

const Manager = ({ children }) => {
  function dispatch(widget, payload) {
    const effect = WidgetWeakMap.get(widget)
    if (effect) {
      effect(payload)
    }
  }

  function setWidgetEffect(widget, effect) {
    WidgetWeakMap.set(widget, effect)
  }

  return (
    <ManagerContext.Provider value={{ dispatch, setWidgetEffect }}>
      {children}
    </ManagerContext.Provider>
  )
}

export default Manager
