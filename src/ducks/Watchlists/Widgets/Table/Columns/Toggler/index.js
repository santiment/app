import React, { useMemo, useState, useEffect } from 'react'
import cx from 'classnames'
import isEqual from 'lodash.isequal'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import Icon from '@santiment-network/ui/Icon'
import Search from '@santiment-network/ui/Search'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Category from './Category'
import { buildColumns, Column } from '../builder'
import { metrics } from '../../../Filter/dataHub/metrics'
import { useRestrictedMetrics } from '../../../../gql/hooks'
import { getCategoryGraph } from '../../../../../Studio/Sidebar/utils'
import { useTheme } from '../../../../../../stores/ui/theme'
import { getShadowVars } from '../../../../../../utils/styles'
import { useUpdateWatchlistTableConfig } from '../gql/mutations'
import ConfigsMenu from './Configs'
import { useTableConfig } from '../gql/queries'
import styles from './index.module.scss'

const Toggler = ({
  activeColumns,
  updateActiveColumnsKeys,
  watchlist,
  isAuthor
}) => {
  const { isNightMode } = useTheme()
  const [open, setOpen] = useState(false)
  const [selectedConfigId, setSelectedConfigId] = useState(
    watchlist && watchlist.tableConfiguration && watchlist.tableConfiguration.id
  )
  const [openConfigsMenu, setOpenConfigsMenu] = useState(false)
  const {
    allMetrics,
    restrictedMetrics,
    loading: metricsLoading
  } = useRestrictedMetrics()
  const [currentSearch, setCurrentSearch] = useState('')
  const [activeKeys, setActiveKeys] = useState(null)
  const [currActiveKeys, setCurrActiveKeys] = useState(null)
  const {
    updateWatchlistTableConfig,
    updatedWatchlistTableConfigId
  } = useUpdateWatchlistTableConfig()
  const { tableConfig, loading: configLoading } = useTableConfig(
    selectedConfigId
  )
  const isLoading = configLoading || metricsLoading
  const config = useMemo(
    () => {
      if (
        watchlist &&
        watchlist.tableConfiguration &&
        selectedConfigId === watchlist.tableConfiguration.id &&
        !tableConfig
      ) {
        return watchlist.tableConfiguration
      } else {
        return tableConfig
      }
    },
    [watchlist, updatedWatchlistTableConfigId, selectedConfigId, tableConfig]
  )

  useEffect(
    () => {
      if (config && allMetrics.length !== 0) {
        const newMetricKeys = config.columns.metrics
        setActiveKeys(newMetricKeys)
        setCurrActiveKeys(newMetricKeys)
        updateActiveColumnsKeys(newMetricKeys)
      }
    },
    [config, allMetrics]
  )

  useEffect(
    () => {
      if (
        watchlist &&
        watchlist.tableConfiguration &&
        watchlist.tableConfiguration.id !== selectedConfigId
      ) {
        setSelectedConfigId(watchlist.tableConfiguration.id)
      }
    },
    [watchlist]
  )

  useEffect(
    () => {
      const updatedActiveKeys = activeColumns.map(({ key }) => key)
      if (!isEqual(updatedActiveKeys, activeKeys) && !open && !isLoading) {
        setActiveKeys(updatedActiveKeys)
      }
    },
    [activeColumns]
  )

  useEffect(
    () => {
      setCurrActiveKeys(activeKeys)
      if (!open && !isLoading) {
        if (
          activeKeys &&
          !isEqual(new Set(activeKeys), new Set(currActiveKeys))
        ) {
          updateActiveColumnsKeys(activeKeys)
        }
        setCurrentSearch('')
      }
    },
    [open]
  )

  const hasChanges = useMemo(
    () => !isEqual(new Set(currActiveKeys), new Set(activeKeys)),
    [activeKeys]
  )

  useEffect(
    () => {
      if (
        selectedConfigId &&
        (!watchlist.tableConfiguration ||
          watchlist.tableConfiguration.id !== selectedConfigId) &&
        isAuthor
      ) {
        if (
          !updatedWatchlistTableConfigId ||
          updatedWatchlistTableConfigId !== selectedConfigId
        ) {
          updateWatchlistTableConfig(watchlist.id, selectedConfigId)
        }
      }
    },
    [selectedConfigId]
  )

  const categories = useMemo(
    () => {
      if (allMetrics.length !== 0) {
        buildColumns(metrics, allMetrics, restrictedMetrics)
        const allColumns = Object.values(Column)
        return getCategoryGraph(allColumns)
      }

      return []
    },
    [allMetrics]
  )

  function toggleColumn (columnKey, isActive) {
    const newActiveKeys = isActive
      ? [...activeKeys, columnKey]
      : activeKeys.filter(key => key !== columnKey)
    setActiveKeys(newActiveKeys)
  }

  if (metricsLoading && activeKeys === null) {
    return null
  }

  return (
    <>
      <ContextMenu
        trigger={
          <Button
            fluid
            variant='flat'
            className={cx(styles.button, styles.button__withLine)}
          >
            <Icon type='columns' />
          </Button>
        }
        open={open}
        passOpenStateAs='isActive'
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        position='bottom'
        align='end'
      >
        <Panel
          variant='modal'
          className={styles.wrapper}
          style={getShadowVars(isNightMode)}
        >
          <div
            className={cx(styles.buttons, hasChanges && styles.buttons__active)}
          >
            <Button
              variant='fill'
              accent='positive'
              onClick={() => setOpen(false)}
            >
              Apply
            </Button>
            <Button
              border
              accent='green'
              onClick={() => {
                setActiveKeys(currActiveKeys)
                setOpen(false)
              }}
            >
              Cancel
            </Button>
          </div>
          <Search
            onChange={value => setCurrentSearch(value)}
            placeholder='Type to search'
            className={styles.search}
          />
          <div className={styles.content}>
            <Category
              key='Active columns'
              title='Active columns'
              columns={activeColumns}
              onColumnToggle={toggleColumn}
              activeKeys={currActiveKeys}
              currentSearch={currentSearch}
            />
            {Object.keys(categories).map(key => (
              <Category
                currentSearch={currentSearch}
                key={key}
                title={key}
                groups={categories[key]}
                onColumnToggle={toggleColumn}
                activeKeys={currActiveKeys}
              />
            ))}
          </div>
        </Panel>
      </ContextMenu>
      <ConfigsMenu
        setOpen={setOpenConfigsMenu}
        open={openConfigsMenu}
        changeConfig={setSelectedConfigId}
        config={config}
        isLoading={isLoading}
        activeColumns={activeKeys}
      />
    </>
  )
}

export default Toggler
