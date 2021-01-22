import React, { useMemo, useState, useEffect } from 'react'
import cx from 'classnames'
import isEqual from 'lodash.isequal'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import Icon from '@santiment-network/ui/Icon'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import { useAvailableMetrics } from '../../../../gql/hooks'
import { metrics } from '../../../Filter/dataHub/metrics'
import Category from './Category'
import { getCategoryGraph } from '../../../../../Studio/Sidebar/utils'
import { buildColumnsFromKey } from '../utils'
import styles from './index.module.scss'

const Toggler = ({ activeColumns, updateActiveColumsKeys }) => {
  const [activeKeys, setActiveKeys] = useState(
    activeColumns.map(({ key }) => key)
  )
  const { availableMetrics = activeKeys } = useAvailableMetrics()

  useEffect(
    () => {
      const updatedActiveKeys = activeColumns.map(({ key }) => key)
      if (!isEqual(updatedActiveKeys, activeKeys)) {
        setActiveKeys(updatedActiveKeys)
      }
    },
    [activeColumns]
  )

  const categories = useMemo(
    () => {
      const allColumns = []
      metrics.forEach(({ key }) => {
        const columnsFromMetricObj = buildColumnsFromKey(key, availableMetrics)
        allColumns.push(...Object.values(columnsFromMetricObj))
      })
      return getCategoryGraph(allColumns)
    },
    [availableMetrics]
  )

  function toggleColumn (columnKey, isActive) {
    const newActiveKeys = isActive
      ? activeKeys.filter(key => key !== columnKey)
      : [...activeKeys, columnKey]
    setActiveKeys(newActiveKeys)
    setTimeout(() => updateActiveColumsKeys(newActiveKeys), 200)
  }

  return (
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
      passOpenStateAs='isActive'
      position='bottom'
      align='end'
    >
      <Panel variant='modal' className={styles.wrapper}>
        <div className={styles.content}>
          <Category
            key='Active columns'
            title='Active columns'
            columns={activeColumns}
            onColumnToggle={toggleColumn}
            activeKeys={activeKeys}
          />
          {Object.keys(categories).map(key => (
            <Category
              key={key}
              title={key}
              groups={categories[key]}
              onColumnToggle={toggleColumn}
              activeKeys={activeKeys}
            />
          ))}
        </div>
      </Panel>
    </ContextMenu>
  )
}

export default Toggler
