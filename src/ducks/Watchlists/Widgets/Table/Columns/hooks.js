import { useMemo, useState } from 'react'
import { buildColumns, Column, buildAssetColumns } from './builder'
import { useRestrictedMetrics } from './gql/queries'
import { metrics } from '../../Filter/dataHub/metrics'
import { BLOCKCHAIN_ADDRESS } from '../../../detector'
import { useProjects } from '../../../../../stores/projects'
import { getCategoryGraph } from '../../../../Studio/Sidebar/utils'
import {
  LABELS_COLUMN,
  NOTE_COLUMN
} from '../../../../WatchlistAddressesTable/columns'

export function useCategories (type) {
  const { projects, isLoading: projectsLoading } = useProjects()
  const {
    allMetrics,
    restrictedMetrics,
    loading: metricsLoading
  } = useRestrictedMetrics(type)

  const projectCategories = useMemo(
    () => {
      if (allMetrics.length !== 0 && type !== BLOCKCHAIN_ADDRESS) {
        buildColumns(metrics, allMetrics, restrictedMetrics)
        const allColumns = Object.values(Column)
        return getCategoryGraph(allColumns)
      }

      return []
    },
    [allMetrics]
  )

  const addressesCategories = useMemo(
    () => {
      if (type === BLOCKCHAIN_ADDRESS) {
        const assetColumns = buildAssetColumns(projects)
        const allAssetColumns = Object.values(assetColumns)
        return {
          General: {
            _: [LABELS_COLUMN, NOTE_COLUMN].map(item => ({ item }))
          },
          Assets: {
            _: allAssetColumns.map(item => ({ item }))
          }
        }
      }

      return []
    },
    [projects]
  )

  return {
    categories:
      type === BLOCKCHAIN_ADDRESS ? addressesCategories : projectCategories,
    loading: type === BLOCKCHAIN_ADDRESS ? projectsLoading : metricsLoading
  }
}

export const useManipulateColumns = () => {
  const [wasReorder, setWasReorder] = useState(false)
  const [activeKeys, setActiveKeys] = useState(null)
  const [currActiveKeys, setCurrActiveKeys] = useState(null)

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
    setWasReorder(wasChanges)
    const newKeysOrder = Array.from(activeKeys)
    newKeysOrder.sort((a, b) => keys.indexOf(a) - keys.indexOf(b))
    setActiveKeys(newKeysOrder)
  }

  return {
    toggleColumn,
    reorderActiveKeys,
    activeKeys,
    setActiveKeys,
    currActiveKeys,
    setCurrActiveKeys,
    wasReorder,
    setWasReorder
  }
}
