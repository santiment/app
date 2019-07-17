import React from 'react'
import TriggerFormAssetWallet from './TriggerFormAssetWallet'
import TriggerFormTrendingWordsTypes from './TriggerFormTrendingWordsTypes'
import { ETH_WALLET, TRENDING_WORDS } from '../../../utils/constants'
import TriggerFormHistoricalBalance from './TriggerFormHistoricalBalance'

const mapToComponents = {
  [TRENDING_WORDS]: TriggerFormTrendingWordsTypes,
  [ETH_WALLET]: TriggerFormHistoricalBalance
}

const TriggerMetricTypesResolver = ({
  address,
  values,
  values: { metric },
  metaFormSettings,
  setFieldValue
}) => {
  const TypeComponent = mapToComponents[metric.value] || TriggerFormAssetWallet

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
