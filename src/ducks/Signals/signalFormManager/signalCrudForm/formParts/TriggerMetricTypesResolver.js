import React from 'react'
import TriggerFormAssetWallet from './TriggerFormAssetWallet'
import TriggerFormTrendingWordsTypes from './TriggerFormTrendingWordsTypes'
import { TRENDING_WORDS } from '../../../utils/constants'

const TriggerMetricTypesResolver = ({
  address,
  values,
  metaFormSettings,
  setFieldValue
}) => {
  const { metric, target, type } = values

  const isTrendingWords = metric.value === TRENDING_WORDS

  const TypeComponent = isTrendingWords
    ? TriggerFormTrendingWordsTypes
    : TriggerFormAssetWallet

  return (
    <TypeComponent
      type={type}
      metric={metric}
      byAddress={address}
      target={target}
      metaFormSettings={metaFormSettings}
      setFieldValue={setFieldValue}
    />
  )
}

export default TriggerMetricTypesResolver
