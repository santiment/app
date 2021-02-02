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
import ConfigsMenu from './Configs'
import { useTableConfig } from '../gql/queries'
import styles from './index.module.scss'

const Toggler = ({
  activeColumns,
  updateActiveColumnsKeys,
  watchlistTableConfig
}) => {
  const { isNightMode } = useTheme()
  const [open, setOpen] = useState(false)
  const [selectedConfigId, setSelectedConfigId] = useState(
    watchlistTableConfig && watchlistTableConfig.id
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
  const { tableConfig, loading: configLoading } = useTableConfig(
    selectedConfigId
  )
  const isLoading = configLoading || metricsLoading

  useEffect(
    () => {
      if (tableConfig && allMetrics.length !== 0) {
        const newMetricKeys = tableConfig.columns.metrics
        setActiveKeys(newMetricKeys)
        setCurrActiveKeys(newMetricKeys)
        updateActiveColumnsKeys(newMetricKeys)
      }
    },
    [tableConfig, allMetrics]
  )

  useEffect(
    () => {
      if (
        watchlistTableConfig &&
        watchlistTableConfig.id !== selectedConfigId
      ) {
        setSelectedConfigId(watchlistTableConfig)
      }
    },
    [watchlistTableConfig]
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
      if (!open && !metricsLoading) {
        updateActiveColumnsKeys(activeKeys)
        setCurrentSearch('')
      }
    },
    [open]
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
        config={tableConfig}
        isLoading={isLoading}
        activeColumns={activeKeys}
      />
    </>
  )
}

export default Toggler
