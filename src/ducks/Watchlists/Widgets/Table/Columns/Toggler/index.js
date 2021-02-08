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
  isAuthor,
  sorting,
  setOrderBy
}) => {
  const { isNightMode } = useTheme()
  const [open, setOpen] = useState(false)
  const [wasReorder, setWasReorder] = useState(false)
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
        const { metrics, sorting } = config.columns
        if (sorting) {
          setOrderBy(sorting)
        }

        setActiveKeys(metrics)
        setCurrActiveKeys(metrics)
        updateActiveColumnsKeys(metrics)
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
        if (activeKeys && hasChanges) {
          updateActiveColumnsKeys(activeKeys)
        }
        setWasReorder(false)
        setCurrentSearch('')
      }
    },
    [open]
  )

  const hasChanges = useMemo(
    () => !isEqual(currActiveKeys, activeKeys) || wasReorder,
    [activeKeys, currActiveKeys, wasReorder]
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

  function addKey (key) {
    const index = currActiveKeys.indexOf(key)
    if (index === -1) {
      return [...activeKeys, key]
    } else {
      let wasAdded = false
      const newKeys = []
      activeKeys.forEach(item => {
        if (!wasAdded) {
          const itemIndex = currActiveKeys.indexOf(item)
          if (itemIndex === -1 || itemIndex > index) {
            newKeys.push(key)
            newKeys.push(item)
            wasAdded = true
          } else {
            newKeys.push(item)
          }
        } else {
          newKeys.push(item)
        }
      })
      if (!wasAdded) {
        newKeys.push(key)
      }
      return newKeys
    }
  }

  function toggleColumn (columnKey, isActive) {
    const newActiveKeys = isActive
      ? addKey(columnKey)
      : activeKeys.filter(key => key !== columnKey)
    setActiveKeys(newActiveKeys)
  }

  function reorderActiveKeys (keys, wasChanges) {
    setCurrActiveKeys(keys)
    const newKeysOrder = Array.from(activeKeys)
    newKeysOrder.sort((a, b) => keys.indexOf(a) - keys.indexOf(b))
    setActiveKeys(newKeysOrder)
    setWasReorder(wasChanges)
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
          className={cx(styles.wrapper, hasChanges && styles.wrapper__active)}
          style={getShadowVars(isNightMode)}
        >
          <Button
            className={cx(styles.discard, hasChanges && styles.discard__active)}
            onClick={() => {
              setActiveKeys(currActiveKeys)
              setOpen(false)
            }}
          >
            Discard changes
          </Button>
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
              reorder={reorderActiveKeys}
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
        sorting={sorting}
        isLoading={isLoading}
        activeColumns={currActiveKeys}
      />
    </>
  )
}

export default Toggler
