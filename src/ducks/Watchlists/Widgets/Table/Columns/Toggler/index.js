import React, { useMemo } from 'react'
import cx from 'classnames'
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

const Toggler = ({ activeColumnsObj }) => {
  const activeKeys = useMemo(() => Object.keys(activeColumnsObj), [
    activeColumnsObj
  ])
  const activeColumns = useMemo(() => Object.values(activeColumnsObj), [
    activeColumnsObj
  ])
  const { availableMetrics = activeKeys } = useAvailableMetrics()
  const columnsObj = {}

  metrics.forEach(({ key }) => {
    Object.assign(columnsObj, buildColumnsFromKey(key, availableMetrics))
  })

  const columns = Object.values(columnsObj)
  const categories = getCategoryGraph(columns)

  function toggleColumn () {
    return null
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
          />
          {Object.keys(categories).map(key => (
            <Category
              key={key}
              title={key}
              groups={categories[key]}
              onColumnToggle={toggleColumn}
            />
          ))}
        </div>
      </Panel>
    </ContextMenu>
  )
}

export default Toggler
