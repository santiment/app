import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Signal from './Signal'
import Add from './Add'
import {
  SIGNAL_ABOVE,
  SIGNAL_BELOW,
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
import { PRICE_CHANGE_TYPES } from '../../Signals/utils/constants'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import styles from './index.module.scss'
import { buildValueChangeSuggester } from '../../Studio/Alerts/suggestions/helpers'

const TEXT_SIGNAL = 'Alert '
const TEXT_ACTION = 'Click to '
const TEXT_RESULT = 'create an alert '
const TEXT_IFS = {
  daily_active_addresses: [
    'if DAA count goes below ',
    'if DAA count goes above '
  ]
}

const MOVING_TEXT_BY_SIGN = [' drops below ', ' rises above ']

const getTextIf = (metric, index) => {
  const texts = TEXT_IFS[metric.key]

  if (texts) {
    return texts[index]
  }

  return `if ${metric.label.toLowerCase()}${MOVING_TEXT_BY_SIGN[index]}`
}

const priceFormatter = Metric.price_usd.formatter

const Signals = ({
  slug,
  chart,
  data,
  signals,
  fetchSignals,
  createSignal,
  removeSignal,
  metrics
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
      TEXT_ACTION,
      TEXT_RESULT,
      getTextIf(Metric[key], +(value > lastValue)),
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

    const type =
      PRICE_CHANGE_TYPES[value > lastValue ? SIGNAL_ABOVE : SIGNAL_BELOW]

    const suggester = AlertBuilder[metric.key] || buildValueChangeSuggester
    createSignal(suggester(slug, value, type, metric))
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
        TEXT_SIGNAL + getTextIf(Metric.price_usd, +(type === SIGNAL_ABOVE)),
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
    isLoggedIn: checkIsLoggedIn(state),
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
)(({ isLoggedIn, metrics, ...props }) => {
  const alertMetrics = useAlertMetrics(metrics)

  return isLoggedIn && alertMetrics.length > 0 ? (
    <Signals {...props} metrics={alertMetrics} />
  ) : null
})
