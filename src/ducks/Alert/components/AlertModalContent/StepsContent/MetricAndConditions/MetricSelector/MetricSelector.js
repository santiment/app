import React, { useEffect, useMemo, useState } from 'react'
import { useField } from 'formik'
import { InputWithIcon } from '@santiment-network/ui/Input'
import MetricsList from './MetricsList/MetricsList'
import { useMergedTimeboundSubmetrics } from '../../../../../../dataHub/timebounds'
import { getCategoryGraph } from '../../../../../../Studio/Sidebar/utils'
import { useProject } from '../../../../../../../hooks/project'
import { useIsBetaMode } from '../../../../../../../stores/ui'
import { filterOnlyMetrics, getByAvailable } from './utils'
import styles from './MetricSelector.module.scss'

const suggestedMetrics = {
  Suggested: {
    _: [
      {
        item: { category: 'Suggested', label: 'Price', key: 'price_usd' },
        subitems: [],
      },
      {
        item: {
          category: 'Suggested',
          label: 'Daily Active Addresses',
          key: 'daily_active_addresses',
        },
        subitems: [],
      },
    ],
  },
}

function filterCategories (categories, searchTerm) {
  return Object.keys(categories).reduce((acc, curr) => {
    const category = Object.keys(categories[curr]).reduce((catAcc, catCurr) => {
      const arr = categories[curr][catCurr].reduce((arrItemAcc, arrItemCurr) => {
        const hasItem = arrItemCurr.item.label.toLowerCase().includes(searchTerm.toLowerCase())

        if (hasItem) {
          return [
            ...arrItemAcc,
            {
              ...arrItemCurr,
              subitems: arrItemCurr.subitems.filter((subitem) =>
                subitem.label.toLowerCase().includes(searchTerm.toLowerCase()),
              ),
            },
          ]
        }

        return arrItemAcc
      }, [])

      if (arr.length > 0) {
        return { ...catAcc, [catCurr]: arr }
      }

      return catAcc
    }, {})

    if (Object.keys(category).length > 0) {
      return { ...acc, [curr]: category }
    }

    return acc
  }, {})
}

const MetricSelector = ({ selectedMetric, metrics, target, onChange }) => {
  const [, , { setValue: setMetric }] = useField('settings.metric')
  const isBeta = useIsBetaMode()
  const [project] = useProject(target.slug)
  const [categories, setCategories] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  const allCategories = useMemo(() => filterCategories(categories, searchTerm), [
    categories,
    searchTerm,
  ])

  const allMetrics = useMemo(
    () =>
      getByAvailable(
        metrics.some((m) => m.includes('nvt')) ? metrics.concat('nvt_5min') : metrics,
        target,
      ),
    [metrics, target],
  )

  const allSubmetrics = useMergedTimeboundSubmetrics(metrics)

  useEffect(() => {
    const submetrics = filterOnlyMetrics(allSubmetrics)
    const newCategories = getCategoryGraph(allMetrics, [], submetrics, isBeta)
    setCategories({ ...suggestedMetrics, ...newCategories })
  }, [metrics, allMetrics, isBeta])

  function handleSelectMetric (metric) {
    setMetric(metric.key)
    onChange(metric)
  }

  return (
    <>
      <InputWithIcon
        type='text'
        icon='search-small'
        iconPosition='left'
        className={styles.search}
        placeholder={'Search for metric'}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <MetricsList
        metricsList={allCategories}
        project={project}
        onSelect={handleSelectMetric}
        selectedMetric={selectedMetric}
      />
    </>
  )
}

export default MetricSelector
