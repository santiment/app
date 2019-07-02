import React, { Component } from 'react'
import Raven from 'raven-js'
import GoogleAnalytics from 'react-ga'
import { connect } from 'react-redux'
import { Search } from '@santiment-network/ui'
import { gotoExplore } from './trendsUtils'

export class TrendsForm extends Component {
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
    trackTopicSearch(this.state.topic)
    this.props.gotoExplore(window.encodeURIComponent(this.state.topic))
  }

  handleChange = evt => {
    this.setState({ topic: evt.target.value })
  }

  render () {
    const {
      classes: { wrapper: className, input: inputClassName }
    } = this.props
    return (
      <form onSubmit={this.handleSubmit} className={className}>
        <Search
          className={inputClassName}
          iconPosition='left'
          placeholder='Enter a search word or phrase'
          value={this.state.topic}
          onChange={this.handleChange}
        />
      </form>
    )
  }
}

const trackTopicSearch = topic => {
  if (process.env.NODE_ENV === 'production') {
    fetch(
      'https://us-central1-sanbase-search-ea4dc.cloudfunctions.net/trackTrends',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topic })
      }
    ).catch(error =>
      Raven.captureException(
        'tracking search trends queries ' + JSON.stringify(error)
      )
    )
    GoogleAnalytics.event({
      category: 'Trends Search',
      action: 'Search: ' + topic
    })
  }
}

export default connect(
  null,
  gotoExplore
)(TrendsForm)
