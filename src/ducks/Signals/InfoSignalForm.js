import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Input } from '@santiment-network/ui'
import moment from 'moment'
import styles from './TriggerForm.module.scss'

class InfoSignalForm extends React.PureComponent {
  state = {
    title: 'Signal-' + moment().toISOString(),
    description: ''
  }

  static propTypes = {
    onInfoSignalChange: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.onInfoSignalChange(this.state)
  }

  componentDidUpdate (prevProps, prevState) {
    this.props.onInfoSignalChange(this.state)
  }

  render () {
    return (
      <Fragment>
        <div className={styles.Field}>
          <label>Title</label>
          <Input
            value={this.state.title}
            id='title'
            autoComplete='nope'
            type='text'
            name='title'
            placeholder='Name of the signal'
            onChange={this.handleInputChange}
          />
        </div>
        <div className={styles.Field}>
          <label>Description</label>
          <Input
            value={this.state.description}
            id='description'
            autoComplete='nope'
            type='text'
            name='description'
            placeholder='Description of the signal'
            onChange={this.handleInputChange}
          />
        </div>
      </Fragment>
    )
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
}

export default InfoSignalForm
