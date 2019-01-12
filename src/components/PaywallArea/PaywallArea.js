import React from 'react'
import moment from 'moment'
import { ReferenceArea } from 'recharts'
import PaywallAreaShape from './PaywallAreaShape'
import PaywallAreaLabel from './PaywallAreaLabel'

const closesTo = (dateToCompare, datesArray) => {
  const diff = datesArray.map(item =>
    Math.abs(moment(dateToCompare).unix() - moment(item).unix())
  )
  const index = diff.indexOf(Math.min(...diff))
  return datesArray[index]
}

const isLessWeek = (end, start) => {
  const duration = moment.duration(moment(end).diff(moment(start)))
  const days = duration.asDays()
  return days <= 7
}

const mixWithPaywallArea = ({
  data,
  dataKey,
  yAxisId,
  domain,
  stroke = '#ffad4d',
  strokeOpacity = 0.9,
  ...rest
}) => {
  if (!data || data.length === 0) {
    return
  }
  const datetimes = data.map(item => item.datetime)
  const startX = data[0].datetime
  const endX = closesTo(
    moment(data[data.length - 1])
      .subtract(3, 'M')
      .toISOString(),
    datetimes
  )
  const startLastDayX = data[data.length - 2].datetime
  const endLastDayX = data[data.length - 1].datetime
  const y1 =
    domain && domain.length === 1
      ? domain[0]
      : Math.min(...data.map(item => item[dataKey]))
  const y2 =
    domain && domain.length === 2
      ? domain[1]
      : Math.max(...data.map(item => item[dataKey]))
  const props = {
    yAxisId,
    y1,
    y2,
    stroke,
    strokeOpacity,
    shape: PaywallAreaShape
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
