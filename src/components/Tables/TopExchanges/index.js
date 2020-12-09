import React, { useState, useMemo } from 'react'
import cx from 'classnames'
import Loader from '@santiment-network/ui/Loader/Loader'
import { COLUMNS, DEFAULT_SORTING } from './columns'
import { useTopExchanges } from './gql'
import StablecoinSelector from '../../../ducks/Stablecoins/StablecoinSelector/StablecoinSelector'
import Table from '../../../ducks/Table'
import styles from './index.module.scss'

const DEFAULT_STABLECOIN = {
  slug: 'stablecoins',
  name: 'All stablecoins',
  ticker: ''
}

export const TopExchangesTableTitle = ({
  loading,
  items,
  title = 'Holdings on the top exchanges'
}) => {
  return (
    <div className={styles.title}>
      <h3 className={styles.text}>{title}</h3>
      {loading && <Loader className={styles.headerLoader} />}
    </div>
  )
}

const TopExchanges = ({ className, isStablecoinPage, ...props }) => {
  const [asset, setAsset] = useState(DEFAULT_STABLECOIN)
  const additionalProps =
    isStablecoinPage && asset.slug !== 'stablecoins'
      ? { slug: asset.slug, selector: null }
      : {}
  const [items, loading] = useTopExchanges({ ...props, ...additionalProps })

  const data = useMemo(() => items, [items])
  const columns = useMemo(() => COLUMNS, [])

  return (
    <>
      <TopExchangesTableTitle loading={loading} items={items} />
      {isStablecoinPage && (
        <div className={styles.header}>
          <StablecoinSelector asset={asset} setAsset={setAsset} />
        </div>
      )}
      <Table
        options={{
          withSorting: true,
          initialState: { sortBy: DEFAULT_SORTING },
          isStickyHeader: true
        }}
        className={cx(className, styles.tableWrapper)}
        classes={{
          table: styles.table,
          loader: styles.loadingWrapper,
          loaderRow: styles.loadingRow
        }}
        data={data}
        columns={columns}
        isLoading={loading && items.length === 0}
        repeatLoading={10}
      />
    </>
  )
}

//     loadingText=''
//     LoadingComponent={() => (
//       <CustomLoadingComponent
//         isLoading={loading && items.length === 0}
//         repeat={10}
//         classes={{ wrapper: styles.loadingWrapper, row: styles.loadingRow }}
//       />
//     )}
//     NoDataComponent={() => (
//       <CustomNoDataComponent isLoading={loading && items.length === 0} />
//     )}
//   />

export default TopExchanges
