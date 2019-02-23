import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-virtualized-select'
import 'react-virtualized-select/styles.css'

const defaultTags = []
defaultTags.length = 100
for (let i = 0; i < defaultTags.length; i++) {
  defaultTags[i] = { name: 'Tag-' + i }
}

const getOptionsFromTags = tags => {
  return (tags.allTags || []).map((tag, index) => {
    return tag === null ? {} : { value: tag.name, label: tag.name }
  })
}

class TagSelector extends Component {
  state = {
    tags: this.props.savedChosenTags
  }

  handleOnChange = tags => {
    if (tags.length <= 5) {
      this.setState({ tags }, () => {
        this.props.setTags(tags)
      })
    }
  }

  render () {
    const { tags = defaultTags, className = '' } = this.props
    return (
      <Select
        multi
        placeholder='Add a tag...'
        options={tags}
        // isLoading={this.props.isTagsLoading}
        // value={this.state.tags}
        className={className}
        value={[]}
        optionHeight={32}
        onChange={console.log}
        valueKey='name'
        labelKey='name'
      />
    )
  }
}

TagSelector.propTypes = {
  setTags: PropTypes.func.isRequired
}

export default TagSelector
