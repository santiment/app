import React, { PureComponent } from 'react'
import { Modal, Icon } from '@santiment-network/ui'
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea
} from 'recharts'
import GetTimeSeries from '../../ducks/GetTimeSeries/GetTimeSeries'
import SearchContainer from '../Search/SearchContainer'
import styles from './Chart.module.scss'

class ChartSideButton extends PureComponent {
  render () {
    return (
      <Modal
        title='Chart Builder'
        trigger={
          <div className='md-sd-button'>
            <Icon type='finance' />
          </div>
        }
        className={styles.modal}
      >
        <SearchContainer />
        <GetTimeSeries
          price={{
            slug: 'bitcoin',
            interval: '1d',
            from: '2019-03-10T17:17:57.711Z',
            timeRange: '3m'
          }}
          meta={{
            mergedByDatetime: true
          }}
          render={({ timeseries = [] }) => (
            <ResponsiveContainer height={300} width='100%'>
              <ComposedChart data={timeseries}>
                <YAxis yAxisId='axis-price' />
                <XAxis dataKey='datetime' />
                <Area type='linear' yAxisId='axis-price' dataKey='priceUsd' />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        />
      </Modal>
    )
  }
}

export default ChartSideButton
