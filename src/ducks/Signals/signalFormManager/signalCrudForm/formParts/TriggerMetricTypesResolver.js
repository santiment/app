import React from 'react'
import TriggerFormAssetWallet from './TriggerFormAssetWallet'
import TriggerFormTrendingWordsTypes from './TriggerFormTrendingWordsTypes'
import { ETH_WALLET, TRENDING_WORDS } from '../../../utils/constants'
import TriggerFormHistoricalBalance from './TriggerFormHistoricalBalance'

const TriggerMetricTypesResolver = ({
  address,
  values,
  metaFormSettings,
  setFieldValue
}) => {
  const { metric, target } = values

  let TypeComponent

  let checkPossibleTarget = () => {
    if (Array.isArray(target)) {
      setFieldValue(
        'target',
        target.length > 0 ? target[0] : metaFormSettings.target.value
      )
    }
  }

  switch (metric.value) {
    case TRENDING_WORDS: {
      TypeComponent = TriggerFormTrendingWordsTypes
      break
    }
    case ETH_WALLET: {
      checkPossibleTarget()
      TypeComponent = TriggerFormHistoricalBalance
      break
    }
    default: {
      checkPossibleTarget()
      TypeComponent = TriggerFormAssetWallet
      break
    }
  }

  return (
    <TypeComponent
      values={values}
      byAddress={address}
      metaFormSettings={metaFormSettings}
      setFieldValue={setFieldValue}
    />
  )
}

export default TriggerMetricTypesResolver
