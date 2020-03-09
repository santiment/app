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
import { Metrics } from '../../data'
import { getSlugPriceSignals } from '../../utils'
import {
  createTrigger,
  fetchSignals,
  removeTrigger
} from '../../../Signals/common/actions'
import { PRICE_CHANGE_TYPES } from '../../../Signals/utils/constants'
import { checkIsLoggedIn } from '../../../../pages/UserSelectors'
import styles from './index.module.scss'

const TEXT_SIGNAL = 'Alert '
const TEXT_ACTION = 'Click to '
const TEXT_RESULT = 'create an alert '
const TEXT_IFS = {
  price_usd: ['if price drops below ', 'if price raises above '],
  daily_active_addresses: [
    'if DAA count goes below ',
    'if DAA count goes above '
  ]
}

const priceFormatter = Metrics.price_usd.formatter

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

    const metricValues = metrics.map(Metric => ({
      key: Metric.key,
      value: findMetricValueByY(chart, Metric, y),
      lastValue: findMetricLastValue(data, Metric)
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
      TEXT_IFS[key][+(value > lastValue)],
      Metrics[key].formatter(value)
    ])
  }

  function onClick ({ target, currentTarget, nativeEvent: { offsetY: y } }) {
    if (isHovered || data.length === 0 || target !== currentTarget) {
      return
    }

    const Metric = metrics.find(checkPriceMetric) || metrics[0]
    const value = findMetricValueByY(chart, Metric, y)
    const lastValue = findMetricLastValue(data, Metric)

    if (value === undefined) return

    const type =
      PRICE_CHANGE_TYPES[value > lastValue ? SIGNAL_ABOVE : SIGNAL_BELOW]

    createSignal(AlertBuilder[Metric.key](slug, value, type))
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
        TEXT_SIGNAL + TEXT_IFS.price_usd[+(type === SIGNAL_ABOVE)],
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
)(props => {
  const alertMetrics = useAlertMetrics(props.metrics)
  const { chart, isLoggedIn } = props

  return isLoggedIn && chart && alertMetrics.length > 0 ? (
    <Signals {...props} metrics={alertMetrics} />
  ) : null
})
