import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import {
  Button,
  Input,
  Select,
  Checkboxes,
  SearchWithSuggestions
} from '@santiment-network/ui'
import { connect } from 'react-redux'
import { selectIsTelegramConnected } from './../../pages/UserSelectors'
import { allProjectsForSearchGQL } from './../../pages/Projects/allProjectsGQL'
import styles from './TriggerForm.module.scss'

const METRICS = [
  { label: 'Price', value: 'price' },
  { label: 'Trending Words', value: 'trendingWords' }
]

const OPTIONS = {
  price: [
    { label: '% Threshold', value: 'price_percent_change' },
    { label: 'Absolute', value: 'absolute' }
  ]
}

class TriggerForm extends React.Component {
  state = {
    metric: 'price',
    target: 'santiment',
    option: 'percent',
    percentThreshold: 5,
    cooldown: '1h',
    timeWindow: '24h',
    channels: this.props.isTelegramConnected ? ['Telegram'] : []
  }

  static propTypes = {
    onSettingsChange: PropTypes.func.isRequired,
    isTelegramConnected: PropTypes.bool.isRequired
  }

  static defaultProps = {
    isTelegramConnected: false
  }

  componentDidMount () {
    this.props.onSettingsChange(this.state)
  }

  componentDidUpdate (prevProps, prevState) {
    this.props.onSettingsChange(this.state)
  }

  render () {
    const {
      data: { allProjects = [] }
    } = this.props
    return (
      <div>
        <div className={styles.row}>
          <label>Metrics</label>
        </div>
        <div className={styles.row}>
          <div className={styles.Field}>
            <Select
              placeholder='Choose a metric'
              options={METRICS}
              onChange={data => this.handleChange('metric', data)}
              value={this.state.metric}
            />
          </div>
          {this.state.metric !== 'trendingWords' && (
            <div className={styles.Field}>
              <Select
                placeholder='Choose an option'
                options={OPTIONS[this.state.metric]}
                onChange={data => this.handleChange('option', data)}
                value={this.state.option}
              />
            </div>
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.Field}>
            <label>Asset</label>
            <Select
              placeholder='For example, ethereum...'
              options={allProjects.map(asset => ({
                label: asset.slug,
                value: asset.slug
              }))}
              onChange={data => this.handleChange('target', data)}
              value={this.state.target}
            />
          </div>
        </div>
        {this.state.metric !== 'trendingWords' && (
          <div className={styles.row}>
            <div className={styles.Field}>
              <label>Threshold</label>
              <Input
                value={this.state.percentThreshold}
                id='percentThreshold'
                autoComplete='nope'
                type='text'
                name='percentThreshold'
                placeholder='setup the threshold'
                onChange={this.handleInputChange}
              />
            </div>
            <div className={styles.Field}>
              <label>Time Window</label>
              <Input
                value={this.state.timeWindow}
                id='timeWindow'
                autoComplete='nope'
                type='text'
                name='timeWindow'
                placeholder='setup the time window'
                onChange={this.handleInputChange}
              />
            </div>
          </div>
        )}
        <div className={styles.row}>
          <label>Notification settings</label>
        </div>
        <div className={styles.row}>
          <div className={styles.Field}>
            <label>Cooldown</label>
            <Input
              value={this.state.cooldown}
              id='cooldown'
              autoComplete='nope'
              type='text'
              name='cooldown'
              placeholder='setup the cooldown'
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className={styles.row}>
          <Checkboxes
            options={['Email', 'Telegram']}
            disabledIndexes={['Email']}
            defaultSelectedIndexes={['Telegram']}
            onSelect={this.handleNotificationChannels}
            style={{ marginRight: '15px' }}
          />
          {!this.props.isTelegramConnected && 'Connect'}
        </div>
      </div>
    )
  }

  handleChange = (field, data = {}) => {
    this.setState(prevState => {
      if (field === 'metric') {
        return {
          metric: data.value,
          option: prevState.metric !== data.value ? null : prevState.option
        }
      }
      return {
        [field]: (data || {}).value
      }
    })
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleNotificationChannels = (channel, { selectedIndexes }) => {
    this.setState({ channels: selectedIndexes })
  }
}

const mapStateToProps = state => {
  return {
    isTelegramConnected: selectIsTelegramConnected(state)
  }
}

const enhance = compose(
  connect(mapStateToProps),
  graphql(allProjectsForSearchGQL)
)

export default enhance(TriggerForm)
