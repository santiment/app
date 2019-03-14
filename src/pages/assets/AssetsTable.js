import React, { Fragment } from 'react'
import ReactTable from 'react-table'
import cx from 'classnames'
import Sticky from 'react-stickynode'
import { connect } from 'react-redux'
import 'react-table/react-table.css'
import {
  // Button,
  Panel
} from '@santiment-network/ui'
import { ASSETS_FETCH, ASSETS_SET_MIN_VOLUME_FILTER } from '../../actions/types'
import Refresh from '../../components/Refresh/Refresh'
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
  refetchAssets,
  setMinVolumeFilter,
  minVolume = 10000
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
          onRefreshClick={() =>
            refetchAssets({ ...Assets.typeInfo, minVolume })
          }
        />
        {
          // <Button
          // variant='fill'
          // accent={minVolume > 0 ? 'positive': ''}
          // onClick={setMinVolumeFilter}>
          // {minVolume > 0 ? `remove filter min volume > ${millify(minVolume, 2)}` : 'add filter min volume > 10k'}
          // </Button>
        }
      </div>
      <Panel>
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

const mapStateToProps = state => {
  return {
    minVolume: state.projects.filters.minVolume
  }
}

const mapDispatchToProps = dispatch => ({
  refetchAssets: ({ type, listName, listId, minVolume = 10000 }) =>
    dispatch({
      type: ASSETS_FETCH,
      payload: {
        type,
        list: {
          name: listName,
          id: listId
        },
        filters: {
          minVolume
        }
      }
    }),
  setMinVolumeFilter: () =>
    dispatch({
      type: ASSETS_SET_MIN_VOLUME_FILTER
    })
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetsTable)
