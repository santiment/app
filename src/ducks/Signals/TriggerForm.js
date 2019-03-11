import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import {
  Button,
  Input,
  Select,
  Checkboxes,
  Selector,
  SearchWithSuggestions,
  Message
} from '@santiment-network/ui'
import { Formik, Form, Field } from 'formik'
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
    { label: 'Absolute', value: 'price_absolute_change' }
  ]
}

class TriggerForm extends React.Component {
  state = {
    metric: 'price',
    target: 'santiment',
    option: 'price_percent_change',
    cooldown: '24h',
    timeWindow: '24h',
    channels: this.props.isTelegramConnected ? ['Telegram'] : []
  }

  constructor (props) {
    super(props)
    this.form = React.createRef()
  }

  static propTypes = {
    onSettingsChange: PropTypes.func.isRequired,
    isTelegramConnected: PropTypes.bool.isRequired
  }

  static defaultProps = {
    isTelegramConnected: false
  }

  render () {
    const {
      data: { allProjects = [] }
    } = this.props
    return (
      <Formik
        initialValues={{
          percentThreshold: 5
        }}
        isInitialValid
        validate={values => {
          let errors = {}
          if (!values.percentThreshold) {
            errors.percentThreshold = 'Required'
          } else if (values.percentThreshold <= 0) {
            errors.percentThreshold = 'Must be more 0'
          }
          if (this.state.channels[0] !== 'Telegram') {
            errors.channels = 'You must setup notification channel'
          }
          return errors
        }}
        ref={this.form}
        onSubmit={(values, { setSubmitting }) => {
          this.props.onSettingsChange({ values, ...this.state })
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          isValid,
          ...rest
        }) => (
          <Form>
            <div className={styles.row}>
              <label>Metrics</label>
            </div>
            <div className={styles.row}>
              <div className={styles.Field}>
                <Select
                  placeholder='Choose a metric'
                  options={METRICS}
                  disabled
                  onChange={data => this.handleChange('metric', data)}
                  value={this.state.metric}
                />
              </div>
              {this.state.metric !== 'trendingWords' && (
                <div className={styles.Field}>
                  <Select
                    placeholder='Choose an option'
                    disabled
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
                  <Field
                    value={values.percentThreshold}
                    id='percentThreshold'
                    autoComplete='nope'
                    type='number'
                    name='percentThreshold'
                    placeholder='Setup the threshold'
                    isError={errors.percentThreshold}
                    defaultValue={errors.percentThreshold}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    component={Input}
                  />
                </div>
                <div className={styles.Field}>
                  <label>Time Window</label>
                  <Input
                    value={this.state.timeWindow}
                    id='timeWindow'
                    autoComplete='nope'
                    type='text'
                    disabled
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
                <Selector
                  id='cooldown'
                  options={['1h', '24h']}
                  onSelectOption={this.handleSelectCooldown}
                  defaultSelected={this.state.cooldown}
                />
              </div>
            </div>
            <div className={styles.row}>
              <Checkboxes
                options={['Email', 'Telegram']}
                disabledIndexes={
                  this.props.isTelegramConnected
                    ? ['Email']
                    : ['Email', 'Telegram']
                }
                defaultSelectedIndexes={this.state.channels}
                onSelect={this.handleNotificationChannels}
                style={{ marginRight: '15px' }}
              />
              {!this.props.isTelegramConnected && (
                <Button
                  className={styles.connectLink}
                  variant='ghost'
                  as={Link}
                  to='/account'
                >
                  Telegram<span className={styles.connectLink}>Connect</span>
                </Button>
              )}
            </div>

            {errors.channels && (
              <div className={cx(styles.row, styles.messages)}>
                <Message variant='warn'>{errors.channels}</Message>
              </div>
            )}
            <Button
              type='submit'
              disabled={!isValid || isSubmitting}
              isActive={isValid && !isSubmitting}
              variant={'fill'}
              accent='positive'
            >
              Continue
            </Button>
          </Form>
        )}
      </Formik>
    )
  }

  handleSelectCooldown = cooldown => {
    this.setState({ cooldown })
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
    this.setState({ channels: selectedIndexes }, () => {
      this.form.current.validateForm()
    })
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
