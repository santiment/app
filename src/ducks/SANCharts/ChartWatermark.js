import React from 'react'
import watermarkImg from './../../assets/watermark.svg'

const ChartWatermark = ({ className }) => {
  return <img className={className} src={watermarkImg} alt='watermark' />
}

export default ChartWatermark
