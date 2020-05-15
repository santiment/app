import React from 'react'
import cx from 'classnames'
import Loader from '@santiment-network/ui/Loader/Loader'
import Icon from '@santiment-network/ui/Icon'
import { formatCryptoCurrency, formatNumber } from '../../../utils/formatting'
import HelpPopup from '../../../components/HelpPopup/HelpPopup'
import Tooltip from '@santiment-network/ui/Tooltip'
import styles from './GeneralInfoBlock.module.scss'

const GeneralInfoBlock = ({
  websiteLink,
  slackLink,
  twitterLink,
  githubLinks,
  blogLink,
  whitepaperLink,
  marketcapUsd,
  rank,
  priceUsd,
  totalSupply,
  volumeUsd,
  ticker,
  roiUsd,
  loading,
}) => (
  <div>
    <p>
      <SocialLink link={websiteLink} text='Website' />
      <SocialLink link={slackLink} text='Community' />
      <SocialLink link={twitterLink} text='Twitter' />
      <SocialLink link={blogLink} text='Blog' />

      <GithubLinks links={githubLinks} />

      <SocialLink link={whitepaperLink} text='Whitepaper' />
    </p>
    <Row
      loading={loading}
      value={marketcapUsd}
      format={(value) => formatNumber(value, { currency: 'USD' })}
      title='Market Cap'
    />
    <Row
      loading={loading}
      value={priceUsd}
      format={(value) => formatNumber(value, { currency: 'USD' })}
      title='Price (USD)'
    />
    <Row
      loading={loading}
      value={volumeUsd}
      format={(value) => formatNumber(value, { currency: 'USD' })}
      title='Volume (USD)'
    />
    <Row
      loading={loading}
      value={totalSupply}
      format={(value) =>
        formatCryptoCurrency(ticker, formatNumber(totalSupply))
      }
      title='Total supply'
    />
    <Row
      loading={loading}
      value={rank}
      format={(value) => value}
      title='Rank'
    />
    <Row
      loading={loading}
      value={roiUsd}
      format={(value) => parseFloat(value).toFixed(2)}
      title={
        <span>
          ROI since ICO{' '}
          <HelpPopup
            position='top'
            align='start'
            content='This ROI takes into account pre-sales, the token price during all sales and the amount of tokens distributed in each sale. Example: SAN had a pre-sale when around ~15m (12k ETH) tokens were distributed at a much lower price, and an ICO where the equivalent of 33k ETH were distributed. Both these sales are taken into account for this ROI, while most aggregators calculate ROI based only on the ICO’s price.'
          />
        </span>
      }
    />
  </div>
)

const GithubLinks = ({ links }) => {
  if (!links || !links.length) {
    return null
  }

  if (links.length === 1) {
    return <SocialLink link={links[0]} text='Github' />
  }

  return (
    <Tooltip
      trigger={<div className={styles.socialLink}>Github</div>}
      position='bottom'
    >
      <div className={styles.tooltip}>
        {links.map((link) => (
          <SocialLink key={link} link={link} text={link} />
        ))}
      </div>
    </Tooltip>
  )
}

const SocialLink = ({ link, text = '' }) => (
  <a
    className={cx(styles.socialLink, !link && styles.disabled)}
    target='_blank'
    rel='noopener noreferrer'
    href={link || ''}
  >
    {text || (
      <Icon type='link' fill={link ? 'var(--shark)' : 'var(--porcelain)'} />
    )}
  </a>
)

const Row = ({ title, value, format, loading }) => (
  <div
    className={cx(
      'row-info',
      value === undefined || (!value && styles.disabled),
    )}
  >
    <div>{title}</div>
    <div className={styles.value}>
      {loading ? (
        <Loader className={styles.loader} />
      ) : value ? (
        format(value)
      ) : (
        'No data'
      )}
    </div>
  </div>
)

export default GeneralInfoBlock
