import React from 'react'
import TriggerFormAssetWallet from './TriggerFormAssetWallet'

const TriggerMetricTypesResolver = ({
  isTrendingWords,
  metric,
  target,
  metaFormSettings,
  setFieldValue
}) => {
  const TypeComponent = isTrendingWords
    ? TriggerFormAssetWallet
    : TriggerFormAssetWallet

  return (
    <TypeComponent
      metric={metric}
      target={target}
      metaFormSettings={metaFormSettings}
      setFieldValue={setFieldValue}
    />
  )
}

export default TriggerMetricTypesResolver
