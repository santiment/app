import React from 'react'
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

const withSignals = WrappedComponent => {
  class withSignalsWrapper extends React.Component {
    state = {
      signalData: undefined,
      signals: []
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
      console.log(
        'HOComponent updated',
        this.props,
        window.xToYCoordinates,
        this
      )

      const { isBeta, isLoggedIn } = this.props

      if (
        (!prevProps.isBeta || !prevProps.isLoggedIn) &&
        isBeta &&
        isLoggedIn
      ) {
        this.loadSignals(this.props)
      }
    }

    onSignalHover = throttle((evt, value, signal) => {
      this.setState({
        signalData: this.buildChartSignalData(evt.cy, value, signal),
        signalPointHovered: true
      })
    }, 50)

    onSignalLeave = throttle(() => {
      this.setState({
        signalData: undefined,
        signalPointHovered: false
      })
    }, 50)

    onSignalClick = (target, evt, id) => {
      evt.stopPropagation()
      evt.preventDefault()

      this.onRemoveSignal(id, this.buildChartSignalData(target.cy, target.y))
    }

    onChartHover = throttle((evt, metricRef) => {
      console.log(!this.canShowSignalLines(), this.props)
      if (!this.canShowSignalLines() || evt.target.nodeName !== 'svg') {
        return
      }

      const { signalPointHovered } = this.state

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
          const { signals, slug } = this.props
          const priceUsd = getSignalPrice(window.xToYCoordinates, offsetY)
          if (priceUsd) {
            const existingSignalsWithSamePrice = getSlugPriceSignals(
              signals,
              slug,
              priceUsd
            )
            const signalData = this.buildChartSignalData(
              offsetY,
              priceUsd,
              existingSignalsWithSamePrice[0]
            )
            this.setState({
              signalData
            })
          }
        } else {
          this.setState({
            signalData: undefined
          })
        }
      }
    }, 100)

    buildChartSignalData = (chartY, priceUsd, signal) => ({
      chartY,
      priceUsd,
      signal,
      lastPrice: this.getLastPrice()
    })

    loadSignals = () => {
      const { fetchSignals } = this.props
      console.log('try loadSignals', this.props)
      this.canShowSignalLines() && fetchSignals && fetchSignals()
    }

    canShowSignalLines = () => {
      const { metrics = [], isLoggedIn, isBeta } = this.props
      return isLoggedIn && isBeta && metrics.includes(Metrics.historyPrice)
    }

    onRemoveSignal = (id, signalData = undefined) => {
      const { removeSignal } = this.props
      removeSignal(id)
      this.setState({
        signalData
      })
    }

    onChartClick = () => {
      const { signalData: { priceUsd, chartY, type } = {} } = this.state

      if (priceUsd) {
        const { slug, signals, createSignal } = this.props
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
            this.onRemoveSignal(
              signal.id,
              this.buildChartSignalData(chartY, priceUsd, signal)
            )
        }
      }
    }

    getLastPrice = () => {
      const { chartData } = this.props

      if (chartData.length === 0) {
        return undefined
      }

      return chartData[chartData.length - 1].priceUsd
    }

    setxToYCoordinates = data => {
      window.xToYCoordinates = data
    }

    render () {
      const { signals = [], slug } = this.props

      const { signalData } = this.state

      const isSignalsEnabled = this.canShowSignalLines()

      const onSignalHover = this.onSignalHover
      const onSignalLeave = this.onSignalLeave
      const onSignalClick = this.onSignalClick

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
          onChartClick={this.onChartClick}
          onChartHover={this.onChartHover}
          setxToYCoordinates={this.setxToYCoordinates}
          {...this.props}
        />
      )
    }
  }

  const mapStateToProps = state => {
    const { signals: { all = [] } = {} } = state
    return {
      signals: all
    }
  }

  const mapDispatchToProps = dispatch => ({
    createSignal: payload => {
      dispatch(createTrigger(payload))
    },
    fetchSignals: () => {
      console.log('fetchSignals')
      dispatch(fetchSignals())
    },
    removeSignal: id => {
      dispatch(removeTrigger(id))
    }
  })

  const enhanceWrapper = compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )

  return enhanceWrapper(withSignalsWrapper)
}

export default withSignals
