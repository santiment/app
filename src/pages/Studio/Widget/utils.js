import React from 'react'
import ReactDOM from 'react-dom'
import { newWidget } from 'studio/stores/widgets'

export const newExternalWidget = (Widget, props) =>
  newWidget(Widget, {
    isExternal: true,
    scrollAlign: 'start',
    ...props
  })

export const withExternal = Component => ({target, ...props}) => {
  if (target) {
    target.classList.remove('widget')
    target.classList.remove('border')
  }

  return target ? ReactDOM.createPortal(<Component {...props} />, target) : null
}
