import { useEffect } from 'react'

// NOTE: It's okay to have this map as a shared enitity for every Manager component,
//       since mapped widgets are not shared [@vanguard | Jun 17, 2020]
const WidgetWeakMap = new WeakMap()

export function dispatchWidgetMessage (widget, payload) {
  const effect = WidgetWeakMap.get(widget)
  if (effect) {
    effect(payload)
  }
}

export function useWidgetMessageEffect (widget, effect) {
  WidgetWeakMap.set(widget, effect)
  useEffect(() => () => WidgetWeakMap.delete(widget), [])
}
