import React, { useState } from 'react'
import ReactTable from 'react-table'
import Loader from '@santiment-network/ui/Loader/Loader'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import { columns } from './columns'
import '../../pages/Projects/ProjectsTable.css'
import styles from './EthSpentTable.module.scss'
import GetAssets from '../../pages/assets/GetAssets'

const ROWS_COUNT = 20

const EthSpentTable = ({}) => {
  const [page, setPage] = useState(1)

  return (
    <GetAssets
      type='erc20'
      page={page}
      pageSize={ROWS_COUNT}
      render={({ items = [], isLoading: loading = true }) => {
        return (
          <PanelWithHeader
            header='Ethereum spent overview'
            className={styles.wrapper}
            contentClassName={styles.panel}
          >
            <ReactTable
              loading={loading}
              multiSort
              showPagination={false}
              sortable
              minRows={0}
              resizable={false}
              defaultSorted={[
                {
                  id: 'eth_balance',
                  desc: false
                }
              ]}
              className={styles.ethSpentTable}
              data={items}
              columns={columns}
              LoadingComponent={({ loading }) =>
                loading && <Loader className={styles.loader} />
              }
            />
            <div
              className={page === 1 && styles.disabled}
              onClick={() => setPage(Math.max(1, page - 1))}
            >
              Prev
            </div>
            <div
              className={items.length < ROWS_COUNT && styles.disabled}
              onClick={() => setPage(page + 1)}
            >
              Next
            </div>
          </PanelWithHeader>
        )
      }}
    />
  )
}

export default EthSpentTable
