import React from 'react'
import { createSuggestion } from './helpers'
import Value from '../Value'
import { PRICE_CHANGE_TYPES } from '../../../Signals/utils/constants'
import {
  buildDAASignal,
  builDAAPercentUpDownSignal
} from '../../../Signals/utils/utils'
import { Metrics } from '../../../SANCharts/data'

const { formatter } = Metrics.daily_active_addresses

const SIGNAL_BELOW = 'BELOW'
const SIGNAL_ABOVE = 'ABOVE'
const IFS = ['goes below', 'goes above']

const suggestValueChange = ({ slug, price, lastPrice }) => {
  const lastValue = 875533
  const value = 678222

  const isAboveLastPrice = value > lastValue
  const type =
    PRICE_CHANGE_TYPES[isAboveLastPrice ? SIGNAL_ABOVE : SIGNAL_BELOW]

  return createSuggestion(
    buildDAASignal(slug, price, type),
    <>
      Addresses count {IFS[+isAboveLastPrice]} <Value>{formatter(value)}</Value>
    </>
  )
}

const suggestPercentUp = ({ slug }) =>
  createSuggestion(
    builDAAPercentUpDownSignal(slug),
    <>
      Daily active addresses count goes up by <Value>10%</Value>
    </>
  )

export const dailyActiveAddressesSuggesters = [
  suggestValueChange,
  suggestPercentUp
]
