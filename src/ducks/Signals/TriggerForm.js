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
import { fetchHistorySignalPoints } from './actions'
import FormikEffect from './FormikEffect'
import SignalPreview from './SignalPreview'
import styles from './TriggerForm.module.scss'

const METRICS = [
  { label: 'Price', value: 'price' },
  { label: 'Trending Words', value: 'trendingWords' }
]

const OPTIONS = {
  price: [
    { label: 'Percentage Change', value: 'price_percent_change' },
    { label: 'Absolute', value: 'price_absolute_change' }
  ]
}

const defaultPercentTreshold = 5

export class TriggerForm extends React.Component {
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

  componentDidMount () {
    this.props.getSignalBacktestingPoints({
      cooldown: this.state.cooldown,
      settings: {
        percent_threshold: defaultPercentTreshold,
        target: { slug: this.state.target },
        time_window: this.state.timeWindow,
        type: this.state.option
      }
    })
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
      data: { allProjects = [] },
      getSignalBacktestingPoints
    } = this.props
    return (
      <Formik
        initialValues={{
          percentThreshold: defaultPercentTreshold,
          target: 'ethereum',
          metric: {
            label: 'Price',
            value: 'price'
          },
          option: OPTIONS['price'][0]
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
          console.log(values)
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
            <FormikEffect
              onChange={(current, prev) => {
                if (
                  current.values.percentThreshold !==
                  prev.values.percentThreshold
                ) {
                  getSignalBacktestingPoints({
                    cooldown: this.state.cooldown,
                    settings: {
                      percent_threshold: current.values.percentThreshold,
                      target: { slug: current.values.target },
                      time_window: this.state.timeWindow,
                      type: current.values.option.value
                    }
                  })
                }
              }}
            />

            <div className={styles.row}>
              <div className={styles.Field}>
                <label>Asset</label>
                {(() => {
                  // console.log(rest, values)
                })()}
                <Field
                  name='target'
                  render={({ field, form }) => (
                    <Select
                      options={allProjects.map(asset => ({
                        label: asset.slug,
                        value: asset.slug
                      }))}
                      onChange={data => {
                        form.setFieldValue('target', (data || {}).value)
                        form.setFieldTouched('target', true)
                      }}
                      value={{
                        label: field.value,
                        value: field.value
                      }}
                    />
                  )}
                />
              </div>
            </div>

            <div className={styles.row}>
              <label>Metrics</label>
            </div>
            <div className={styles.row}>
              <FieldCustomSelect
                name='metric'
                placeholder='Choose a metric'
                options={METRICS}
              />
              {OPTIONS[(values.metric || {}).value] &&
                OPTIONS[(values.metric || {}).value].length > 0 && (
                <FieldCustomSelect
                  name='option'
                  placeholder='Choose an option'
                  options={OPTIONS[values.metric.value]}
                />
              )}
            </div>

            {this.state.metric !== 'trendingWords' && (
              <div className={styles.row}>
                <div className={styles.Field}>
                  <label>Percentage change</label>
                  <Field
                    value={values.percentThreshold}
                    id='percentThreshold'
                    autoComplete='nope'
                    type='number'
                    name='percentThreshold'
                    placeholder='Setup the percentage change'
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
              <div className={styles.Field}>
                <label>Message Frequency</label>
                <div>How often would you like to receive messages?</div>
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
            <SignalPreview />
            <div className={styles.controls}>
              <Button
                type='submit'
                disabled={!isValid || isSubmitting}
                isActive={isValid && !isSubmitting}
                variant={'fill'}
                accent='positive'
              >
                Continue
              </Button>
            </div>
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

const FieldCustomSelect = ({
  options,
  name,
  disabled = false,
  placeholder
}) => (
  <div className={styles.Field}>
    <Field
      name={name}
      render={({ field, form }) => (
        <Select
          placeholder={placeholder}
          options={options}
          disabled={disabled}
          onChange={data => {
            form.setFieldValue(name, data)
            form.setFieldTouched(name, true)
          }}
          value={field.value}
        />
      )}
    />
  </div>
)

const mapStateToProps = state => {
  return {
    isTelegramConnected: selectIsTelegramConnected(state)
  }
}

const mapDispatchToProps = dispatch => ({
  getSignalBacktestingPoints: payload => {
    dispatch(fetchHistorySignalPoints(payload))
  }
})

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(allProjectsForSearchGQL)
)

export default enhance(TriggerForm)
