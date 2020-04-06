import React from 'react'
import { createSuggestion } from './helpers'
import Value from '../Value'
import { PRICE_CHANGE_TYPES } from '../../../Signals/utils/constants'
import {
  buildValueChangeSignal,
  buildPercentUpDownSignal
} from '../../../Signals/utils/utils'
import { Metric } from '../../../dataHub/metrics'

export const SIGNAL_BELOW = 'BELOW'
export const SIGNAL_ABOVE = 'ABOVE'
export const VALUE_IFS = ['drops below', 'rises above']

export const suggestValueChange = metric => {
  const { formatter, label } = metric

  return ({ slug, value, lastValue, ...rest }) => {
    const isAbove = value > lastValue
    const type = PRICE_CHANGE_TYPES[isAbove ? SIGNAL_ABOVE : SIGNAL_BELOW]

    return createSuggestion(
      buildValueChangeSignal(slug, value, type, metric),
      <>
        {label} {VALUE_IFS[+isAbove]} <Value>{formatter(value)}</Value>
      </>
    )
  }
}

export const suggestPercentUpDown = metric => {
  const { label } = metric

  return ({ slug }) =>
    createSuggestion(
      buildPercentUpDownSignal(slug, metric),
      <>
        {label} moves up or down by <Value>10%</Value>
      </>
    )
}
export const priceSuggesters = [
  suggestValueChange(Metric.price_usd),
  suggestPercentUpDown(Metric.price_usd)
]
