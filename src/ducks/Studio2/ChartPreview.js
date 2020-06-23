import React, { useRef, useEffect, useState } from 'react'
import cx from 'classnames'
import { initChart } from '@santiment-network/chart'
import { clearCtx } from '../Chart/utils'
import { useWidgetMessageEffect } from './widgetMessageContext'
import styles from './Overview.module.scss'

const Phase = {
  IDLE: 'idle',
  LOADING: 'loading',
  LOADED: 'loaded',
}

const hasEverySelectedMetric = (metrics, selectedMetrics) =>
  metrics.length >= [...new Set(metrics.concat(selectedMetrics))].length

const ChartPreview = ({ widget, selectedMetrics, onClick }) => {
  const [phase, setPhase] = useState(Phase.IDLE)
  const [previousPhase, setPreviousPhase] = useState(phase)
  const [phaseStyles, setPhaseStyles] = useState(styles.idle)
  let [chart, setChart] = useState()
  const canvasRef = useRef(null)
  const circleRef = useRef(null)

  useEffect(() => {
    const { current: canvas } = canvasRef

    chart = initChart(canvas, canvas.clientWidth, canvas.clientHeight)
    setChart(chart)

    drawChart()
  }, [])

  useEffect(
    () => {
      if (phase === Phase.LOADING) return

      if (hasEverySelectedMetric(widget.metrics, selectedMetrics)) {
        setPhase(Phase.LOADED)
      } else {
        setPhase(Phase.IDLE)
      }
    },
    [selectedMetrics],
  )

  useEffect(
    () => {
      let timer

      switch (phase) {
        case Phase.LOADED:
          switch (previousPhase) {
            case Phase.LOADING:
              circleRef.current.onanimationiteration = ({ target }) => {
                target.onanimationiteration = null
                setPhaseStyles(cx(styles.loading, styles.success))
                timer = setTimeout(
                  () => newPhase(Phase.LOADED, Phase.IDLE),
                  900,
                )
              }
              break
            default:
              setPhaseStyles(styles.loaded)
          }
          break
        default:
          setPhaseStyles(styles[phase])
      }

      return () => clearTimeout(timer)
    },
    [phase, previousPhase],
  )

  useWidgetMessageEffect(widget, (phase) => {
    newPhase(phase)
    drawChart()
  })

  function newPhase(value, prevPhase = phase) {
    setPreviousPhase(prevPhase)
    setPhase(value)
  }

  function drawChart() {
    const { current: widgetChart } = widget.chartRef
    if (!widgetChart) return

    clearCtx(chart)
    chart.ctx.drawImage(
      widgetChart.canvas,
      0,
      0,
      chart.canvasWidth,
      chart.canvasHeight + 25,
    )
  }

  return (
    <div
      className={cx(styles.item, phaseStyles)}
      onClick={() => onClick(widget)}
    >
      <canvas ref={canvasRef} />

      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        xmlns='http://www.w3.org/2000/svg'
        fill='#000'
        className={styles.indicator}
      >
        <path
          d='M12.1603 6.48292C12.4627 6.18058 12.4627 5.69039 12.1603 5.38805C11.858 5.0857 11.3678 5.0857 11.0655 5.38805L7.13979 9.31373L5.45066 7.62461C5.14832 7.32226 4.65813 7.32226 4.35579 7.62461C4.05345 7.92695 4.05345 8.41714 4.35579 8.71948L6.59235 10.956C6.89469 11.2584 7.38488 11.2584 7.68722 10.956L12.1603 6.48292Z'
          className={styles.check}
        />
        <circle
          className='circle'
          cx='8'
          cy='8'
          r='7.3'
          fill='transparent'
          strokeWidth='1.5'
          ref={circleRef}
        />
      </svg>
    </div>
  )
}

export default ChartPreview
