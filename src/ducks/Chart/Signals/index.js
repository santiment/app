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
  AlertBuilder
} from './helpers'
import { useAlertMetrics } from './hooks'
import { clearCtx } from '../utils'
import { getSlugPriceSignals } from '../../SANCharts/utils'
import { Metric } from '../../dataHub/metrics'
import {
  createTrigger,
  fetchSignals,
  removeTrigger
} from '../../Signals/common/actions'
import { buildValueChangeSuggester } from '../../Studio/Alerts/suggestions/helpers'
import LoginDialogWrapper from '../../../components/LoginDialog/LoginDialogWrapper'
import styles from './index.module.scss'

const TEXT_SIGNAL = 'Alert '
const TEXT_ACTION = 'Click to create an alert '
const SHORT_TEXT_ACTION = 'Create an alert '
const TEXT_IFS = {
  daily_active_addresses: [
    'if DAA count goes below ',
    'if DAA count goes above '
  ]
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

const Signals = ({
  slug,
  selector = 'slug',
  chart,
  data,
  signals,
  fetchSignals,
  createSignal,
  removeSignal,
  metrics,
  useShortRecord
}) => {
  const [isHovered, setIsHovered] = useState()
  const [hoverPoint, setHoverPoint] = useState()

  useEffect(() => {
    if (signals.length === 0) {
      fetchSignals()
    }
    chart.isAlertsActive = true

    return () => (chart.isAlertsActive = false)
  }, [])

  function onMouseMove ({ target, currentTarget, nativeEvent: { offsetY: y } }) {
    if (isHovered || data.length === 0 || target !== currentTarget) {
      return
    }

    const metricValues = metrics.map(metric => ({
      key: metric.key,
      value: findMetricValueByY(chart, metric, y),
      lastValue: findMetricLastValue(data, metric)
    }))

    const priceIndex = metrics.findIndex(checkPriceMetric)
    const { key, value, lastValue } = metricValues[
      priceIndex === -1 ? 0 : priceIndex
    ]

    if (value === undefined) return

    setHoverPoint({ y, metricValues })

    drawHoveredSignal(chart, y, [
      useShortRecord ? SHORT_TEXT_ACTION : TEXT_ACTION,
      getTextIf(Metric[key], +(value > lastValue), useShortRecord),
      Metric[key].formatter(value)
    ])
  }

  function onClick ({ target, currentTarget, nativeEvent: { offsetY: y } }) {
    if (isHovered || data.length === 0 || target !== currentTarget) {
      return
    }
    const metric = metrics.find(checkPriceMetric) || metrics[0]
    const value = findMetricValueByY(chart, metric, y)
    const lastValue = findMetricLastValue(data, metric)

    if (value === undefined) return

    const suggester = AlertBuilder[metric.key] || buildValueChangeSuggester
    const newSignal = suggester(metric)({ slug, value, lastValue, metric })

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
        TEXT_SIGNAL +
          getTextIf(Metric.price_usd, +(type === SIGNAL_ABOVE), useShortRecord),
        priceFormatter(value)
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
        width: chart.left,
        height: chart.height + chart.top
      }}
    >
      {signals.map(signal => (
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
          data={data}
          createAlert={createSignal}
          onDialogClose={onMouseLeave}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state, { slug, chart, scale }) => {
  return {
    signals: chart
      ? getSlugPriceSignals(state.signals.all || [], slug)
        .map(signal => makeSignalDrawable(signal, chart, scale))
        .filter(Boolean)
      : []
  }
}

const mapDispatchToProps = dispatch => ({
  createSignal: payload => dispatch(createTrigger(payload)),
  fetchSignals: () => dispatch(fetchSignals()),
  removeSignal: id => dispatch(removeTrigger(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(({ metrics, ...props }) => {
  const alertMetrics = useAlertMetrics(metrics)

  if (alertMetrics.length === 0) {
    return null
  }

  return (
    <LoginDialogWrapper title='Create signal'>
      <Signals {...props} metrics={alertMetrics} />
    </LoginDialogWrapper>
  )
})
