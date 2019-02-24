import React, { Component } from 'react'
import { Button } from '@santiment-network/ui'
import Editor from './Editor'
import styles from './InsightsCreationPage.module.scss'
import TagSelector from './TagSelector'
import AutoresizeTextarea from './AutoresizeTextarea'

class InsightsCreationPage extends Component {
  static defaultProps = {
    title: '',
    text: ''
  }

  state = {
    title: this.props.title,
    text: this.props.text
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

  render () {
    const { title, text } = this.props

    return (
      <div className={styles.wrapper}>
        <AutoresizeTextarea
          className={styles.title}
          placeholder="Insight's title"
          onChange={this.onTitleChange}
          defaultValue={title}
        />
        <Editor
          defaultText={text}
          placeholder='Write something interesting here...'
          onChange={this.onTextChange}
        />
        <div className={styles.bottom}>
          <div className={styles.container}>
            <div className={styles.bottom__left}>
              Add Tags
              <TagSelector />
            </div>
            <div className={styles.bottom__right}>
              <span className={styles.save}>Draft saved few seconds ago</span>
              <Button border variant='ghost'>
                Publish insight
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InsightsCreationPage
