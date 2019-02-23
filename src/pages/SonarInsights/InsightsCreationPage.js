import React, { Component } from 'react'
import Editor from './Editor'
import styles from './InsightsCreationPage.module.scss'

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
      <div>
        <textarea
          rows='1'
          ref={this.titleInputRef}
          className={styles.title}
          value={value}
          placeholder="Insight's title"
          onChange={this.onTitleChange}
        />
        <Editor placeholder='Write something interesting here...' />
      </div>
    )
  }
}

export default InsightsCreationPage
