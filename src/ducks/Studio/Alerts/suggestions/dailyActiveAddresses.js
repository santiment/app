import React from 'react'
import { createSuggestion } from './helpers'
import Value from '../Value'
import { PRICE_CHANGE_TYPES } from '../../../Signals/utils/constants'
import { buildDAASignal, buildDAAPercentUpDownSignal } from '../../../Signals/utils/utils'
import { Metric } from '../../../dataHub/metrics'

const { formatter } = Metric.daily_active_addresses

const SIGNAL_BELOW = 'BELOW'
const SIGNAL_ABOVE = 'ABOVE'
const IFS = ['goes below', 'goes above']

const suggestValueChange = ({ slug, value, lastValue }) => {
  const isAboveLastPrice = value > lastValue
  const type = PRICE_CHANGE_TYPES[isAboveLastPrice ? SIGNAL_ABOVE : SIGNAL_BELOW]
  const intValue = parseInt(value, 10)

  return createSuggestion(
    buildDAASignal(slug, intValue, type),
    <>
      Addresses count {IFS[+isAboveLastPrice]} <Value>{formatter(intValue)}</Value>
    </>,
  )
}

const suggestPercentUp = ({ slug }) =>
  createSuggestion(
    buildDAAPercentUpDownSignal(slug),
    <>
      Daily active addresses count goes up by <Value>10%</Value>
    </>,
  )

export const dailyActiveAddressesSuggesters = [suggestValueChange, suggestPercentUp]
