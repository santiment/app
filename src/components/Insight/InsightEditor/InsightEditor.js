import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import { convertToRaw } from 'draft-js'
import mediumDraftImporter from 'medium-draft/lib/importer'
import mediumDraftExporter from 'medium-draft/lib/exporter'
import { createEditorState } from 'medium-draft'
import Editor from '../../Editor/Editor'
import InsightEditorBottom from './InsightEditorBottom'
import InsightEditorTitle from './InsightEditorTitle'
import { sanitizeMediumDraftHtml } from '../../../utils/utils'
import styles from './InsightEditor.module.scss'

class InsightEditor extends Component {
  static propTypes = {
    updateDraft: PropTypes.func.isRequired
  }

  static defaultProps = {
    title: '',
    text: '',
    tags: []
  }

  defaultEditorContent = convertToRaw(mediumDraftImporter(this.props.text))

  state = {
    title: this.props.title,
    textEditorState: createEditorState(this.defaultEditorContent),
    tags: this.props.tags,
    isEditing: false
  }

  componentDidUpdate ({ tags }, { tags: stateTags }) {
    if (tags.length > 0 && this.props.tags !== tags) this.setState({ tags })
  }

  trendTag = this.props.tags.find(({ name }) =>
    name.endsWith('-trending-words')
  )

  onTitleChange = title => {
    this.setState(
      {
        title,
        isEditing: true
      },
      this.updateDraft
    )
  }

  onTextChange = textEditorState => {
    const currentContent = textEditorState.getCurrentContent()
    if (
      mediumDraftExporter(currentContent) ===
      mediumDraftExporter(this.state.textEditorState.getCurrentContent())
    ) {
      return
    }

    this.setState(
      {
        textEditorState,
        isEditing: true
      },
      () => this.updateDraft(currentContent)
    )
  }

  onTagsChange = tags => {
    this.setState({ tags, isEditing: true }, this.updateDraft)
  }

  isTitleAndTextOk () {
    const { title, textEditorState } = this.state

    const trimmedTitle = title.trim()
    const trimmedText = textEditorState
      .getCurrentContent()
      .getPlainText()
      .trim()

    return trimmedTitle.length > 5 && trimmedText.length > 5
  }

  // NOTE(vanguard): Maybe should be placed in the InsightsEditorPage?
  updateDraft = debounce(
    (currentContent = this.state.textEditorState.getCurrentContent()) => {
      const { title, tags } = this.state
      const { readyState } = this.props

      if (readyState === 'published' || !this.isTitleAndTextOk()) {
        return
      }

      const currentHtml = mediumDraftExporter(currentContent)
      const { id, updateDraft } = this.props

      updateDraft({
        id,
        title,
        text: sanitizeMediumDraftHtml(currentHtml),
        tags: this.trendTag ? [...tags, this.trendTag] : tags
      })

      this.setState(prevState => ({ ...prevState, isEditing: false }))
    },
    1000
  )

  render () {
    const { id, title, updatedAt, isUpdating, publishDraft } = this.props
    const { isEditing } = this.state
    const tags = [...new Set([...this.props.tags, ...this.state.tags])]

    const isLoading = isEditing || isUpdating

    return (
      <div className={styles.wrapper}>
        <div className={styles.insightWrapper}>
          <InsightEditorTitle
            defaultValue={title}
            onChange={this.onTitleChange}
          />
          <Editor
            defaultEditorContent={this.defaultEditorContent}
            placeholder='Write something interesting ...'
            onChange={this.onTextChange}
          />
        </div>
        <InsightEditorBottom
          defaultTags={tags}
          updatedAt={updatedAt}
          onTagsChange={this.onTagsChange}
          isLoading={isLoading}
          hasMetTextRequirements={this.isTitleAndTextOk()}
          onPublishClick={() => publishDraft(id)}
        />
      </div>
    )
  }
}

export default InsightEditor
