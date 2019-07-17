import React from 'react'
import TriggerFormAssetWallet from './TriggerFormAssetWallet'
import TriggerFormTrendingWordsTypes from './TriggerFormTrendingWordsTypes'
import { ETH_WALLET, TRENDING_WORDS } from '../../../utils/constants'
import TriggerFormHistoricalBalance from './TriggerFormHistoricalBalance'

const checkPossibleTarget = ({ metaFormSettings, setFieldValue, target }) => {
  if (Array.isArray(target)) {
    const { target: value } = metaFormSettings
    setFieldValue('target', target.length > 0 ? target[0] : value)
  }
}

const mapToComponents = {
  [TRENDING_WORDS]: TriggerFormTrendingWordsTypes,
  [ETH_WALLET]: TriggerFormHistoricalBalance
}

const TriggerMetricTypesResolver = ({
  address,
  values,
  values: { metric, target },
  metaFormSettings,
  setFieldValue
}) => {
  const TypeComponent = mapToComponents[metric.value] || TriggerFormAssetWallet

  if (metric.value !== TRENDING_WORDS) {
    checkPossibleTarget({ metaFormSettings, setFieldValue, target })
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
