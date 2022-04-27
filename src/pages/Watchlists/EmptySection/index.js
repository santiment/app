import React from 'react'
import cx from 'classnames'
import Button from '@santiment-network/ui/Button'
import NewWatchlist from '../../../ducks/Watchlists/Actions/New'
import EditAddresses from '../../../ducks/Watchlists/Actions/Edit/EditAddresses/EditAddresses'
import Section from '../../../components/EmptySection/EmptySection'
import { PROJECT, BLOCKCHAIN_ADDRESS } from '../../../ducks/Watchlists/detector'
import { mapAddressToAPIType } from '../../../ducks/Watchlists/utils'
import styles from './index.module.scss'

const CTAButton = ({ type = PROJECT, onClick }) => (
  <Button variant='fill' accent='positive' className={styles.emptyBtn} onClick={onClick}>
    {type === PROJECT ? 'Create watchlist' : 'Add addresses'}
  </Button>
)

export const EmptySection = ({ className, wrapperClassName, type = PROJECT, ...props }) => (
  <Section
    className={cx(styles.empty__row, wrapperClassName)}
    imgClassName={cx(styles.img, className)}
  >
    <div className={styles.empty__text}>
      {type === PROJECT ? (
        <>
          <span>Create your own watchlist to track assets</span>
          <span>you are interested in</span>
        </>
      ) : (
        <>
          <span>Start to add addresses you want to track</span>
          <span>or just interested in</span>
        </>
      )}

      {type === PROJECT ? (
        <NewWatchlist trigger={<CTAButton />} type={type} />
      ) : (
        <EditAddresses
          watchlist={props.watchlist}
          refreshList={props.refreshList}
          mapAddressToAPIType={mapAddressToAPIType}
          trigger={<CTAButton type={BLOCKCHAIN_ADDRESS} />}
        />
      )}
    </div>
  </Section>
)

export default EmptySection
