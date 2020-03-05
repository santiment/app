import React from 'react'
import { createSuggestion } from './helpers'
import Value from '../Value'
import { PRICE_CHANGE_TYPES } from '../../../Signals/utils/constants'
import { buildPriceSignal } from '../../../Signals/utils/utils'
import { Metrics } from '../../../SANCharts/data'

const { formatter } = Metrics.price_usd

const SIGNAL_BELOW = 'BELOW'
const SIGNAL_ABOVE = 'ABOVE'
const PRICE_IFS = ['drops below', 'raises above']

const suggestValueChange = ({ slug, price, lastPrice }) => {
  const isAboveLastPrice = price > lastPrice
  const type =
    PRICE_CHANGE_TYPES[isAboveLastPrice ? SIGNAL_ABOVE : SIGNAL_BELOW]

  return createSuggestion(
    buildPriceSignal(slug, price, type),
    <>
      Price {PRICE_IFS[+isAboveLastPrice]} <Value>{formatter(price)}</Value>
    </>
  )
}

const suggestPercentUpDown = () =>
  createSuggestion(
    {},
    <>
      Price moves up or down by <Value>10%</Value>
    </>
  )

export const priceSuggesters = [suggestValueChange, suggestPercentUpDown]
