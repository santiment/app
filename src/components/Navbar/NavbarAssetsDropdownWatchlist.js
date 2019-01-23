import React from 'react'
import { graphql } from 'react-apollo'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Panel, Button } from '@santiment-network/ui'
import { WatchlistGQL } from '../WatchlistPopup/WatchlistGQL'
import dropdownStyles from './NavbarDropdown.module.scss'
import IconLock from './IconLock.js'
import IconEye from './IconEye.js'

import SmoothDropdownItem from '../SmoothDropdown/SmoothDropdownItem'

const NavbarAssetsDropdownWatchlist = ({ lists = [], activeLink }) => {
  return lists.map(({ name, id, isPublic }) => {
    const link = `/assets/list?name=${name}@${id}`
    return (
      <Button
        variant='ghost'
        key={id}
        as={Link}
        className={dropdownStyles.item + ' ' + dropdownStyles.text}
        to={link}
        isActive={activeLink === link}
      >
        {name.toUpperCase()}
        <SmoothDropdownItem
          trigger={
            isPublic ? (
              <IconEye className={dropdownStyles.wl_visibility} />
            ) : (
              <IconLock className={dropdownStyles.wl_visibility} />
            )
          }
        >
          <Panel className={dropdownStyles.label}>
            {isPublic ? 'Public' : 'Private'}
          </Panel>
        </SmoothDropdownItem>
      </Button>
    )
  })
}

const sortWatchlists = (list, list2) =>
  moment.utc(list.insertedAt).diff(moment.utc(list2.insertedAt))

// FOR MOCS
export const UnwrappedNavbarAssetsDropdownWatchlist = NavbarAssetsDropdownWatchlist
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
