import React from 'react'
import TriggerFormAssetWallet from './TriggerFormAssetWallet'
import TriggerFormTrendingWordsTypes from './TriggerFormTrendingWordsTypes'

const TriggerMetricTypesResolver = ({
  isTrendingWords,
  address,
  metric,
  target,
  metaFormSettings,
  setFieldValue
}) => {
  const TypeComponent = isTrendingWords
    ? TriggerFormTrendingWordsTypes
    : TriggerFormAssetWallet

  return (
    <TypeComponent
      metric={metric}
      byAddress={address}
      target={target}
      metaFormSettings={metaFormSettings}
      setFieldValue={setFieldValue}
    />
  )
}

export default TriggerMetricTypesResolver
