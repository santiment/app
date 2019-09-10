import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Input, Button } from '@santiment-network/ui'
import WordCloud from './WordCloud'
import ToolsPageStyles from './../ToolsPage/ToolsPage.module.scss'
import { mapQSToState, mapStateToQS } from './../../utils/utils'
import styles from './WordCloudPage.module.scss'

class WordCloudPage extends Component {
  state = {
    input: '',
    word: '',
    ...mapQSToState(this.props)
  }

  handleChange = ({ currentTarget: { value } }) => {
    this.setState({ input: value })
  }

  handleKeyPress = ({ key }) => {
    if (key === 'Enter') {
      this.setState({ word: this.state.input }, () => {
        this.props.history.push({
          search: mapStateToQS(this.state)
        })
      })
    }
  }

  render () {
    const { word, input } = this.state
    return (
      <div className={ToolsPageStyles.ToolsPage + ' page'}>
        <Helmet>
          <title>Crypto Word Cloud{word ? ` for ${word}` : ''} - Sanbase</title>
          <meta
            property='og:title'
            content={`Crypto Word Cloud${word ? ` for ${word}` : ''} - Sanbase`}
          />
          <meta
            property='og:description'
            content={`Explore words ${
              word
                ? `often used with ‘${word}’`
                : 'that are often used together'
            } on crypto social media. Results from 100s of Telegram groups, crypto subreddits, discord channels, private trader chats and more.`}
          />
        </Helmet>
        <div className={styles.title}>
          <h1>Explore the social context of any word in crypto</h1>
        </div>
        <section>
          <p>
            See which words are most often used alongside your main keyword on
            crypto social media. Larger words are found more frequently in
            comments that also include your main keyword. To filter out the
            noise, we only include comments from social channels where 90% of
            talk is about crypto.
          </p>
          <p>
            Results are gathered from 300+ Telegram channels, 300+ crypto
            subreddits, 100s of Discord channels, BitcoinTalk and many private
            trader chats hidden from Google search. More channels are constantly
            being added!
          </p>
          <div className={styles.searchContainer}>
            <Input
              value={input}
              placeholder='Any word'
              onKeyPress={this.handleKeyPress}
              onChange={this.handleChange}
            />
            <Button border accent='positive' onClick={this.updateSearchQuery}>
              Search
            </Button>
          </div>
          <WordCloud word={word} className={styles.cloud} />
        </section>
      </div>
    )
  }
}

export default WordCloudPage
