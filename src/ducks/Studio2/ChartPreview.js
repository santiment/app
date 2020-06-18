import React, { useRef, useEffect, useState } from 'react'
import cx from 'classnames'
import { initChart } from '@santiment-network/chart'
import { clearCtx } from '../Chart/utils'
import { useWidgetEffect } from './Manager/hooks'
import styles from './Overview.module.scss'

const Phase = {
  IDLE: 'idle',
  LOADING: 'loading',
  LOADED: 'loaded',
}

const ChartPreview = ({ widget, onClick, ...props }) => {
  const [state, setState] = useState(Phase.IDLE)
  let [chart, setChart] = useState()
  const canvasRef = useRef(null)

  useEffect(() => {
    const { current: canvas } = canvasRef

    chart = initChart(canvas, canvas.clientWidth, canvas.clientHeight)
    setChart(chart)

    drawChart()
  }, [])

  useWidgetEffect(widget, (phase) => {
    console.log(phase)

    if (phase === 'loading') {
      setState(Phase.LOADING)
    } else if (phase === 'loaded') {
      setState(Phase.LOADED)
      document.querySelector('.circle').onanimationiteration = ({ target }) => {
        target.onanimationiteration = null
        document
          .querySelector('.' + styles.indicator)
          .classList.add(styles.finish)
      }
    }

    drawChart()
  })

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
      className={cx(styles.item, styles[state])}
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
        />
      </svg>
    </div>
  )
}

export default ChartPreview
