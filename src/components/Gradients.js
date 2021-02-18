import React from 'react'

const Gradients = ({
  downColor = 'var(--persimmon)',
  upColor = 'var(--lima)'
}) => (
  <>
    <linearGradient id='totalDown' x1='0' x2='0' y1='0' y2='1'>
      <stop offset='5%' stopColor={downColor} stopOpacity={0.3} />
      <stop offset='95%' stopColor='#fff' stopOpacity={0} />
    </linearGradient>
    <linearGradient id='totalUp' x1='0' x2='0' y1='0' y2='1'>
      <stop offset='5%' stopColor={upColor} stopOpacity={0.3} />
      <stop offset='95%' stopColor='#fff' stopOpacity={0} />
    </linearGradient>
  </>
)

export default Gradients
