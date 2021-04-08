import React, { useMemo, useState, useEffect } from 'react'
import cx from 'classnames'
import isEqual from 'lodash.isequal'
import Icon from '@santiment-network/ui/Icon'
import Panel from '@santiment-network/ui/Panel'
import Button from '@santiment-network/ui/Button'
import Search from '@santiment-network/ui/Search'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import Category from './Category'
import ConfigsMenu from './Configs'
import { useTableConfig } from '../gql/queries'
import { useIsAuthor } from '../../../../gql/list/hooks'
import { useTheme } from '../../../../../../stores/ui/theme'
import { useCategories, useManipulateColumns } from '../hooks'
import { getShadowVars } from '../../../../../../utils/styles'
import { useUpdateWatchlistTableConfig } from '../gql/mutations'
import styles from './index.module.scss'

const Toggler = ({
  activeColumns,
  updateActiveColumnsKeys,
  watchlist,
  sorting,
  setOrderBy,
  type
}) => {
  const { isNightMode } = useTheme()
  const { isAuthor } = useIsAuthor(watchlist)
  const [open, setOpen] = useState(false)

  const [selectedConfigId, setSelectedConfigId] = useState(
    watchlist && watchlist.tableConfiguration && watchlist.tableConfiguration.id
  )
  const { categories, loading } = useCategories(type)
  const [currentSearch, setCurrentSearch] = useState('')
  const [openConfigsMenu, setOpenConfigsMenu] = useState(false)
  const {
    toggleColumn,
    reorderActiveKeys,
    activeKeys,
    setActiveKeys,
    currActiveKeys,
    setCurrActiveKeys,
    wasReorder,
    setWasReorder
  } = useManipulateColumns()

  const {
    updateWatchlistTableConfig,
    updatedWatchlistTableConfigId
  } = useUpdateWatchlistTableConfig()
  const { tableConfig, loading: configLoading } = useTableConfig(
    selectedConfigId
  )
  const isLoading = configLoading || loading

  const savedActiveColumnKeys = useMemo(
    () => activeColumns.map(({ key }) => key),
    [activeColumns]
  )

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
      if (config && Object.keys(categories).length !== 0) {
        const { metrics, sorting } = config.columns
        if (sorting) {
          setOrderBy(sorting)
        }

        setActiveKeys(metrics)
        setCurrActiveKeys(metrics)
        updateActiveColumnsKeys(metrics)
      }
    },
    [config, categories]
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
      if (!isEqual(savedActiveColumnKeys, activeKeys) && !open && !isLoading) {
        setActiveKeys(savedActiveColumnKeys)
      }
    },
    [savedActiveColumnKeys]
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

  if (loading && activeKeys === null) {
    return null
  }

  return (
    <div className={styles.container}>
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
              setActiveKeys(savedActiveColumnKeys)
              setCurrActiveKeys(savedActiveColumnKeys)
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
        type={type}
        setOpen={setOpenConfigsMenu}
        open={openConfigsMenu}
        changeConfig={setSelectedConfigId}
        config={config}
        sorting={sorting}
        isLoading={isLoading}
        savedActiveColumnKeys={savedActiveColumnKeys}
      />
    </div>
  )
}

export default Toggler
