import React from 'react'
import cx from 'classnames'
import { getSEOLinkFromIdAndTitle } from 'webkit/utils/url'
import { makeLinkToInsight } from '../../../../components/Insight/InsightCardInternals'
import SignalCreator from '../../../../components/SignalCard/card/creator/SignalCreator'
import TransactionTableLabels from '../../../../components/WalletLink/TransactionTableLabels'
import { EtherscanLink } from '../../../../components/WalletLink/ActionLabels'
import styles from './Conversation.module.scss'

const LINK_SETTINGS = { linkSymbolsCount: 32 }

const getLink = data => {
  const { insight, blockchainAddress, chartConfiguration } = data

  if (chartConfiguration) {
    const { id, title } = chartConfiguration
    return `/charts/${getSEOLinkFromIdAndTitle(id, title)}?comment=${data.id}`
  }

  if (insight) {
    return `${makeLinkToInsight(insight.id, insight.title)}#comments\``
  }

  if (blockchainAddress && blockchainAddress.address) {
    return `/labs/balance?address=${blockchainAddress.address}`
  }

  return undefined
}

const makeReadable = text =>
  text.length > 80 ? `${text.slice(0, 80)} ...` : text

const Conversation = ({ data, classname }) => {
  const { content, insight, timelineEvent, blockchainAddress, user } = data
  const { chartConfiguration } = data

  const link = getLink(data)

  function openConversation () {
    if (link) {
      window.open(link, '_blank')
    }
  }

  return (
    <div
      className={cx(styles.container, link && styles.clickable, classname)}
      onClick={openConversation}
    >
      <div className={styles.header}>
        <SignalCreator user={user} classes={styles} />
        <div
          className={cx(
            styles.type,
            insight && styles.insight,
            (chartConfiguration || blockchainAddress) && styles.balance,
            timelineEvent && styles.timeline
          )}
        >
          {insight && 'Insights'}
          {blockchainAddress && 'Historical balance'}
          {timelineEvent && 'Event'}
          {chartConfiguration && 'Charts'}
        </div>
      </div>

      {timelineEvent && <Content content={content} />}

      {(insight || chartConfiguration) && (
        <>
          <Content content={content} />

          <div className={styles.insightTitle}>
            {(insight || chartConfiguration).title}
          </div>
        </>
      )}

      {blockchainAddress && (
        <>
          <Content content={content} />
          <EtherscanLink
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

      {!blockchainAddress &&
        !insight &&
        !timelineEvent &&
        !chartConfiguration &&
        content && <Content content={content} />}
    </div>
  )
}

const Content = ({ content }) => (
  <div className={styles.content}>{makeReadable(content)}</div>
)

export default Conversation
