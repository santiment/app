import React from 'react'
import { ProjectsMapWrapper } from '../../../ducks/Watchlists/Widgets/VolumeChart/ProjectsTreeMap'
import {
  PRICE_CHANGE_RANGES,
  SOCIAL_VOLUME_CHANGE_RANGES
} from '../../../ducks/Watchlists/Widgets/VolumeChart/utils'
import MakeProSubscriptionCard from '../../feed/GeneralFeed/MakeProSubscriptionCard/MakeProSubscriptionCard'
import ProjectsChart from '../../../ducks/Watchlists/Widgets/VolumeChart/ProjectsChart'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import { useScreenerUrlUpdaters } from '../../../ducks/Watchlists/utils'
import WatchlistPriceWidget from '../WatchlistPriceWidget/WatchlistPriceWidget'
import styles from './index.module.scss'

const Infographics = ({
  widgets,
  setWidgets,
  assets,
  trendingAssets,
  filterType,
  toggleAssetsFiltering,
  listId,
  type = 'Screener'
}) => {
  const {
    isPriceChartActive,
    isMovement,
    isPriceTreeMap,
    isVolumeTreeMap
  } = widgets
  const { priceTreeMap, socialVolumeTreeMap, priceBarChart } = widgets

  const { isPro } = useUserSubscriptionStatus()

  const { onChangeSorter, onChangeInterval } = useScreenerUrlUpdaters(
    widgets,
    setWidgets
  )

  return (
    <>
      {isPriceTreeMap && (
        <div className={styles.treeMaps}>
          <ProjectsMapWrapper
            className={styles.containerTreeMap}
            assets={assets}
            title='Price Changes'
            ranges={PRICE_CHANGE_RANGES}
            settings={priceTreeMap}
            onChangeInterval={value => onChangeInterval('priceTreeMap', value)}
          />
        </div>
      )}
      {isVolumeTreeMap && (
        <div className={styles.treeMaps}>
          {isPro ? (
            <ProjectsMapWrapper
              className={styles.containerTreeMap}
              assets={assets}
              title='Social Volume Changes'
              ranges={SOCIAL_VOLUME_CHANGE_RANGES}
              isSocialVolume={true}
              settings={socialVolumeTreeMap}
              onChangeInterval={value =>
                onChangeInterval('socialVolumeTreeMap', value)
              }
            />
          ) : (
            <MakeProSubscriptionCard />
          )}
        </div>
      )}
      {isPriceChartActive && (
        <ProjectsChart
          assets={assets}
          settings={priceBarChart}
          onChangeInterval={value => onChangeInterval('priceBarChart', value)}
          onChangeSorter={value => onChangeSorter('priceBarChart', value)}
        />
      )}

      {isMovement && (
        <WatchlistPriceWidget
          type={type}
          listId={listId}
          items={assets}
          trendingAssets={trendingAssets}
          filterType={filterType}
          toggleAssetsFiltering={toggleAssetsFiltering}
        />
      )}
    </>
  )
}

export default Infographics
