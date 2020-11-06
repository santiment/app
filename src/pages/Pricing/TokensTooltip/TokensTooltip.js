import React from 'react'
import Icon from '@santiment-network/ui/Icon'
import Tooltip from '@santiment-network/ui/Tooltip'
import Panel from '@santiment-network/ui/Panel/Panel'
import styles from './TokensTooltip.module.scss'

const TokensTooltip = () => (
  <div className={styles.sanTokens}>
    <Tooltip
      on='click'
      trigger={
        <div className={styles.tooltipTrigger}>
          <span>
            Holding 1000 SAN tokens will result in a 20% discount on all plans
          </span>
          <Icon type='question-round' className={styles.icon} />
        </div>
      }
      position='bottom'
    >
      <Panel padding className={styles.tooltip}>
        <p className={styles.text}>
          <b>
            Holding 1000 SAN tokens will result in a 20% discount on all plans
          </b>
        </p>
        <ul className={styles.list}>
          <li className={styles.item}>
            Buy 1000 or more SAN tokens (
            <a
              rel='noopener noreferrer'
              target='_blank'
              href='https://academy.santiment.net/san-tokens/how-to-buy-san/'
            >
              here's how
            </a>
            )
          </li>
          <li className={styles.item}>
            Log in to Sanbase (
            <a
              rel='noopener noreferrer'
              target='_blank'
              href='https://app.santiment.net/'
            >
              https://app.santiment.net/
            </a>
            ). If you don’t have a Sanbase account, you can create one with
            email or MetaMask{' '}
          </li>
          <li className={styles.item}>
            After logging in to Sanbase, head to
            <a
              rel='noopener noreferrer'
              target='_blank'
              href='https://app.santiment.net/account'
            >
              {' '}
              Account Settings
            </a>{' '}
            and connect your account with your MetaMask wallet
          </li>
          <li className={styles.item}>
            Refresh this page and proceed with your purchase
          </li>
          <li className={styles.item}>
            Our system checks your Sanbase account for 1000+ SAN during the
            checkout, and automatically applies a 20% discount{' '}
          </li>
        </ul>
        <p className={styles.text}>
          <b>Note: </b>
          To claim the 20% discount, you just need to hold/HODL enough SAN. The
          tokens still belong to you - our system simply checks if you have them
          in your wallet
        </p>
      </Panel>
    </Tooltip>
  </div>
)

export default TokensTooltip
