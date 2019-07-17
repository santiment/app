import React from 'react'
import { ReferenceArea } from 'recharts'
import PaywallAreaShape from './PaywallAreaShape'
import PaywallAreaLabel from './PaywallAreaLabel'
import { dateDifference, DAY } from '../../utils/dates'

const closesTo = (dateToCompare, datesArray) => {
  const target = +new Date(dateToCompare)
  const diff = datesArray.map(item => Math.abs(target - new Date(item)))
  const index = diff.indexOf(Math.min(...diff))
  return datesArray[index]
}

const isLessWeek = (end, start) => {
  const { diff } = dateDifference({
    from: new Date(start),
    to: new Date(end),
    format: DAY
  })
  return diff <= 7
}

const mixWithPaywallArea = ({
  data,
  dataKey,
  yAxisId,
  domain = true,
  stroke = '#ffad4d',
  strokeOpacity = 0.9,
  ...rest
}) => {
  if (!data || data.length === 0) {
    return
  }
  const datetimes = data.map(item => item.datetime)
  const startX = data[0].datetime

  const date = new Date(data[data.length - 1].datetime)
  date.setMonth(date.getMonth() - 3)
  const endX = closesTo(date.toISOString(), datetimes)

  const startLastDayX = data[data.length - 2].datetime
  const endLastDayX = data[data.length - 1].datetime

  const props = {
    yAxisId,
    stroke,
    strokeOpacity,
    shape: PaywallAreaShape
  }

  if (domain) {
    props.y1 = domain[0] || Math.min(...data.map(item => item[dataKey]))
    props.y2 = domain[1] || Math.max(...data.map(item => item[dataKey]))
  }

  return [
    <pattern
      key={`${dataKey}-pattern`}
      id='pattern-stripe'
      width='32'
      height='8'
      patternUnits='userSpaceOnUse'
      patternTransform='rotate(45)'
    >
      <rect width='16' height='8' transform='translate(0,0)' fill='white' />
    </pattern>,
    <mask key={`${dataKey}-mask`} id='mask-stripe'>
      <rect
        x='0'
        y='0'
        width='100%'
        height='100%'
        fill='url(#pattern-stripe)'
      />
    </mask>,
    <ReferenceArea
      onClick={() => window.alert('check')}
      onMouseMove={() => window.alert('check')}
      key={`${dataKey}-paywallMoreThan3Months`}
      x1={startX}
      x2={endX}
      label={<PaywallAreaLabel />}
      {...props}
      {...rest}
    />,
    <ReferenceArea
      key={`${dataKey}-paywallLastDay`}
      x1={startLastDayX}
      x2={endLastDayX}
      label={
        isLessWeek(endLastDayX, startX) && (
          <PaywallAreaLabel withGlitch={true} />
        )
      }
      {...props}
      {...rest}
      shape={<PaywallAreaShape withGlitch={true} />}
    />
  ]
}

export default mixWithPaywallArea
