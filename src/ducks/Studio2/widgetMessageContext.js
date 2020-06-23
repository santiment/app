import React, { useContext, useEffect, createContext } from 'react'

// NOTE: It's okay to have this map as a shared enitity for every Manager component,
//       since mapped widgets are not shared [@vanguard | Jun 17, 2020]
const WidgetWeakMap = new WeakMap()

const WidgetMessageEffectContext = createContext()
const WidgetMessageDispatchContext = createContext()

let renders = 0

function dispatch(widget, payload) {
  const effect = WidgetWeakMap.get(widget)
  if (effect) {
    effect(payload)
  }
}

function setWidgetEffect(widget, effect) {
  WidgetWeakMap.set(widget, effect)
}

export function WidgetMessageProvider({ children }) {
  console.log(++renders)

  return (
    <WidgetMessageEffectContext.Provider value={setWidgetEffect}>
      <WidgetMessageDispatchContext.Provider value={dispatch}>
        {children}
      </WidgetMessageDispatchContext.Provider>
    </WidgetMessageEffectContext.Provider>
  )
}

export function useWidgetMessageDispatcher() {
  const dispatch = useContext(WidgetMessageDispatchContext)
  return dispatch
}

export function useWidgetMessageEffect(widget, clb) {
  const setWidgetEffect = useContext(WidgetMessageEffectContext)

  setWidgetEffect(widget, clb)

  useEffect(() => () => WidgetWeakMap.delete(widget), [])
}
