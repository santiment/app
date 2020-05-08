import React, { Component } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Input from '@santiment-network/ui/Input'
import Button from '@santiment-network/ui/Button'
import { gotoExplore } from './utils.js'
import styles from './index.module.scss'

export const DEFAULT_TEXT = 'Enter a word or a phrase...'

export class TrendsSearchForm extends Component {
  static defaultProps = {
    classes: {}
  }

  state = {
    topic: this.props.defaultTopic || ''
  }

  componentDidUpdate (prevProps) {
    if (this.props.defaultTopic !== prevProps.defaultTopic) {
      this.setState({ topic: this.props.defaultTopic })
    }
  }

  handleSubmit = evt => {
    evt.preventDefault()
    this.props.gotoExplore(this.state.topic)
  }

  handleChange = evt => {
    this.setState({ topic: evt.currentTarget.value })
  }

  render () {
    const {
      classes: { wrapper: className, input: inputClassName },
      withButton
    } = this.props

    return (
      <form
        onSubmit={this.handleSubmit}
        className={cx(styles.wrapper, className)}
      >
        <Input
          className={cx(
            styles.input,
            inputClassName,
            withButton && styles.withButton
          )}
          placeholder={DEFAULT_TEXT}
          value={this.state.topic}
          onChange={this.handleChange}
        />
        {withButton && (
          <>
            {this.state.topic ? (
              <Button
                type='submit'
                variant='fill'
                accent='positive'
                className={styles.button}
              >
                Go
              </Button>
            ) : (
              <Button
                type='submit'
                variant='fill'
                accent='positive'
                as={Link}
                to='/labs/trends/explore/'
                className={styles.button}
              >
                Go
              </Button>
            )}
          </>
        )}
      </form>
    )
  }
}

export default connect(
  null,
  gotoExplore
)(TrendsSearchForm)
