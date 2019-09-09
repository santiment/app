import React from 'react'
import ReactTable from 'react-table'
import cx from 'classnames'
import { Loader } from 'semantic-ui-react'
import PanelWithHeader from '@santiment-network/ui/Panel/PanelWithHeader'
import { columns } from './columns'
import '../../pages/Projects/ProjectsTable.css'
import styles from './EthSpentTable.module.scss'

const EthSpentTable = ({
  items = [],
  isLoading = true,
  error = 'undefined',
  type = 'all',
  showAll = false,
  history
}) => {
  const loading = isLoading
  return (
    <PanelWithHeader
      header='Ethereum spent overview'
      className={styles.wrapper}
      contentClassName={styles.panel}
      headerClassName={styles.header}
    >
      <ReactTable
        loading={loading}
        multiSort
        showPagination={!showAll}
        showPaginationTop={false}
        showPaginationBottom={true}
        pageSize={showAll ? items && items.length : undefined}
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
        LoadingComponent={({ className, loading, loadingText, ...rest }) => (
          <div
            className={cx('-loading', { '-active': loading }, className)}
            {...rest}
          >
            <div className='-loading-inner'>
              <Loader active size='large' />
            </div>
          </div>
        )}
      />
    </PanelWithHeader>
  )
}

export default EthSpentTable
