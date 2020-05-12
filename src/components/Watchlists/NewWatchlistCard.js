import React from 'react'
import cx from 'classnames'
import NewWatchlistDialog from './NewWatchlistDialog'
import LoginDialogWrapper from '../LoginDialog/LoginDialogWrapper'
import GetWatchlists from '../../ducks/Watchlists/GetWatchlists'
import styles from './WatchlistCard.module.scss'

export const SvgNew = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='48'
    height='51'
    viewBox='0 0 48 51'
    fill='none'
    className={className}
  >
    <path
      d='M12.5693 48.4236C5.06934 44.9236 2.85222 34.7209 5.56933 35.9236C23.5693 43.8909 23.0007 34.6286 28.5007 30.9993C37.6467 24.9641 40.7866 18.7689 35.9392 11.5845C33.897 8.55786 28.9967 3.06709 32.0693 2.42367C35.1419 1.78025 44.3671 6.174 46.3999 14.3839C49.086 25.232 48.0011 39.7005 38.0693 46.9236C32.5693 50.9236 20.0693 51.9236 12.5693 48.4236Z'
      fill='var(--porcelain)'
    />
    <path
      d='M21.9192 31.4774C21.5174 28.5834 21.3917 25.5528 21.1276 22.6593C21.0008 19.9041 20.7373 16.8729 20.4727 14.1172'
      stroke='var(--rhino)'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M12.033 24.0015C14.6526 23.3231 17.2695 23.3334 19.7487 23.3432L21.5392 23.3503C24.4316 23.3617 27.1868 23.2348 29.8075 22.281'
      stroke='var(--rhino)'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M22.1059 45.0632C29.1511 45.2744 35.6329 41.6133 39.8311 34.3918C45.0845 25.2859 43.5926 13.5974 36.3305 6.60218C35.4217 5.7329 34.4551 4.99699 33.3748 4.3369C22.3363 -2.22345 9.08422 2.82501 4.09781 11.4317C-2.85128 23.4665 2.23487 36.4503 10.8529 41.5789C14.6342 43.8003 18.4759 44.9544 22.1059 45.0632Z'
      stroke='var(--waterloo)'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const Trigger = props => {
  return (
    <div className={cx(styles.wrapper, styles.create)} {...props}>
      <SvgNew />
      <div className={styles.createLink}>Create your watchlist</div>
    </div>
  )
}

const NewWatchlistCard = () => {
  return (
    <LoginDialogWrapper title='Create watchlist' trigger={Trigger}>
      <GetWatchlists
        render={({ watchlists = [] }) => {
          return (
            <NewWatchlistDialog watchlists={watchlists} trigger={<Trigger />} />
          )
        }}
      />
    </LoginDialogWrapper>
  )
}

export default NewWatchlistCard
