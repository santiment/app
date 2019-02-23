import React, { Component } from 'react'
import { Button } from '@santiment-network/ui'
import Editor from './Editor'
import styles from './InsightsCreationPage.module.scss'
import TagSelector from './TagSelector'

class InsightsCreationPage extends Component {
  state = {
    titleInput: {
      rows: 1,
      value: ''
    }
  }

  componentDidMount () {
    this.titleOneLineHeight = this.titleInputRef.current.clientHeight
  }

  onTitleChange = ({ currentTarget }) => {
    currentTarget.rows = 1
    currentTarget.rows = currentTarget.scrollHeight / this.titleOneLineHeight

    this.setState({
      titleInput: {
        value: currentTarget.value
      }
    })
  }

  titleInputRef = React.createRef()

  render () {
    const {
      titleInput: { rows, value }
    } = this.state

    return (
      <div className={styles.wrapper}>
        <textarea
          rows='1'
          ref={this.titleInputRef}
          className={styles.title}
          value={value}
          placeholder="Insight's title"
          onChange={this.onTitleChange}
        />
        <Editor placeholder='Write something interesting here...' />
        <div className={styles.bottom}>
          <div className={styles.container}>
            <div className={styles.bottom__left}>
              Add Tags
              <TagSelector />
            </div>
            <div className={styles.bottom__right}>
              <span className={styles.save}>Saved few seconds ago</span>
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
