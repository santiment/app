import React, { Component } from 'react'
import { connect } from 'react-redux'
import Input from '@santiment-network/ui/Input'
import { gotoExplore } from '../trendsUtils'

export class TrendsInputSearch extends Component {
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
    const {classes: { wrapper: className, input: inputClassName }} = this.props

    return (
      <form onSubmit={this.handleSubmit} className={className}>
        <Input
          className={inputClassName}
          placeholder='Enter a word or a phrase...'
          value={this.state.topic}
          onChange={this.handleChange}
        />
      </form>
    )
  }
}

export default connect(
  null,
  gotoExplore
)(TrendsInputSearch)
