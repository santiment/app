import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Panel from '@santiment-network/ui/Panel/Panel'
import Icon from '@santiment-network/ui/Icon'
import styles from '../HelpPopup.module.scss'

const FirstQuestion = ({ isOpen, onClick }) => (
  <Panel padding className={styles.block} onClick={onClick}>
    <div className={styles.header}>
      <h4 className={styles.headingSmall}>How is the list calculated?</h4>
      <Icon
        type='arrow-right-big'
        className={cx(styles.arrow, isOpen && styles.openedArrow)}
      />
    </div>
    {isOpen && (
      <div className={styles.content}>
        <p>
          This list does NOT calculate the most popular words on crypto social
          media <b>overall</b> - those would often be the same, redundant words
          such as ‘Bitcoin’, ‘Ethereum’, ‘crypto’ etc.
        </p>

        <p>
          Instead, our list aims to discover the biggest <b>developing</b> or{' '}
          <b>emerging</b> stories within the crypto community. That is why each
          day you’ll see a new batch of fresh topics, currently gaining steam on
          crypto social media.
        </p>

        <p>
          To do this, every 9 hours we calculate the top 10 words with the
          biggest spike in social media mentions compared to their average
          social volume in the previous 2 weeks.
        </p>

        <p>
          This signals an abnormally high interest in a previously uninspiring
          topic, making the list practical for discovering new and developing
          talking points in the crypto community.
        </p>

        <p>
          The results are sourced from more than 1000 crypto-specific social
          media channels, including:
        </p>
        <ul>
          <li>300+ Telegram groups</li>
          <li>300+ crypto subreddits</li>
          <li>100s of Discord groups</li>
          <li>BitcoinTalk</li>
          <li>Private trader chats (hidden from Google search)</li>
          <li>More social channels constantly being added</li>
        </ul>

        <p>
          The Santiment team also writes a detailed daily breakdown of the top
          10 words to explain their appearance on the list. You can find our
          daily reports on the{' '}
          <Link to={'/insights'} className={styles.link}>
            Community Insights
          </Link>{' '}
          page or sign up for our Daily Email Brief.
        </p>
      </div>
    )}
  </Panel>
)

export default FirstQuestion
