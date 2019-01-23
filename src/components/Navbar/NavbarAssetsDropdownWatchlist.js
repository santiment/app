import React, { Fragment } from 'react'
import { graphql } from 'react-apollo'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Panel, Button } from '@santiment-network/ui'
import { WatchlistGQL } from '../WatchlistPopup/WatchlistGQL'
import IconLock from './IconLock.js'
import IconEye from './IconEye.js'
import styles from './NavbarAssetsDropdownWatchlist.module.scss'

import SmoothDropdown from '../SmoothDropdown/SmoothDropdown'
import SmoothDropdownItem from '../SmoothDropdown/SmoothDropdownItem'
import WatchlistBottom from './WatchlistBottom'

export const NavbarAssetsDropdownWatchlist = ({ lists = [], activeLink }) => {
  return (
    <Fragment>
      <SmoothDropdown
        showArrow={false}
        verticalOffset={5}
        closeAfterTimeout={0}
        verticalMotion
        className={styles.list}
      >
        {lists.map(({ name, id, isPublic }) => {
          const link = `/assets/list?name=${name}@${id}`

          return (
            <Button
              variant='ghost'
              key={id}
              as={Link}
              className={styles.item}
              to={link}
              isActive={activeLink === link}
            >
              {name.toUpperCase()}
              <SmoothDropdownItem
                trigger={
                  isPublic ? (
                    <IconEye className={styles.wl_visibility} />
                  ) : (
                    <IconLock className={styles.wl_visibility} />
                  )
                }
              >
                <Panel className={styles.label}>
                  {isPublic ? 'Public' : 'Private'}
                </Panel>
              </SmoothDropdownItem>
            </Button>
          )
        })}
      </SmoothDropdown>
      <WatchlistBottom />
    </Fragment>
  )
}

const sortWatchlists = (list, list2) =>
  moment.utc(list.insertedAt).diff(moment.utc(list2.insertedAt))

// FOR MOCS
export const watchlistGQL = WatchlistGQL
// FOR MOCS

export default graphql(WatchlistGQL, {
  name: 'Watchlists',
  skip: ({ isLoggedIn }) => !isLoggedIn,
  options: () => ({
    pollInterval: 1000,
    context: { isRetriable: true }
  }),
  props: ({ Watchlists }) => {
    const { fetchUserLists = [], loading = true } = Watchlists
    return {
      lists: [...fetchUserLists].sort(sortWatchlists),
      isLoading: loading
    }
  }
})(NavbarAssetsDropdownWatchlist)
