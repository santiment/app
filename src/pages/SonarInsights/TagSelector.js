import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-virtualized-select'
import 'react-virtualized-select/styles.css'

const defaultTags = []
defaultTags.length = 100
for (let i = 0; i < defaultTags.length; i++) {
  defaultTags[i] = { name: 'Tag-' + i }
}

class TagSelector extends Component {
  static defaultProps = {
    onChange: () => {}
  }

  state = {
    tags: this.props.defaultTags
  }

  onChange = tags => {
    if (tags.length <= 5) {
      this.setState({ tags }, () => {
        this.props.onChange(tags)
      })
    }
  }

  render () {
    const { options = defaultTags, className = '' } = this.props
    const { tags } = this.state
    return (
      <Select
        multi
        placeholder='Add a tag...'
        options={options}
        // isLoading={this.props.isTagsLoading}
        value={tags}
        className={className}
        optionHeight={32}
        onChange={this.onChange}
        valueKey='name'
        labelKey='name'
      />
    )
  }
}

export default TagSelector
