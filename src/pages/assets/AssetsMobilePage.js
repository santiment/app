import React from 'react'
import cx from 'classnames'
import { List, AutoSizer } from 'react-virtualized'
import MobileHeader from './../../components/MobileHeader/MobileHeader'
import Assets from './Assets'
import AssetCard from './AssetCard'
import { getTableTitle } from './utils'
import styles from './AssetsMobilePage.module.scss'

const AssetsMobilePage = props => {
  return (
    <div className={cx('page', styles.wrapper)}>
      <MobileHeader title={getTableTitle(props)} backRoute='/assets' />
      <Assets
        {...props}
        type={props.type}
        render={Assets => !Assets.isLoading && <AssetsList {...Assets} />}
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
  )
}

export default AssetsMobilePage
