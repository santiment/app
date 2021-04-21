import React from 'react'
import cx from 'classnames'
import { makeLinkToInsight } from '../../../../components/Insight/InsightCardInternals'
import WalletLink from '../../../../components/WalletLink/WalletLink'
import SignalCreator from '../../../../components/SignalCard/card/creator/SignalCreator'
import TransactionTableLabels from '../../../../components/WalletLink/TransactionTableLabels'
import styles from './Conversation.module.scss'

const LINK_SETTINGS = { linkSymbolsCount: 32 }

const makeReadable = text =>
  text.length > 80 ? `${text.slice(0, 80)} ...` : text

const Conversation = ({ data, classname }) => {
  const { content, insight, timelineEvent, blockchainAddress, user } = data

  return (
    <div className={cx(styles.container, classname)}>
      <div className={styles.header}>
        <SignalCreator user={user} classes={styles} />
        <div
          className={cx(
            styles.type,
            insight && styles.insight,
            blockchainAddress && styles.balance,
            timelineEvent && styles.timeline
          )}
        >
          {insight && 'Insights'}
          {blockchainAddress && 'Historical balance'}
          {timelineEvent && 'Event'}
        </div>
      </div>

      <div className={styles.content}>{makeReadable(content)}</div>

      {insight && (
        <a
          href={`${makeLinkToInsight(insight.id, insight.title)}#comments`}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.link}
        >
          {insight.title}
        </a>
      )}

      {blockchainAddress && (
        <>
          <WalletLink
            address={blockchainAddress.address}
            className={cx(styles.link, styles.link__address)}
            settings={LINK_SETTINGS}
          />

          {blockchainAddress.labels && (
            <TransactionTableLabels
              labels={blockchainAddress.labels}
              className={styles.labels}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Conversation
