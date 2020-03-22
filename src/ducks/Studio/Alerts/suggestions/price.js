import React from 'react'
import { createSuggestion } from './helpers'
import Value from '../Value'
import { PRICE_CHANGE_TYPES } from '../../../Signals/utils/constants'
import {
  buildPriceSignal,
  buildPricePercentUpDownSignal
} from '../../../Signals/utils/utils'
import { Metric } from '../../../dataHub/metrics'

const { formatter } = Metric.price_usd

const SIGNAL_BELOW = 'BELOW'
const SIGNAL_ABOVE = 'ABOVE'
const PRICE_IFS = ['drops below', 'rises above']

const suggestValueChange = ({ slug, value, lastValue, ...rest }) => {
  const isAboveLastPrice = value > lastValue
  const type =
    PRICE_CHANGE_TYPES[isAboveLastPrice ? SIGNAL_ABOVE : SIGNAL_BELOW]

  return createSuggestion(
    buildPriceSignal(slug, value, type),
    <>
      Price {PRICE_IFS[+isAboveLastPrice]} <Value>{formatter(value)}</Value>
    </>
  )
}

const suggestPercentUpDown = ({ slug }) =>
  createSuggestion(
    buildPricePercentUpDownSignal(slug),
    <>
      Price moves up or down by <Value>10%</Value>
    </>
  )

export const priceSuggesters = [suggestValueChange, suggestPercentUpDown]
