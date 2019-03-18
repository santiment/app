import React, { PureComponent } from 'react'
import { Modal, Icon, Label, Button } from '@santiment-network/ui'
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
import SearchProjects from '../Search/SearchProjects'
import styles from './Chart.module.scss'

class ChartSideButton extends PureComponent {
  state = {
    ticker: undefined
  }

  onSuggestionSelect = ({ ticker }) => {
    this.setState({ ticker })
  }

  render () {
    const { ticker } = this.state
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
        <SearchProjects
          onSuggestionSelect={this.onSuggestionSelect}
          inputProps={{
            placeholder: 'Search for the ticker',
            inplace: ticker
          }}
        />
        <GetTimeSeries
          price={
            ticker
              ? {
                slug: 'bitcoin',
                interval: '1d',
                from: '2019-03-10T17:17:57.711Z',
                timeRange: '3m'
              }
              : {}
          }
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
        <Button variant='flat'>
          <Label accent='malibu' variant='circle' /> Price
        </Button>
      </Modal>
    )
  }
}

export default ChartSideButton
