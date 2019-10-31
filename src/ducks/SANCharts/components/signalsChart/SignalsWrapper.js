import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import throttle from 'lodash.throttle'
import {
  mapToPriceSignalLines,
  getSignalPrice,
  getSlugPriceSignals
} from './../../utils'
import { Metrics } from './../../data'
import {
  createTrigger,
  fetchSignals,
  removeTrigger
} from './../../../Signals/common/actions'
import { buildPriceSignal } from './../../../Signals/utils/utils'
import { checkIsLoggedIn } from '../../../../pages/UserSelectors'

const withSignals = WrappedComponent => {
  const HOComponent = props => {
    console.log(window.xToYCoordinates)

    const [state, setState] = useState({
      signalData: undefined
    })

    const onSignalHover = throttle((evt, value, signal) => {
      setState({
        ...state,
        signalData: buildChartSignalData(evt.cy, value, signal),
        signalPointHovered: true
      })
    }, 50)

    const onSignalLeave = throttle(() => {
      setState({
        ...state,
        signalData: undefined
      })
    }, 50)

    const onSignalClick = (target, evt, id) => {
      evt.stopPropagation()
      evt.preventDefault()

      onRemoveSignal(id, buildChartSignalData(target.cy, target.y))
    }

    const buildChartSignalData = (chartY, priceUsd, signal = undefined) => ({
      chartY,
      priceUsd,
      signal,
      lastPrice: getLastPrice()
    })

    const onChartHover = throttle((evt, metricRef) => {
      console.log(!canShowSignalLines())
      if (!canShowSignalLines() || evt.target.nodeName !== 'svg') {
        return
      }

      const { signalPointHovered } = state

      if (signalPointHovered) {
        return
      }

      if (
        metricRef &&
        metricRef.current &&
        metricRef.current.props.dataKey === Metrics.historyPrice.dataKey
      ) {
        const { offsetX, offsetY } = evt

        const { yAxis } = metricRef.current.props
        const { height, width } = yAxis

        if (offsetX <= width && offsetY <= height) {
          const { signals, slug } = props
          const priceUsd = getSignalPrice(window.xToYCoordinates, offsetY)
          if (priceUsd) {
            const existingSignalsWithSamePrice = getSlugPriceSignals(
              signals,
              slug,
              priceUsd
            )
            const signalData = buildChartSignalData(
              offsetY,
              priceUsd,
              existingSignalsWithSamePrice[0]
            )
            setState({
              ...state,
              signalData
            })
          }
        } else {
          setState({
            ...state,
            signalData: undefined
          })
        }
      }
    }, 100)

    const loadSignals = () => {
      const { fetchSignals } = props
      canShowSignalLines() && fetchSignals && fetchSignals()
    }

    useEffect(
      () => {
        const { isBeta, isLoggedIn } = props

        if (isBeta && isLoggedIn) {
          console.log('load signals!')
          loadSignals(props)
        }
      },
      [props.isBeta, props.isLoggedIn]
    )

    const canShowSignalLines = () => {
      const { metrics = [], isLoggedIn, isBeta } = props
      return isLoggedIn && isBeta && metrics.includes(Metrics.historyPrice)
    }

    const onRemoveSignal = (id, signalData = undefined) => {
      const { removeSignal } = props
      removeSignal(id)
      setState({
        ...state,
        signalData
      })
    }

    const onChartClick = () => {
      const { signalData: { priceUsd, chartY, type } = {} } = state

      if (priceUsd) {
        const { slug, signals, createSignal } = props
        const signal = buildPriceSignal(slug, priceUsd, type)

        const existingSignalsWithSamePrice = getSlugPriceSignals(
          signals,
          slug,
          priceUsd
        )
        if (existingSignalsWithSamePrice.length === 0) {
          createSignal(signal)
        } else {
          const [signal] = existingSignalsWithSamePrice
          signal &&
            onRemoveSignal(
              signal.id,
              buildChartSignalData(chartY, priceUsd, signal)
            )
        }
      }
    }

    const getLastPrice = () => {
      const { chartData } = props
      return window.xToYCoordinates[chartData.length - 1].priceUsd
    }

    const setxToYCoordinates = data => {
      window.xToYCoordinates = data
    }

    const { signals = [], slug } = props

    const { signalData } = state

    const isSignalsEnabled = canShowSignalLines()
    const signalLines =
      isSignalsEnabled && window.xToYCoordinates
        ? mapToPriceSignalLines({
          data: window.xToYCoordinates,
          slug,
          signals,
          onSignalHover,
          onSignalLeave,
          onSignalClick
        })
        : null

    return (
      <WrappedComponent
        isSignalsEnabled={isSignalsEnabled}
        signalLines={signalLines}
        signalData={signalData}
        onChartClick={onChartClick}
        onChartHover={onChartHover}
        setxToYCoordinates={setxToYCoordinates}
        {...props}
      />
    )
  }

  return HOComponent
}

const mapStateToProps = state => {
  const { signals: { all = [] } = {} } = state
  return {
    signals: all,
    isLoggedIn: checkIsLoggedIn(state)
  }
}

const mapDispatchToProps = dispatch => ({
  createSignal: payload => {
    dispatch(createTrigger(payload))
  },
  fetchSignals: () => {
    dispatch(fetchSignals())
  },
  removeSignal: id => {
    dispatch(removeTrigger(id))
  }
})

const HOC = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withSignals
)

export default HOC
