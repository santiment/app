import React, { Component } from 'react'
import { Button } from '@santiment-network/ui'
import Editor from './Editor'
import TagSelector from './TagSelector'
import AutoresizeTextarea from './AutoresizeTextarea'
import styles from './InsightsEditor.module.scss'

class InsightsEditor extends Component {
  static defaultProps = {
    title: '',
    text: '',
    tags: []
  }

  state = {
    title: this.props.title,
    text: this.props.text,
    tags: this.props.tags
  }

  onTitleChange = title => {
    this.setState({
      title
    })
  }

  onTextChange = text => {
    this.setState({
      text
    })
  }

  onTagsChange = tags => {
    this.setState({ tags })
  }

  render () {
    const { title, text, tags, readyState = 'draft' } = this.props

    const isDraft = readyState === 'draft'

    return (
      <div className={styles.wrapper}>
        <AutoresizeTextarea
          readOnly={!isDraft}
          className={styles.title}
          defaultValue={title}
          placeholder="Insight's title"
          onChange={this.onTitleChange}
        />
        <Editor
          readOnly={!isDraft}
          defaultValue={text}
          placeholder='Write something interesting here...'
          onChange={this.onTextChange}
        />
        {isDraft && (
          <div className={styles.bottom}>
            <div className={styles.container}>
              <div className={styles.bottom__left}>
                Add Tags
                <TagSelector onChange={this.onTagsChange} defaultTags={tags} />
              </div>
              <div className={styles.bottom__right}>
                <span className={styles.save}>Draft saved few seconds ago</span>
                <Button border variant='ghost'>
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
