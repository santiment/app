import React, { Fragment } from 'react'
import ReactTable from 'react-table'
import cx from 'classnames'
import Sticky from 'react-stickynode'
import { connect } from 'react-redux'
import 'react-table/react-table.css'
import { ASSETS_FETCH } from '../../actions/types'
import Refresh from '../../components/Refresh/Refresh'
import Panel from '../../components/Panel'
import ServerErrorMessage from './../../components/ServerErrorMessage'
import columns from './asset-columns'
import './../Projects/ProjectsTable.css'
import styles from './AssetsTable.module.scss'

export const CustomHeadComponent = ({ children, className, ...rest }) => (
  <Sticky enabled>
    <div className={cx('rt-thead', className)} {...rest}>
      {children}
    </div>
  </Sticky>
)

export const filterColumnsByTableSection = (tableSection, columns) => {
  if (tableSection === 'currencies') {
    return columns.filter(
      column =>
        column.id !== 'eth_spent' &&
        column.id !== 'daily_active_addresses' &&
        column.id !== 'signals'
    )
  }
  return columns
}

const AssetsTable = ({
  Assets = {
    items: [],
    isLoading: true,
    error: undefined,
    type: 'all'
  },
  showAll = false,
  goto,
  preload,
  refetchAssets
}) => {
  const { isLoading, items, error, type } = Assets
  if (error && error.message !== 'Network error: Failed to fetch') {
    return <ServerErrorMessage />
  }

  return (
    <Fragment>
      <div className={styles.top}>
        <Refresh
          timestamp={Assets.timestamp}
          onRefreshClick={() => refetchAssets(Assets.typeInfo)}
        />
      </div>
      <Panel className='assets-table-panel'>
        <ReactTable
          loading={isLoading}
          showPagination={!showAll}
          showPaginationTop={false}
          showPaginationBottom
          defaultPageSize={20}
          pageSizeOptions={[5, 10, 20, 25, 50, 100]}
          pageSize={showAll ? items && items.length : undefined}
          sortable={false}
          resizable
          defaultSorted={[
            {
              id: 'marketcapUsd',
              desc: false
            }
          ]}
          className='-highlight'
          data={items}
          columns={filterColumnsByTableSection(type, columns(preload))}
          loadingText='Loading...'
          TheadComponent={CustomHeadComponent}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                if (handleOriginal) {
                  handleOriginal()
                }
                if (rowInfo && rowInfo.original && rowInfo.original.ticker) {
                  goto(`/projects/${rowInfo.original.coinmarketcapId}`)
                }
              }
            }
          }}
        />
      </Panel>
    </Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  refetchAssets: ({ type, listName, listId }) =>
    dispatch({
      type: ASSETS_FETCH,
      payload: { type, list: { name: listName, id: listId } }
    })
})
export default connect(
  null,
  mapDispatchToProps
)(AssetsTable)
