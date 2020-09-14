import React, { useCallback, useEffect, useState } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import { useDialogState } from '../../../../../hooks/dialog'
import { useAvailableMetrics } from '../CompareInfo/hooks'
import Search from '../../../../Studio/Sidebar/Search'
import MetricsList from '../../../../Signals/signalFormManager/signalCrudForm/formParts/metricTypes/MetricsList'
import { useIsBetaMode } from '../../../../../stores/ui'
import { getCategoryGraph } from '../../../../Studio/Sidebar/utils'
import MetricBtns from '../CompareInfo/MetricBtns/MetricBtns'
import { SEARCH_PREDICATE_ONLY_METRICS } from '../../../../Studio/Compare/Comparable/Metric'
import styles from './CompareDialog.module.scss'

const FIND_PREDICATE = target => item => item === target

export const addOrRemove = (source, target, predicate) => {
  const index = source.findIndex(predicate || FIND_PREDICATE(target))

  let newList = [...source]

  if (index >= 0) {
    newList.splice(index, 1)
  } else {
    newList.push(target)
  }

  return newList
}

const CompareDialog = ({ trigger, assets }) => {
  const { closeDialog, isOpened, openDialog } = useDialogState()
  const { availableMetrics, loadings } = useAvailableMetrics(assets)
  const isLoading = loadings.length > 0

  const [metrics, setMetrics] = useState([])

  const onCompare = useCallback(() => {}, [])

  const onSelectMetric = useCallback(
    metric => {
      setMetrics(addOrRemove(metrics, metric))
    },
    [metrics, setMetrics]
  )

  const onClear = useCallback(
    () => {
      setMetrics([])
    },
    [metrics, setMetrics]
  )

  const removeMetric = useCallback(
    metric => {
      setMetrics(metrics.filter(m => m !== metric))
    },
    [metrics, setMetrics]
  )

  const isBeta = useIsBetaMode()

  const [categories, setCategories] = useState({})

  useEffect(
    () => {
      const newCategories = getCategoryGraph(availableMetrics, [], {}, isBeta)
      setCategories(newCategories)
    },
    [availableMetrics]
  )

  const categoriesKeys = Object.keys(categories)

  const project = assets[0]

  return (
    <Dialog
      open={isOpened}
      onClose={closeDialog}
      onOpen={openDialog}
      title='Choose metric to compare'
      trigger={trigger}
      classes={styles}
    >
      <Dialog.ScrollContent className={styles.panel}>
        <div className={styles.info}>
          Compare <SelectedAssets assets={assets} /> on one chart widget. Each
          row contain one choosed metric and N choosed assets.
        </div>

        <Search
          iconPosition='left'
          inputProps={{
            placeholder: 'Search for a metric'
          }}
          toggleMetric={onSelectMetric}
          className={styles.search}
          categories={categories}
          searchPredicate={SEARCH_PREDICATE_ONLY_METRICS}
        />

        <div className={styles.metricBtns}>
          <MetricBtns
            onClear={onClear}
            metrics={metrics}
            removeMetric={removeMetric}
          />
        </div>

        <div className={styles.metrics}>
          {categoriesKeys.map((key, index) => (
            <MetricsList
              index={index}
              key={key}
              metrikKey={key}
              list={categories[key]}
              onSelect={onSelectMetric}
              project={project}
              selected={metrics}
              showIcons
            />
          ))}
        </div>
      </Dialog.ScrollContent>

      <Dialog.Actions className={styles.actions}>
        <Dialog.Approve
          onClick={onCompare}
          isLoading={isLoading}
          disabled={isLoading || metrics.length === 0}
          className={styles.compare}
        >
          Compare
        </Dialog.Approve>
        <Dialog.Cancel
          onClick={closeDialog}
          className={styles.cancel}
          isLoading={isLoading}
        >
          Cancel
        </Dialog.Cancel>
      </Dialog.Actions>
    </Dialog>
  )
}

const SelectedAssets = ({ assets }) => {
  return (
    <>
      {assets.map(({ name, ticker }, index) => {
        return (
          <span key={ticker} className={styles.name}>
            {name} <span className={styles.ticker}>{ticker}</span>
            {assets.length > 1 && index !== assets.length - 1 && <span>,</span>}
          </span>
        )
      })}
    </>
  )
}

export default CompareDialog
