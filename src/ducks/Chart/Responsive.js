import React, { useState, useRef, useEffect } from 'react'
import { Chart } from './Modular'
import { withChartContext } from './context'

const IFRAME_STYLES = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  left: 0,
  zIndex: -1
}

const DEFAULT_STATE = {}

const ResponsiveChart = ({ children, padding, chartRef, ...props }) => {
  const iframeRef = useRef(null)
  const [dimensions, setDimensions] = useState(DEFAULT_STATE)

  useEffect(() => {
    const iframe = iframeRef.current
    iframe.contentWindow.onresize = () =>
      setDimensions({
        height: iframe.offsetHeight,
        width: iframe.offsetWidth
      })
  }, [])

  return (
    <Chart {...props} {...dimensions} padding={padding} chartRef={chartRef}>
      {children}
      <iframe
        title='resizer'
        ref={iframeRef}
        frameBorder='0'
        style={IFRAME_STYLES}
      />
    </Chart>
  )
}

export default withChartContext(ResponsiveChart)
