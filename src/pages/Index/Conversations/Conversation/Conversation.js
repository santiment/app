import React from 'react'
import cx from 'classnames'
import { makeLinkToInsight } from '../../../../components/Insight/InsightCardInternals'
import WalletLink from '../../../../components/WalletLink/WalletLink'
import SignalCreator from '../../../../components/SignalCard/card/creator/SignalCreator'
import styles from './Conversation.module.scss'

const LINK_SETTINGS = { linkSymbolsCount: 42 }

const Conversation = ({ data, classname }) => {
  const { content, insight, timelineEvent, blockchainAddress, user } = data

  return (
    <div className={cx(styles.container, classname)}>
      <div className={styles.header}>
        <SignalCreator user={user} />
        <div
          className={cx(
            styles.type,
            insight && styles.insight,
            blockchainAddress && styles.balance
          )}
        >
          {insight && 'Insights'}
          {blockchainAddress && 'Historical balance'}
          {timelineEvent && 'Event'}
        </div>
      </div>

      <div className={styles.content}>{content}</div>

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
        <div>
          <WalletLink
            address={blockchainAddress.address}
            className={styles.link}
            settings={LINK_SETTINGS}
          />
        </div>
      )}
    </div>
  )
}

export default Conversation
