import React from 'react'
import ReactTable from 'react-table'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { Loader } from 'semantic-ui-react'
import { PanelWithHeader as Panel } from '@santiment-network/ui'
import { simpleSort } from '../../utils/sortMethods'
import { millify } from '../../utils/formatting'
import { columns } from './columns'
import ProjectIcon from '../ProjectIcon'
import SmoothDropdown from '../SmoothDropdown/SmoothDropdown'
import WalletLink from '../WalletLink/WalletLink'
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
    <Panel
      header='Ethereum spent overview'
      className={styles.wrapper}
      contentClassName={styles.panel}
      headerClassName={styles.header}
    >
      <SmoothDropdown verticalMotion verticalOffset={0}>
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
              className={classnames(
                '-loading',
                { '-active': loading },
                className
              )}
              {...rest}
            >
              <div className='-loading-inner'>
                <Loader active size='large' />
              </div>
            </div>
          )}
        />
      </SmoothDropdown>
    </Panel>
  )
}

const enhance = compose(withRouter)

export default enhance(EthSpentTable)
