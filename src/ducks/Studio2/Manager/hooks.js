import { useContext, useEffect } from 'react'
import { ManagerContext } from './context'

export function useWidgetDispatcher(widget) {
  const { dispatch } = useContext(ManagerContext)
  return (payload) => dispatch(widget, payload)
}

export function useWidgetEffect(widget, clb) {
  const { setWidgetEffect } = useContext(ManagerContext)

  setWidgetEffect(widget, clb)

  useEffect(() => () => setWidgetEffect(widget, undefined), [])
}
