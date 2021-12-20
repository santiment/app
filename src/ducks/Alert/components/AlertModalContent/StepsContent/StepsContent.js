import React from 'react'
import WatchlistAndScreenerSelector from './entities/WatchlistAndScreenerSelector/WatchlistAndScreenerSelector'
import AssetSelector from './entities/AssetsSelector/AssetSelector'
import MetricAndConditions from './MetricAndConditions/MetricAndConditions'
import NotificationAndPrivacy from './NotificationAndPrivacy/NotificationAndPrivacy'
import NameAndDescription from './NameAndDescription/NameAndDescription'

const StepsContent = ({ selectorSettings }) => {
  const { selectedType, selectedStep } = selectorSettings

  switch (selectedType.subSteps[selectedStep].label) {
    case 'Screener': {
      return (
        <WatchlistAndScreenerSelector
          type='screener'
          selectorSettings={selectorSettings}
        />
      )
    }
    case 'Watchlist': {
      return (
        <WatchlistAndScreenerSelector
          type='watchlist'
          selectorSettings={selectorSettings}
        />
      )
    }
    case 'Asset': {
      return <AssetSelector selectorSettings={selectorSettings} />
    }
    case 'Metric & Conditions': {
      return <MetricAndConditions selectorSettings={selectorSettings} />
    }
    case 'Notification & Privacy settings': {
      return <NotificationAndPrivacy selectorSettings={selectorSettings} />
    }
    case 'Name & Description': {
      return <NameAndDescription selectorSettings={selectorSettings} />
    }
    default:
      return <div />
  }
}

export default StepsContent
