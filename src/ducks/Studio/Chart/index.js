import React, { useState, useEffect, useMemo } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { linearScale, logScale } from '@santiment-network/chart/scales'
import ChartMetricSettings from './MetricSettings'
import ChartPaywallInfo from './PaywallInfo'
import ChartActiveMetrics from './ActiveMetrics'
import ChartCanvas from './Canvas'
import SharedAxisToggle from './SharedAxisToggle'
import ContextMenu from './ContextMenu'
import ChartFullscreenBtn from './Fullscreen'
import { extractIndicatorDomainGroups } from '../utils'
import { useMetricColor } from '../Widget/ChartWidgetColorProvider'
import { useAllTimeData } from '../timeseries/hooks'
import { useMetricCategories } from '../../Chart/Synchronizer'
import { useDomainGroups } from '../../Chart/hooks'
import { useHighlightMetricColor } from '../../Chart/colors'
import { extractMirrorMetricsDomainGroups } from '../../Chart/utils'
import { useUser } from '../../../stores/user'
import { getTimeIntervalFromToday, DAY } from '../../../utils/dates'
import styles from './index.module.scss'

const Chart = ({
  index,
  widget,
  className,
  chartRef,
  data,
  eventsData,
  settings,
  options,
  loadings,
  eventLoadings,
  metrics,
  activeEvents,
  shareLink,
  ErrorMsg,
  MetricNode,
  toggleMetric,
  toggleMetricLock,
  isICOPriceActive,
  isSingleWidget,
  isSelectingRange,
  changeTimePeriod,
  rerenderWidgets,
  TopLeftComponent = ChartActiveMetrics,
  setIsICOPriceDisabled,
  setOptions,
  onPointMouseUp,
  onRangeSelected,
  onRangeSelecting,
  onDeleteChartClick,
  syncTooltips
}) => {
  const { isLoggedIn } = useUser()
  const categories = useMetricCategories(metrics, MetricNode)
  const [isDomainGroupingActive, setIsDomainGroupingActive] = useState()
  const [focusedMetricKey, setFocusedMetricKey] = useState()
  const [focusTimer, setFocusTimer] = useState()
  const [metricSettings, setMetricSettings] = useState()
  const MetricColor = useMetricColor()
  const HighlightedMetricColor = useHighlightMetricColor(
    MetricColor,
    focusedMetricKey
  )
  const domainGroups = useDomainGroups(metrics)
  const mirrorDomainGroups = useMemo(
    () => {
      const mirrorDomains = extractMirrorMetricsDomainGroups(domainGroups) || []
      return mirrorDomains.concat(
        extractIndicatorDomainGroups(widget.MetricIndicators)
      )
    },
    [domainGroups]
  )
  const [allTimeData] = useAllTimeData(metrics, settings)
  const isBlurred = !isLoggedIn && index > 1
  const scale = options.isLogScale ? logScale : linearScale

  useEffect(onMetricHoverEnd, [metrics])

  function onMetricHover (metric, { currentTarget }) {
    const { parentNode } = currentTarget
    // HACK: For some reason, fast pointer movement can trigger 'mouseenter' but not 'mouseleave'
    // Hence, a metric might be stucked in the highlighted state [@vanguard | Jun 14, 2020]
    setFocusTimer(
      setTimeout(() => {
        if (parentNode.querySelector(':hover')) {
          setFocusedMetricKey(metric.key)
        }
      }, 60)
    )
  }

  function onMetricHoverEnd () {
    clearTimeout(focusTimer)
    setFocusedMetricKey()
  }

  function onBrushChangeEnd (startIndex, endIndex) {
    const start = allTimeData[startIndex]
    const end = allTimeData[endIndex]
    if (start && end) {
      const endDate =
        endIndex === allTimeData.length - 1
          ? getTimeIntervalFromToday(0, DAY).to
          : new Date(end.datetime)

      changeTimePeriod(new Date(start.datetime), endDate)
    }
  }

  function onMetricSettingsClick (metric) {
    setMetricSettings(metric === metricSettings ? undefined : metric)
  }

  function onMetricRemove (metric) {
    if (metric === metricSettings) {
      setMetricSettings()
    }
    toggleMetric(metric)
  }

  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={cx(styles.top, isBlurred && styles.blur)}>
        <div className={styles.metrics}>
          <TopLeftComponent
            isWithSettings
            className={styles.metric}
            settings={settings}
            MetricColor={MetricColor}
            activeMetrics={metrics}
            activeEvents={activeEvents}
            metricSettings={metricSettings}
            loadings={loadings}
            ErrorMsg={ErrorMsg}
            eventLoadings={eventLoadings}
            isSingleWidget={isSingleWidget}
            toggleMetric={onMetricRemove}
            onLockClick={toggleMetricLock}
            onMetricHover={onMetricHover}
            onMetricHoverEnd={onMetricHoverEnd}
            onSettingsClick={onMetricSettingsClick}
            onDeleteChartClick={isSingleWidget ? undefined : onDeleteChartClick}
          />
        </div>

        <div className={styles.meta}>
          <ChartPaywallInfo metrics={metrics} />

          {domainGroups && domainGroups.length > mirrorDomainGroups.length && (
            <SharedAxisToggle
              isDomainGroupingActive={isDomainGroupingActive}
              setIsDomainGroupingActive={setIsDomainGroupingActive}
            />
          )}

          <ContextMenu
            {...options}
            classes={styles}
            chartRef={chartRef}
            title={settings.title}
            activeMetrics={metrics}
            data={data}
            shareLink={shareLink}
            MetricNode={MetricNode}
            setOptions={setOptions}
            onDeleteChartClick={isSingleWidget ? undefined : onDeleteChartClick}
          />

          <ChartFullscreenBtn
            widget={widget}
            categories={categories}
            options={options}
            settings={settings}
            metrics={metrics}
            activeEvents={activeEvents}
            scale={scale}
            brushData={allTimeData}
            MetricColor={MetricColor}
            shareLink={shareLink}
          />
        </div>
      </div>

      {metricSettings && (
        <ChartMetricSettings
          className={styles.settings}
          metric={metricSettings}
          interval={settings.interval}
          slug={settings.slug}
          widget={widget}
          toggleMetric={onMetricRemove}
          rerenderWidgets={rerenderWidgets}
        />
      )}

      <ChartCanvas
        className={cx(styles.chart, isBlurred && styles.blur)}
        chartRef={chartRef}
        data={data}
        brushData={allTimeData}
        categories={categories}
        colors={HighlightedMetricColor}
        metrics={metrics}
        scale={scale}
        settings={settings}
        options={options}
        domainGroups={
          isDomainGroupingActive ? domainGroups : mirrorDomainGroups
        }
        isDomainGroupingActive={isDomainGroupingActive}
        isICOPriceActive={isICOPriceActive}
        isSelectingRange={isSelectingRange}
        onBrushChangeEnd={onBrushChangeEnd}
        onPointMouseUp={onPointMouseUp}
        onRangeSelecting={onRangeSelecting}
        onRangeSelected={onRangeSelected}
        syncTooltips={syncTooltips}
        setIsICOPriceDisabled={setIsICOPriceDisabled}
      />

      {isBlurred && (
        <div className={styles.restriction}>
          <Link to='/login' className={styles.restriction__link}>
            Sign in
          </Link>{' '}
          to unlock all Santiment Chart features
        </div>
      )}
    </div>
  )
}

export default Chart
