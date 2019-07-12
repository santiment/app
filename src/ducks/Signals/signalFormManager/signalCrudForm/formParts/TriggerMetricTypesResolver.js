import React from 'react'
import TriggerFormAssetWallet from './TriggerFormAssetWallet'
import TriggerFormTrendingWordsTypes from './TriggerFormTrendingWordsTypes'
import { TRENDING_WORDS } from '../../../utils/constants'

const TriggerMetricTypesResolver = ({
  isNew,
  address,
  values,
  metaFormSettings,
  setFieldValue
}) => {
  const { metric } = values

  const isTrendingWords = metric.value === TRENDING_WORDS

  const TypeComponent = isTrendingWords
    ? TriggerFormTrendingWordsTypes
    : TriggerFormAssetWallet

  return (
    <TypeComponent
      isNew={isNew}
      values={values}
      byAddress={address}
      metaFormSettings={metaFormSettings}
      setFieldValue={setFieldValue}
    />
  )
}

export default TriggerMetricTypesResolver
