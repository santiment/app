import React, { useState } from 'react'
import cx from 'classnames'
import ReactTable from 'react-table'
import Loader from '@santiment-network/ui/Loader/Loader'
import Button from '@santiment-network/ui/Button'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import { columns } from './columns'
import GetAssets from '../../pages/assets/GetAssets'
import '../../pages/Projects/ProjectsTable.css'
import styles from './EthSpentTable.module.scss'

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
            header={
              <div className={styles.header}>
                Ethereum spent overview
                <div className={styles.actions}>
                  <Button
                    accent={'positive'}
                    variant={'fill'}
                    disabled={loading || page === 1}
                    className={styles.control}
                    onClick={() => setPage(Math.max(1, page - 1))}
                  >
                    Prev
                  </Button>
                  <Button
                    accent={'positive'}
                    variant={'fill'}
                    disabled={loading || items.length < ROWS_COUNT}
                    className={styles.control}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            }
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
          </PanelWithHeader>
        )
      }}
    />
  )
}

export default EthSpentTable
