import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Signal from './Signal'
import Add from './Add'
import {
  SIGNAL_ABOVE,
  drawHoveredSignal,
  findMetricValueByY,
  findMetricLastValue,
  makeSignalDrawable,
  checkPriceMetric,
  AlertBuilder,
} from './helpers'
import { useAlertMetrics } from './hooks'
import { useChart } from '../context'
import { clearCtx } from '../utils'
import { getSlugPriceSignals } from '../../SANCharts/utils'
import { Metric } from '../../dataHub/metrics'
import { TooltipSetting } from '../../dataHub/tooltipSettings'
import { useSignals } from '../../Signals/common/getSignals'
import { createTrigger, removeTrigger } from '../../Signals/common/actions'
import { buildValueChangeSuggester } from '../../Studio/Alerts/suggestions/helpers'
import LoginPopup from '../../../components/banners/feature/PopupBanner'
import styles from './index.module.scss'

const TEXT_SIGNAL = 'Alert '
const TEXT_ACTION = 'Click to create an alert '
const SHORT_TEXT_ACTION = 'Create an alert '
const TEXT_IFS = {
  daily_active_addresses: ['if DAA count goes below ', 'if DAA count goes above '],
}

const MOVING_TEXT_BY_SIGN = [' drops below ', ' rises above ']

const getTextIf = (metric, index, useShortRecord) => {
  const texts = TEXT_IFS[metric.key]

  if (texts) {
    return texts[index]
  }

  let label = metric.label

  if (useShortRecord) {
    label = metric.shortLabel || label
  }

  return `if ${label.toLowerCase()}${MOVING_TEXT_BY_SIGN[index]}`
}

const priceFormatter = Metric.price_usd.formatter
const DEFAULT_SIGNALS = []

const Signals = ({
  width,
  slug,
  asset,
  selector = 'slug',
  chart,
  data,
  createSignal,
  removeSignal,
  metrics,
  useShortRecord,
}) => {
  const [isHovered, setIsHovered] = useState()
  const [hoverPoint, setHoverPoint] = useState()
  const { data: userSignals } = useSignals()
  const [signals, setSignals] = useState(DEFAULT_SIGNALS)

  useEffect(() => {
    chart.isAlertsActive = true
    return () => (chart.isAlertsActive = false)
  }, [])

  useEffect(() => {
    buildSignals()
    // TODO: remove observer gaurd check when all charts are migrated [@vanguard | Oct 20, 2020]
    const observer = chart.plotManager || chart.observer
    return observer && observer.subscribe(buildSignals)
  }, [userSignals, slug])

  function buildSignals () {
    setSignals(
      getSlugPriceSignals(userSignals, slug)
        .map((signal) => makeSignalDrawable(signal, chart))
        .filter(Boolean),
    )
  }

  function onMouseMove ({ target, currentTarget, nativeEvent: { offsetY: y } }) {
    if (isHovered || data.length === 0 || target !== currentTarget) {
      return
    }

    const metricValues = metrics.map((metric) => ({
      key: metric.base ? metric.base.key : metric.key,
      project: metric.project,
      value: findMetricValueByY(chart, metric, y),
      lastValue: findMetricLastValue(data, metric),
    }))

    const priceIndex = metrics.findIndex(checkPriceMetric)
    const { key, value, lastValue } = metricValues[priceIndex === -1 ? 0 : priceIndex]

    if (value === undefined) return

    setHoverPoint({ y, metricValues })

    drawHoveredSignal(chart, y, [
      useShortRecord ? SHORT_TEXT_ACTION : TEXT_ACTION,
      getTextIf(Metric[key], +(value > lastValue), useShortRecord),
      TooltipSetting[key].formatter(value),
    ])
  }

  function onClick ({ target, currentTarget, nativeEvent: { offsetY: y } }) {
    if (isHovered || data.length === 0 || target !== currentTarget) {
      return
    }

    let metric = metrics.find(checkPriceMetric) || metrics[0]
    const value = findMetricValueByY(chart, metric, y)
    const lastValue = findMetricLastValue(data, metric)

    if (value === undefined) return

    // TODO: Refactor [@vanguard | Nov  6, 2020]
    const alertSlug = metric.project ? metric.project.slug : slug
    metric = metric.base ? metric.base : metric

    const suggester = AlertBuilder[metric.key] || buildValueChangeSuggester
    const newSignal = suggester(metric)({
      value,
      lastValue,
      metric,
      slug: alertSlug,
    })

    createSignal(newSignal.alert)
  }

  function onMouseLeave () {
    setHoverPoint()
    clearCtx(chart, chart.tooltip.ctx)
  }

  function setHoveredSignal (signal) {
    setIsHovered(signal)
    if (signal) {
      const { type, value, y } = signal

      drawHoveredSignal(chart, y, [
        TEXT_SIGNAL + getTextIf(Metric.price_usd, +(type === SIGNAL_ABOVE), useShortRecord),
        priceFormatter(value),
      ])
    }
  }

  return (
    <div
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={styles.wrapper}
      style={{
        width: width || chart.padding.right - (chart.rightAxisMargin || 0),
        height: chart.height + chart.top,
      }}
    >
      {signals.map((signal) => (
        <Signal
          key={signal.id}
          signal={signal}
          setHovered={setHoveredSignal}
          removeSignal={removeSignal}
        />
      ))}

      {hoverPoint && (
        <Add
          hoverPoint={hoverPoint}
          slug={slug}
          selector={selector}
          asset={asset}
          data={data}
          createAlert={createSignal}
          onDialogClose={onMouseLeave}
        />
      )}
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  createSignal: (payload) => dispatch(createTrigger(payload)),
  removeSignal: (id) => dispatch(removeTrigger(id)),
})

export default connect(
  null,
  mapDispatchToProps,
)(({ metrics, ...props }) => {
  const chart = props.chart || useChart()
  const alertMetrics = useAlertMetrics(metrics)

  if (alertMetrics.length === 0 || chart.isSelecting) {
    return null
  }

  return (
    <LoginPopup>
      <Signals chart={chart} {...props} metrics={alertMetrics} />
    </LoginPopup>
  )
})
