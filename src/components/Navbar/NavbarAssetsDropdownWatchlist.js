import React from 'react'
import { graphql } from 'react-apollo'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Button } from '@santiment-network/ui'
import { WatchlistGQL } from '../WatchlistPopup/WatchlistGQL'
import dropdownStyles from './NavbarDropdown.module.scss'

const NavbarAssetsDropdownWatchlist = ({ lists = [], activeLink }) => {
  return lists.map(({ name, id }) => {
    return (
      <Button
        fluid
        variant='ghost'
        key={id}
        as={Link}
        className={dropdownStyles.item + ' ' + dropdownStyles.text}
        to={`/assets/list?name=${name}@${id}`}
        isActive={activeLink === null}
      >
        {name.toUpperCase()}
      </Button>
    )
  })
}

const sortWatchlists = (list, list2) =>
  moment.utc(list.insertedAt).diff(moment.utc(list2.insertedAt))

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
