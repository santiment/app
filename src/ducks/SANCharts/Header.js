import React from 'react'
import { graphql } from 'react-apollo'
import cx from 'classnames'
import Label from '@santiment-network/ui/Label'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import ChartSignalCreationDialog from './ChartSignalCreationDialog'
import PercentChanges from '../../components/PercentChanges'
import WatchlistsPopup from '../../components/WatchlistPopup/WatchlistsPopup'
import { formatNumber } from '../../utils/formatting'
import { PROJECT_BY_SLUG_QUERY } from './gql'
import styles from './Header.module.scss'

const Changes = ({ small = false, className, children, diff, label }) => (
  <div className={styles[small ? 'changes_small' : 'changes']}>
    {children}
    <PercentChanges className={className} changes={diff} />
    {label}
  </div>
)

const Header = ({
  data: {
    project: {
      id,
      ticker,
      totalSupply = 0,
      priceUsd = 0,
      percentChange24h = 0,
      percentChange7d = 0
    } = {}
  },
  slug,
  isLoggedIn
}) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <Changes diff={percentChange24h} label='24h' className={styles.change}>
          {priceUsd && formatNumber(priceUsd, { currency: 'USD' })}
        </Changes>
        <Changes
          small
          diff={percentChange7d}
          label='7d'
          className={styles.change_small}
        >
          {formatNumber(totalSupply)} {ticker}
        </Changes>
      </div>

      {isLoggedIn && (
        <div>
          <ChartSignalCreationDialog
            slug={slug}
            trigger={
              <Button border className={styles.btn}>
                <Icon type='signal' className={styles.btn__icon} />
                Add signal
              </Button>
            }
          />

          <WatchlistsPopup
            trigger={
              <Button accent='positive' variant='fill'>
                <Icon type='add-watchlist' className={styles.btn__icon} />
                Watch {ticker}
              </Button>
            }
            projectId={id}
            slug={slug}
            isLoggedIn={isLoggedIn}
          />
        </div>
      )}
    </div>
  )
}

export default graphql(PROJECT_BY_SLUG_QUERY, {
  options: ({ slug }) => ({ variables: { slug } })
})(Header)
