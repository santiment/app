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

export const buildValueChangeSuggester = metric => {
  const { formatter = FORMATTER, label } = metric

  return ({ slug, asset = slug, value, lastValue, selector }) => {
    const isAbove = value > lastValue
    const type = PRICE_CHANGE_TYPES[isAbove ? SIGNAL_ABOVE : SIGNAL_BELOW]

    return createSuggestion(
      buildValueChangeSignal(asset, roundNumber(value), type, metric, selector),
      <>
        {label} {VALUE_IFS[+isAbove]} <Value>{formatter(value)}</Value>
      </>
    )
  }
}

export const buildPercentUpSuggester = metric => {
  const { label } = metric

  return ({ slug, asset = slug, selector }) =>
    createSuggestion(
      buildPercentUpDownSignal(asset, metric, selector),
      <>
        {label} moves up or down by <Value>10%</Value>
      </>
    )
}
