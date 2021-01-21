import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel'
import Icon from '@santiment-network/ui/Icon'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import { useAvailableMetrics } from '../../../../gql/hooks'
import { metrics } from '../../../Filter/dataHub/metrics'
import Category from './Category'
import { getCategoryGraph } from '../../../../../Studio/Sidebar/utils'
import { buildColumnsFromMetricKey } from '../utils'
import styles from './index.module.scss'

const Toggler = () => {
  const { availableMetrics = [] } = useAvailableMetrics()
  const columnsObj = {}

  metrics.forEach(({ key }) => {
    Object.assign(columnsObj, buildColumnsFromMetricKey(key, availableMetrics))
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
