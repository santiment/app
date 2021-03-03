import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import NewWatchlist from '../../../ducks/Watchlists/Actions/New'
import Section from '../../../components/EmptySection/EmptySection'
import styles from './index.module.scss'

export const EmptySection = ({ className, wrapperClassName }) => (
  <Section
    className={cx(styles.empty__row, wrapperClassName)}
    imgClassName={cx(styles.img, className)}
  >
    <div className={styles.empty__text}>
      <span>Create your own watchlist to track assets</span>
      <span>you are interested in</span>

      <NewWatchlist
        trigger={
          <Button variant='fill' accent='positive' className={styles.emptyBtn}>
            Create watchlist
          </Button>
        }
        type='watchlist'
      />
    </div>
  </Section>
)

export default EmptySection
