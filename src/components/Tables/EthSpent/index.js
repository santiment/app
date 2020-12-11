import React, { useMemo } from 'react'
import cx from 'classnames'
import Loader from '@santiment-network/ui/Loader/Loader'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import { COLUMNS, DEFAULT_SORTING } from './columns'
import GetAssets, {
  FIRST_LOAD_SIZE
} from '../../../ducks/Watchlists/Widgets/Table/GetAssets'
import Table from '../../../ducks/Table'
import styles from './index.module.scss'

const EthSpentTable = () => {
  const columns = useMemo(() => COLUMNS, [])

  return (
    <GetAssets
      sortBy='eth_balance'
      type='erc20'
      render={({ items = [], isLoading: loading = true, loadingAll }) => {
        return (
          <PanelWithHeader
            header={
              <div className={styles.header}>
                Ethereum spent overview{' '}
                {loadingAll && <Loader className={styles.headerLoader} />}
              </div>
            }
            className={styles.wrapper}
            contentClassName={styles.panel}
          >
            <Table
              data={items}
              columns={columns}
              options={{
                loadingSettings: {
                  repeatLoading: 10,
                  isLoading: loading && items.length === 0
                },
                sortingSettings: {
                  defaultSorting: DEFAULT_SORTING,
                  allowSort: true
                },
                stickySettings: {
                  isStickyHeader: true
                }
              }}
              className={styles.tableWrapper}
              classes={{
                table: styles.table
              }}
            />
          </PanelWithHeader>
        )
      }}
    />
  )
}

export default EthSpentTable
