import React from 'react'
import cx from 'classnames'
import { Icon } from '@santiment-network/ui'
import { formatCryptoCurrency, formatNumber } from './../../utils/formatting'
import HelpPopup from './../../components/HelpPopup/HelpPopup'
import styles from './GeneralInfoBlock.module.scss'

const GeneralInfoBlock = ({
  websiteLink,
  slackLink,
  twitterLink,
  githubLink,
  blogLink,
  whitepaperLink,
  marketcapUsd,
  rank,
  priceUsd,
  totalSupply,
  volumeUsd,
  ticker,
  roiUsd,
  isERC20
}) => (
  <div>
    <p>
      <SocialLink link={websiteLink} text='Website' />
      <SocialLink link={slackLink} text='Community' />
      <SocialLink link={twitterLink} text='Twitter' />
      <SocialLink link={blogLink} text='Blog' />
      <SocialLink link={githubLink} text='Github' />
      <SocialLink link={whitepaperLink} text='Whitepaper' />
    </p>
    <hr />
    <Row
      value={marketcapUsd}
      format={value => formatNumber(value, { currency: 'USD' })}
      title='Market Cap'
    />
    <Row
      value={priceUsd}
      format={value => formatNumber(value, { currency: 'USD' })}
      title='Price (USD)'
    />
    <Row
      value={volumeUsd}
      format={value => formatNumber(value, { currency: 'USD' })}
      title='Volume (USD)'
    />
    <Row
      value={volumeUsd}
      format={value => formatNumber(value, { currency: 'USD' })}
      title='Volume (USD)'
    />
    <Row
      value={totalSupply}
      format={value => formatCryptoCurrency(ticker, formatNumber(totalSupply))}
      title='Total supply'
    />
    <Row value={rank} format={value => value} title='Rank' />
    <Row
      value={roiUsd}
      format={value => parseFloat(value).toFixed(2)}
      title={
        <span>
          ROI since ICO
          <HelpPopup content='This ROI takes into account pre-sales, the token price during all sales and the amount of tokens distributed in each sale. Example: SAN had a pre-sale when around ~15m (12k ETH) tokens were distributed at a much lower price, and an ICO where the equivalent of 33k ETH were distributed. Both these sales are taken into account for this ROI, while most aggregators calculate ROI based only on the ICO’s price.' />
        </span>
      }
    />
  </div>
)

const SocialLink = ({ link, text = '' }) => (
  <a className={styles.socialLink} href={link || ''}>
    {text || (
      <Icon type='link' fill={link ? 'var(--shark)' : 'var(--porcelain)'} />
    )}
  </a>
)

const DATA_IS_EMPTY = 'No data'

const Row = ({ title, value, format }) => (
  <div
    className={cx(
      'row-info',
      value === undefined || (!value && styles.disabled)
    )}
  >
    <div>{title}</div>
    <div>{!!value && value !== undefined ? format(value) : DATA_IS_EMPTY}</div>
  </div>
)

export default GeneralInfoBlock
