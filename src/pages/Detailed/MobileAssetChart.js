import React from 'react'
import moment from 'moment'
import {
  ResponsiveContainer,
  ComposedChart,
  Legend,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine
} from 'recharts'
import { formatNumber } from './../../utils/formatting'
import styles from './MobileAssetChart.module.scss'

const MobileAssetChart = ({ data, slug: asset, icoPrice }) => {
  return (
    <div>
      <ResponsiveContainer width='100%' height={300}>
        <ComposedChart data={data}>
          <XAxis
            dataKey='datetime'
            tickLine={false}
            tickMargin={5}
            minTickGap={100}
            tickFormatter={timeStr => moment(timeStr).format('DD MMM YY')}
          />
          <YAxis
            yAxisId='axis-price'
            mirror
            axisLine={false}
            domain={['dataMin', 'auto']}
            tickFormatter={priceUsd =>
              formatNumber(priceUsd, { currency: 'USD' })
            }
          />
          <CartesianGrid vertical={false} stroke='#ebeef5' />
          <Tooltip
            labelFormatter={date => moment(date).format('dddd, MMM DD YYYY')}
            formatter={(value, name) => {
              if (name === `${asset}/USD`) {
                return formatNumber(value, { currency: 'USD' })
              }
              return value
            }}
          />
          <Line
            type='linear'
            yAxisId='axis-price'
            name={asset + '/USD'}
            dot={false}
            strokeWidth={1.5}
            dataKey='priceUsd'
            stroke={'var(--jungle-green)'}
          />
          {icoPrice && (
            <ReferenceLine
              yAxisId='axis-price'
              strokeDasharray='3 3'
              stroke='black'
              y={icoPrice}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
      {icoPrice && (
        <div className={styles.icoPrice}>
          {`ICO Price ${formatNumber(icoPrice, { currency: 'USD' })}`}
          <div className={styles.icoPriceLegend} />
        </div>
      )}
    </div>
  )
}

export default MobileAssetChart
