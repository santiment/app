import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@santiment-network/ui'
import debounce from 'lodash.debounce'
import { convertToRaw } from 'draft-js'
import mediumDraftImporter from 'medium-draft/lib/importer'
import mediumDraftExporter from 'medium-draft/lib/exporter'
import { createEditorState } from 'medium-draft'
import moment from 'moment'
import Editor from './Editor'
import TagSelector from './TagSelector'
import AutoresizeTextarea from './AutoresizeTextarea'
import { sanitizeMediumDraftHtml } from '../../utils/utils'
import Timer from './Timer'
import styles from './InsightsEditor.module.scss'

class InsightsEditor extends Component {
  static propTypes = {
    updateDraft: PropTypes.func
  }

  static defaultProps = {
    title: '',
    text: '',
    tags: [],
    updateDraft: () => {}
  }

  defaultEditorState = convertToRaw(mediumDraftImporter(this.props.text))

  state = {
    title: this.props.title,
    textEditorState: createEditorState(this.defaultEditorState),
    tags: this.props.tags
  }

  onTitleChange = title => {
    this.setState(
      {
        title
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
        textEditorState
      },
      () => this.updateDraft(currentContent)
    )
  }

  onTagsChange = tags => {
    this.setState({ tags }, this.updateDraft)
  }

  // NOTE(vanguard): Maybe should be placed in the InsightsEditorPage?
  updateDraft = debounce(
    (currentContent = this.state.textEditorState.getCurrentContent()) => {
      const { title, tags } = this.state
      const { readyState } = this.props

      if (
        !title.replace(/\s/g, '') ||
        !currentContent.getPlainText().replace(/\s/g, '') ||
        readyState === 'published'
      ) {
        return
      }

      const currentHtml = mediumDraftExporter(currentContent)
      const { id, updateDraft } = this.props

      updateDraft({
        id,
        title,
        text: sanitizeMediumDraftHtml(currentHtml),
        tags
      })
    },
    1000
  )

  render () {
    const {
      title,
      text,
      tags,
      readyState = 'draft',
      updatedAt,
      readOnly
    } = this.props

    const isDraft = readyState === 'draft'

    return (
      <div className={styles.wrapper}>
        <AutoresizeTextarea
          readOnly={readOnly}
          className={styles.title}
          defaultValue={title}
          placeholder="Insight's title"
          onChange={this.onTitleChange}
        />
        <Editor
          readOnly={readOnly}
          defaultEditorState={this.defaultEditorState}
          placeholder='Write something interesting here...'
          onChange={this.onTextChange}
        />
        {!readOnly && (
          <div className={styles.bottom}>
            <div className={styles.container}>
              <div className={styles.bottom__left}>
                Add Tags
                <TagSelector onChange={this.onTagsChange} defaultTags={tags} />
              </div>
              <div className={styles.bottom__right}>
                {updatedAt && (
                  <span className={styles.save}>
                    Draft saved{' '}
                    <Timer interval={1000 * 60}>
                      {() => moment(updatedAt).fromNow()}
                    </Timer>
                  </span>
                )}
                <Button className={styles.publishBtn} border variant='ghost'>
                  Publish insight
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default InsightsEditor
