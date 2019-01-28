import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import WordCloud from './WordCloud'
import { Input, Button } from '@santiment-network/ui'
import ToolsPageStyles from './../ToolsPage/ToolsPage.module.scss'
import { mapQSToState, mapStateToQS } from './../../utils/utils'
import styles from './WordCloudPage.module.scss'
import * as actions from '../WordCloud/actions'

class WordCloudPage extends Component {
  state = {
    word: '',
    ...mapQSToState(this.props)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    return {
      ...mapQSToState(nextProps)
    }
  }

  componentDidMount () {
    this.updateWordContext()
  }

  render () {
    return (
      <div className={ToolsPageStyles.ToolsPage + ' page'}>
        <Helmet>
          <style>{'body { background-color: white; }'}</style>
        </Helmet>
        <div className={styles.title}>
          <h1>Explore context of any word in crypto</h1>
        </div>
        <section>
          <div className={styles.searchContainer}>
            <Input
              value={this.state.word}
              id='word'
              name='word'
              placeholder='Any word'
              onKeyPress={this.handleKeyPress}
              onChange={this.handleChange}
            />
            <Button border accent='positive' onClick={this.updateSearchQuery}>
              Search
            </Button>
          </div>
          <WordCloud />
        </section>
      </div>
    )
  }

  updateWordContext = () => {
    const word = this.state.word
    word && word.length > 0 && this.props.fetchContext(word.toLowerCase())
  }

  updateSearchQuery = () => {
    this.updateWordContext()
    this.props.history.push({
      search: mapStateToQS(this.state)
    })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.updateSearchQuery()
    }
  }
}

const mapDispatchToProps = dispatch => ({
  fetchContext: payload => {
    dispatch({
      type: actions.WORDCLOUD_CONTEXT_FETCH,
      payload
    })
  }
})

export default connect(
  null,
  mapDispatchToProps
)(WordCloudPage)
