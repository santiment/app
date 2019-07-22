import React, { useState } from 'react'
import ReactTable from 'react-table'
import cx from 'classnames'
import Sticky from 'react-stickynode'
import { connect } from 'react-redux'
import 'react-table/react-table.css'
import { ASSETS_FETCH, ASSETS_SET_MIN_VOLUME_FILTER } from '../../actions/types'
import Refresh from '../../components/Refresh/Refresh'
import ServerErrorMessage from './../../components/ServerErrorMessage'
import AssetsToggleColumns from './AssetsToggleColumns'
import columns, {
  columnSettingsDefault,
  commonSettingsDefault,
  COLUMNS_NAMES,
  CATEGORIES_TITLES
} from './asset-columns'
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
    isLoading: true,
    error: undefined,
    type: 'all'
  },
  items,
  filterType,
  showAll = false,
  preload,
  refetchAssets,
  setMinVolumeFilter,
  minVolume = 10000,
  listName,
  settings
}) => {
  console.log('type: ', listName)
  console.log('settings: ', settings)
  const { isLoading, error } = Assets
  if (error && error.message !== 'Network error: Failed to fetch') {
    return <ServerErrorMessage />
  }

  const [columnsSettings, changeColumnsSettings] = useState(
    columnSettingsDefault
  )

  const toggleColumn = ({ name, show, selectable }) => {
    const toggledColumns = Object.assign({}, columnsSettings)
    // NOTE(haritonasty): such access to the fields is necessary for Safari bug (shuffle properties)
    toggledColumns[name] = {
      ...toggledColumns[name],
      show: selectable ? !show : show
    }

    return changeColumnsSettings(toggledColumns)
  }

  const pageSize =
    settings[listName] && settings[listName].pageSize
      ? settings[listName].pageSize
      : commonSettingsDefault.pageSize

  const hiddenColumns =
    settings[listName] && settings[listName].tableColumns
      ? settings[listName].tableColumns.hidden
      : commonSettingsDefault.tableColumns.hidden

  const shownColumns = columns(preload)
    .filter(({ id }) => !hiddenColumns.some(name => name === id))
    .filter(({ id }) => columnsSettings[id].show)

  const sortingColumn =
    settings[listName] &&
    settings[listName].tableColumns &&
    settings[listName].tableColumns.sorting
      ? settings[listName].tableColumns.sorting
      : commonSettingsDefault.tableColumns.sorting

  return (
    <>
      <div className={styles.top}>
        {filterType ? (
          <span>Showed based on {filterType} anomalies</span>
        ) : (
          <Refresh
            timestamp={Assets.timestamp}
            onRefreshClick={() =>
              refetchAssets({ ...Assets.typeInfo, minVolume })
            }
          />
        )}
        {
          // <Button
          // variant='fill'
          // accent={minVolume > 0 ? 'positive': ''}
          // onClick={setMinVolumeFilter}>
          // {minVolume > 0 ? `remove filter min volume > ${millify(minVolume, 2)}` : 'add filter min volume > 10k'}
          // </Button>
        }
        <AssetsToggleColumns
          columns={columnsSettings}
          onChange={toggleColumn}
        />
      </div>
      <ReactTable
        loading={isLoading}
        showPagination={!showAll}
        showPaginationTop={false}
        showPaginationBottom
        defaultPageSize={pageSize}
        pageSizeOptions={[5, 10, 20, 25, 50, 100]}
        pageSize={showAll ? items && items.length : undefined}
        minRows={0}
        sortable={false}
        resizable={false}
        defaultSorted={[sortingColumn]}
        className={cx('-highlight', styles.assetsTable)}
        data={items}
        columns={shownColumns}
        loadingText='Loading...'
        TheadComponent={CustomHeadComponent}
        getTdProps={() => ({
          onClick: (e, handleOriginal) => {
            if (handleOriginal) handleOriginal()
          },
          style: { border: 'none' }
        })}
      />
    </>
  )
}

const mapStateToProps = ({
  projects: {
    filters: { minVolume }
  },
  watchlistUi: { watchlistsSettings }
}) => ({ minVolume, settings: watchlistsSettings })

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
