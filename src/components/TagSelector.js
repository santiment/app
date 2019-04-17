import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { ALL_TAGS_QUERY } from '../queries/InsightsGQL'
import Select from './Select/Select'
import { noTrendTagsFilter } from './Insight/utils'

class TagSelect extends Component {
  static defaultProps = {
    onChange: () => {},
    defaultTags: []
  }

  state = {
    tags: [],
    defaultTagsLoaded: false
  }

  static getDerivedStateFromProps (
    { defaultTags, onChange },
    { tags, defaultTagsLoaded }
  ) {
    if (defaultTagsLoaded || defaultTags.length === 0) {
      return null
    }

    const newTags = [...new Set(tags.concat(defaultTags))].filter(
      noTrendTagsFilter
    )

    onChange(newTags)
    return {
      tags: newTags,
      defaultTagsLoaded: true
    }
  }

  onChange = tags => {
    if (tags.length <= 5) {
      this.setState({ tags }, () => {
        this.props.onChange(tags)
      })
    }
  }

  render () {
    const {
      data: { tags: options = [], loading },
      className = ''
    } = this.props
    const { tags } = this.state
    return (
      <Select
        multi
        topDropdown
        placeholder='Add a tag...'
        options={options.filter(option => !!option)}
        isLoading={loading}
        value={tags}
        className={className}
        onChange={this.onChange}
        valueKey='name'
        labelKey='name'
      />
    )
  }
}

export default graphql(ALL_TAGS_QUERY, {
  props: ({ data }) => {
    const tags = data.tags || []
    data.tags = tags.filter(noTrendTagsFilter)
    return {
      data
    }
  },
  options: () => {
    return {
      errorPolicy: 'all'
    }
  }
})(TagSelect)
