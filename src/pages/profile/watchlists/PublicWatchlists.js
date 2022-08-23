import React from 'react'
import cx from 'classnames'
import { WatchlistCards } from '../../../ducks/Watchlists/Cards/Card'
import NoEntries from '../../../components/EmptySection/NoEntries'
import NewWatchlist from '../../../ducks/Watchlists/Actions/New'
import { PROJECT, BLOCKCHAIN_ADDRESS, SCREENER } from '../../../ducks/Watchlists/detector'
import styles from './../ProfilePage.module.scss'

const PublicWatchlists = ({ watchlists, type, isOwner, ...props }) => {
  if (!watchlists || watchlists.length === 0) {
    switch (type) {
      case PROJECT:
        return (
          <NoEntries
            title={isOwner && 'No Watchlist yet'}
            desc={
              isOwner
                ? 'Create your own watchlist to track assets you are interested in'
                : "This user doesn't have any watchlists yet"
            }
          >
            {isOwner && (
              <NewWatchlist
                trigger={<button className='btn-1 body-3'>Create watchlist</button>}
                type={PROJECT}
              />
            )}
          </NoEntries>
        )
      case BLOCKCHAIN_ADDRESS:
        return (
          <NoEntries
            title={isOwner && 'No Addresses Watchlists yet'}
            desc={
              isOwner
                ? 'Create your watchlist to track wallets you are interested in'
                : "This user doesn't have any watchlists yet"
            }
          >
            {isOwner && (
              <NewWatchlist
                trigger={<button className='btn-1 body-3'>Create addresses watchlist</button>}
                type={BLOCKCHAIN_ADDRESS}
              />
            )}
          </NoEntries>
        )
      case SCREENER:
        return (
          <NoEntries
            title={isOwner && 'No Screener yet'}
            desc={
              isOwner
                ? 'Create your own screener to track assets you are interested in'
                : "This user doesn't have any screeners yet"
            }
          >
            {isOwner && (
              <NewWatchlist
                trigger={<button className='btn-1 body-3'>Create screener</button>}
                type={SCREENER}
              />
            )}
          </NoEntries>
        )
      default:
        throw new Error('Invalid type')
    }
  }

  return (
    <div className={cx(styles.block, styles.block__lists)}>
      <WatchlistCards watchlists={watchlists} {...props} />
    </div>
  )
}

export default PublicWatchlists
