import React from 'react'
import { FORMATTER } from 'studio/metrics/formatters'
import { PRICE_CHANGE_TYPES } from '../../../Signals/utils/constants'
import {
  buildPercentUpDownSignal,
  buildValueChangeSignal
} from '../../../Signals/utils/utils'
import Value from '../Value'
import { roundNumber } from '../../../../utils/formatting'

export const SIGNAL_BELOW = 'BELOW'
export const SIGNAL_ABOVE = 'ABOVE'
export const VALUE_IFS = ['drops below', 'rises above']

export const createSuggestion = (alert, render) => ({ alert, render })

const defaultTransformer = data => data
export const buildValueChangeSuggester = (
  metric,
  transformer = defaultTransformer
) => {
  const { formatter = FORMATTER, label } = metric

  return alert => {
    const { value, lastValue } = alert
    const isAbove = value > lastValue
    const type = PRICE_CHANGE_TYPES[isAbove ? SIGNAL_ABOVE : SIGNAL_BELOW]
    const { slug, selector } = transformer(alert)

    return createSuggestion(
      buildValueChangeSignal(slug, roundNumber(value), type, metric, selector),
      <>
        {label} {VALUE_IFS[+isAbove]} <Value>{formatter(value)}</Value>
      </>
    )
  }
}

export const buildPercentUpSuggester = (
  metric,
  transformer = defaultTransformer
) => {
  const { label } = metric

  return alert => {
    const { slug, selector } = transformer(alert)

    return createSuggestion(
      buildPercentUpDownSignal(slug, metric, selector),
      <>
        {label} moves up or down by <Value>10%</Value>
      </>
    )
  }
}
