import React from 'react'
import cx from 'classnames'
import { AutoSizer, List } from 'react-virtualized'
import { Button, Label } from '@santiment-network/ui'
import PageLoader from '../../components/Loader/PageLoader'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import GetAssets, { SORT_TYPES } from './GetAssets'
import AssetCard from './AssetCard'
import { getTableTitle } from './utils'
import EmptySection from '../../components/EmptySection/EmptySection'
import WatchlistEdit from '../../components/WatchlistEdit/WatchlistEdit'
import styles from './AssetsMobilePage.module.scss'

const AssetsMobilePage = props => {
  return (
    <div className={cx('page', styles.wrapper)}>
      <MobileHeader title={getTableTitle(props)} backRoute='/assets' />
      <GetAssets
        {...props}
        sortBy={SORT_TYPES.marketcap}
        type={props.type}
        render={Assets => {
          return Assets.isLoading ? (
            <PageLoader />
          ) : (
            <>
              {Assets.items.length > 0 && (
                <>
                  <div className={styles.headings}>
                    <Label accent='casper'>Coin</Label>
                    <Label accent='casper'>Price, 24h</Label>
                  </div>
                  <AssetsList {...Assets} />
                </>
              )}
              {Assets.items.length === 0 && Assets.isCurrentUserTheAuthor && (
                <div className={styles.emptyWrapper}>
                  <EmptySection imgClassName={styles.emptyImg}>
                    <Label accent='mirage' className={styles.emptyText}>
                      Start to add assets you want to track or just interested
                      in
                    </Label>
                    <WatchlistEdit
                      name={getTableTitle(props)}
                      id={Assets.typeInfo.listId}
                      assets={Assets.items}
                      trigger={
                        <Button
                          accent='positive'
                          variant='fill'
                          className={styles.emptyBtn}
                        >
                          Add assets
                        </Button>
                      }
                    />
                  </EmptySection>
                </div>
              )}
            </>
          )
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
