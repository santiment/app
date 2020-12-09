import React, { useState, useMemo } from 'react'
import cx from 'classnames'
import Loader from '@santiment-network/ui/Loader/Loader'
import { columns as rawColumns } from './columns'
import { useTopExchanges } from './gql'
import StablecoinSelector from '../../../ducks/Stablecoins/StablecoinSelector/StablecoinSelector'
import Table from '../../../ducks/Table'
import styles from './index.module.scss'

const DEFAULT_SORTED = [
  {
    id: 'balance',
    desc: true
  }
]

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

  const data = React.useMemo(() => items, [items])
  const columns = React.useMemo(() => rawColumns, [])

  return (
    <>
      <TopExchangesTableTitle loading={loading} items={items} />
      {isStablecoinPage && (
        <div className={styles.header}>
          <StablecoinSelector asset={asset} setAsset={setAsset} />
        </div>
      )}
      <Table
        className={className}
        data={data}
        columns={columns}
        loading={loading}
      />
    </>
  )
}

//   <ReactTable
//     defaultSorted={DEFAULT_SORTED}
//     showPagination={false}
//     resizable={false}
//     showPaginationBottom
//     defaultPageSize={5}
//     pageSize={items.length}
//     minRows={0}
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
