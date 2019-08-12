import React from 'react'
import { withState, compose, lifecycle } from 'recompose'
import UpgradeBtn from './../UpgradeBtn/UpgradeBtn'
import ShareableBtn from './ShareableBtn'
import ChartWidgetModal from './ChartWidgetModal'
import './ProjectChartHeader.css'

export const TimeFilterItem = ({
  disabled,
  interval,
  setFilter,
  value = '1d'
}) => {
  let cls = interval === value ? 'activated' : ''
  if (disabled) {
    cls += ' disabled'
  }
  return (
    <div className={cls} onClick={() => !disabled && setFilter(value)}>
      {value}
    </div>
  )
}

export const TimeFilter = props => (
  <div className='time-filter'>
    <TimeFilterItem value={'1d'} {...props} />
    <TimeFilterItem value={'1w'} {...props} />
    <TimeFilterItem value={'2w'} {...props} />
    <TimeFilterItem value={'1m'} {...props} />
    <TimeFilterItem value={'3m'} {...props} />
    <TimeFilterItem value={'all'} {...props} />
  </div>
)

export const CurrencyFilter = ({ ticker, isToggledBTC, toggleBTC }) => (
  <div className='currency-filter'>
    {ticker !== 'BTC' && (
      <div
        className={isToggledBTC ? 'activated' : ''}
        onClick={() => toggleBTC(true)}
      >
        BTC
      </div>
    )}
    <div
      className={!isToggledBTC ? 'activated' : ''}
      onClick={() => toggleBTC(false)}
    >
      USD
    </div>
  </div>
)

const ProjectChartHeader = ({
  from,
  to,
  slug,
  name,
  toggleBTC,
  isToggledBTC,
  interval,
  setFilter,
  shareableURL,
  sanbaseChart,
  ticker,
  isPremium
}) => {
  return (
    <div className='chart-header'>
      <div className='chart-datetime-settings'>
        <TimeFilter interval={interval} setFilter={setFilter} />
        {!isPremium && <UpgradeBtn>Unlock data</UpgradeBtn>}
      </div>
      <div className='chart-header-actions'>
        <CurrencyFilter
          ticker={ticker}
          isToggledBTC={isToggledBTC}
          toggleBTC={toggleBTC}
        />
        <ShareableBtn
          ticker={ticker}
          sanbaseChart={sanbaseChart}
          shareableURL={shareableURL}
        />
        <ChartWidgetModal
          slug={slug}
          title={`${name} (${ticker})`}
          timeRange={interval}
          from={from}
          to={to}
        />
      </div>
    </div>
  )
}

export default compose(
  withState('dates', 'changeFromTo', {
    from: undefined,
    to: undefined
  }),
  lifecycle({
    componentWillReceiveProps (nextProps) {
      if (
        this.props.from !== nextProps.from ||
        this.props.to !== nextProps.to
      ) {
        this.props.changeFromTo({
          from: nextProps.from,
          to: nextProps.to
        })
      }
    }
  })
)(ProjectChartHeader)
