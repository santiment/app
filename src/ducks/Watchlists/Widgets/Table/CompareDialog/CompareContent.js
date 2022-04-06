import React, { useCallback, useEffect, useState } from 'react'
import Dialog from '@santiment-network/ui/Dialog'
import { useIsBetaMode } from '../../../../../stores/ui'
import { useAvailableMetrics } from '../CompareInfo/hooks'
import { getCategoryGraph } from '../../../../Studio/Sidebar/utils'
import Search from '../../../../Studio/Sidebar/Search'
import { SEARCH_PREDICATE_ONLY_METRICS } from '../../../../Studio/Compare/Comparable/Metric'
import MetricBtns from '../CompareInfo/MetricBtns/MetricBtns'
import MetricsList from '../../../../Signals/signalFormManager/signalCrudForm/formParts/metricTypes/MetricsList'
import { filterOnlyMetrics } from '../../../../Signals/signalFormManager/signalCrudForm/formParts/metricTypes/SupportedMetricsList'
import { newProjectMetric } from '../../../../Studio/metrics'
import ChartWidget from '../../../../Studio/Widget/ChartWidget'
import { PATHS } from '../../../../../paths'
import { generateUrlV2 } from '../../../../Studio/url/generate'
import PageLoader from '../../../../../components/Loader/PageLoader'
import { useMergedTimeboundSubmetrics } from '../../../../dataHub/timebounds'
import styles from './CompareDialog.module.scss'

const CompareContent = ({
  onSelectMetric,
  closeDialog,
  removeMetric,
  onClear,
  metrics,
  assets,
}) => {
  const isBeta = useIsBetaMode()
  const { availableMetrics, loadings } = useAvailableMetrics(assets)

  const [categories, setCategories] = useState({})
  const categoriesKeys = Object.keys(categories)

  const AllSubmetrics = useMergedTimeboundSubmetrics(availableMetrics)
  const [selectedMetricSettingsMap, setSelectedMetricSettingsMap] = useState(new Map())

  useEffect(() => {
    const submetrics = filterOnlyMetrics(AllSubmetrics)
    const newCategories = getCategoryGraph(availableMetrics, [], submetrics, isBeta)

    setCategories(newCategories)
  }, [availableMetrics])

  const onCompare = useCallback(() => {
    const MetricSettingMap = new Map()
    const widgets = assets.map((asset) =>
      ChartWidget.new({
        metrics: metrics.map((metric) => {
          const projectMetric = newProjectMetric(asset, metric)
          const metricSettings = selectedMetricSettingsMap.get(metric)

          if (metricSettings) {
            MetricSettingMap.set(projectMetric, metricSettings)
          }

          return projectMetric
        }),
        MetricSettingMap,
      }),
    )

    const url = `${PATHS.STUDIO}?${generateUrlV2({
      widgets,
      settings: {},
    })}`

    window.open(url, '_blank')
  }, [metrics, assets, selectedMetricSettingsMap])

  const project = assets[0]
  const loading = loadings.length > 0

  return (
    <>
      <Dialog.ScrollContent className={styles.panel}>
        <div className={styles.info}>
          Compare <SelectedAssets assets={assets} /> on a single chart. Each row contains one
          selected metric and N selected assets
        </div>

        <Search
          iconPosition='left'
          inputProps={{
            placeholder: 'Search for a metric',
          }}
          toggleMetric={onSelectMetric}
          className={styles.search}
          categories={categories}
          searchPredicate={SEARCH_PREDICATE_ONLY_METRICS}
        />

        <div className={styles.metricBtns}>
          <MetricBtns onClear={onClear} metrics={metrics} removeMetric={removeMetric} />
        </div>

        <div className={styles.metrics}>
          {loading ? (
            <PageLoader className={styles.loader} />
          ) : (
            categoriesKeys.map((key, index) => (
              <MetricsList
                index={index}
                key={key}
                metrikKey={key}
                list={categories[key]}
                onSelect={onSelectMetric}
                project={project}
                selected={metrics}
                availableMetrics={availableMetrics}
                isBeta={isBeta}
                selectedMetricSettingsMap={selectedMetricSettingsMap}
                setSelectedMetricSettingsMap={setSelectedMetricSettingsMap}
              />
            ))
          )}
        </div>
      </Dialog.ScrollContent>

      <Dialog.Actions className={styles.actions}>
        <Dialog.Approve
          onClick={onCompare}
          isLoading={loading}
          disabled={loading || metrics.length === 0}
          className={styles.compare}
        >
          Compare
        </Dialog.Approve>
        <Dialog.Cancel onClick={closeDialog} className={styles.cancel}>
          Cancel
        </Dialog.Cancel>
      </Dialog.Actions>
    </>
  )
}

const SelectedAssets = ({ assets }) => {
  return (
    <>
      {assets.map(({ name, ticker }, index) => {
        return (
          <span key={ticker} className={styles.name}>
            {name}
            {assets.length > 1 && index !== assets.length - 1 && <span>,</span>}
          </span>
        )
      })}
    </>
  )
}

export default CompareContent
