import React from 'react'
import cx from 'classnames'
import { AutoSizer, List } from 'react-virtualized'
import { Label } from '@santiment-network/ui'
import PageLoader from '../../components/Loader/PageLoader'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import GetAssets, { SORT_TYPES } from './GetAssets'
import AssetCard from './AssetCard'
import { getTableTitle } from './utils'
import styles from './AssetsMobilePage.module.scss'

const AssetsMobilePage = props => {
  return (
    <div className={cx('page', styles.wrapper)}>
      <MobileHeader title={getTableTitle(props)} backRoute='/assets' />
      <div className={styles.headings}>
        <Label accent='casper'>Coin</Label>
        <Label accent='casper'>Price, 24h</Label>
      </div>
      <GetAssets
        {...props}
        sortBy={SORT_TYPES.marketcap}
        type={props.type}
        render={Assets => {
          return Assets.isLoading ? <PageLoader /> : <AssetsList {...Assets} />
        }}
      />
    </div>
  )
}

const ROW_HEIGHT = 71

const AssetsList = ({ items }) => {
  const rowRenderer = ({ key, index, style, ...props }) => {
    const asset = items[index]
    return (
      <div key={key} style={style}>
        <AssetCard {...asset} />
      </div>
    )
  }

  return (
    <div className={styles.wrapperList}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowHeight={ROW_HEIGHT}
            rowCount={items.length}
            overscanRowCount={5}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </div>
  )
}

export default AssetsMobilePage
