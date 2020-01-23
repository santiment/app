import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Signal from './Signal'
import { drawHoveredSignal, findPriceByY, makeSignalDrawable } from './helpers'
import { tooltipSettings } from '../settings'
import { clearCtx } from '../utils'
import {
  createTrigger,
  fetchSignals,
  removeTrigger
} from '../../../Signals/common/actions'
import { getSlugPriceSignals } from '../../utils'
import { buildPriceSignal } from '../../../Signals/utils/utils'
import { PRICE_CHANGE_TYPES } from '../../../Signals/utils/constants'

import styles from './index.module.scss'

const TEXT_SIGNAL = 'Signal '
const TEXT_ACTION = 'Click to '
const TEXT_RESULT = 'create a signal '
const TEXT_IFS = ['if price drops below ', 'if price raises above ']

const formatter = tooltipSettings.priceUsd.formatter

const Signals = ({
  slug,
  chart,
  data,
  signals,
  fetchSignals,
  createSignal,
  removeSignal
}) => {
  const [hovered, setHovered] = useState()

  console.log(signals)

  useEffect(() => {
    fetchSignals()
  }, [])

  function onMouseMove ({ nativeEvent: { offsetY: y } }) {
    if (hovered || data.length === 0) {
      return
    }
    const lastPrice = data[data.length - 1].priceUsd

    const price = findPriceByY(chart, y)
    const textPrice = formatter(price)

    drawHoveredSignal(chart, y, [
      TEXT_ACTION,
      TEXT_RESULT,
      TEXT_IFS[+(price > lastPrice)],
      textPrice
    ])
  }

  function onClick ({ nativeEvent: { offsetY: y } }) {
    if (hovered || data.length === 0) {
      return
    }

    const lastPrice = data[data.length - 1].priceUsd
    const price = findPriceByY(chart, y)
    const type = PRICE_CHANGE_TYPES[price > lastPrice ? 'ABOVE' : 'BELOW']

    const signal = buildPriceSignal(slug, price, type)
    createSignal(signal)
  }

  function onMouseLeave () {
    clearCtx(chart, chart.tooltip.ctx)
  }

  function setHoveredSignal (signal) {
    setHovered(signal)
    if (signal) {
      const { type, value, y } = signal

      drawHoveredSignal(chart, y, [
        TEXT_SIGNAL + TEXT_IFS[+(type === 'ABOVE')],
        formatter(value)
      ])
    }
  }

  return chart ? (
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
    </div>
  ) : null
}

// NOTE: Took from previous implementation [@vanguard | Jan 23, 2020]
const mapStateToProps = ({ signals }, { slug, chart, scale }) => {
  return {
    signals: getSlugPriceSignals(signals.all || [], slug)
      .map(signal => makeSignalDrawable(signal, chart, scale))
      .filter(Boolean)
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
)(Signals)
