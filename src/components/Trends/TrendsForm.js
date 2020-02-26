import React, { Component } from 'react'
import Raven from 'raven-js'
import { connect } from 'react-redux'
import Search from '@santiment-network/ui/Search'
import { gotoExplore } from './trendsUtils'
import GA from './../../utils/tracking'

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
    this.props.gotoExplore(encodeURIComponent(this.state.topic))
  }

  handleChange = topic => {
    this.setState({ topic })
  }

  render () {
    const {
      classes: { wrapper: className, input: inputClassName },
      history
    } = this.props

    return (
      <form onSubmit={this.handleSubmit} className={className}>
        <Search
          history={history}
          className={inputClassName}
          iconPosition='left'
          placeholder='Search for trendy words'
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
    GA.event({
      category: 'Trends Search',
      action: 'Search: ' + topic
    })
  }
}

export default connect(
  null,
  gotoExplore
)(TrendsForm)
