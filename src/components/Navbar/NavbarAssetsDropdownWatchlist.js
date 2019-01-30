import React, { Fragment, createFactory } from 'react'
import moment from 'moment'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Panel, Button, Icon } from '@santiment-network/ui'
import { WatchlistGQL } from '../WatchlistPopup/WatchlistGQL'
import WatchlistsAnon from './../WatchlistPopup/WatchlistsAnon'
import SmoothDropdown from '../SmoothDropdown/SmoothDropdown'
import SmoothDropdownItem from '../SmoothDropdown/SmoothDropdownItem'
import NavbarAssetsDropdownWatchlistBottom from './NavbarAssetsDropdownWatchlistBottom'
import GetWatchlists from './../../ducks/Watchlists/GetWatchlists'
import { pickFork, fork } from './../../utils/utils'
import styles from './NavbarAssetsDropdownWatchlist.module.scss'

const NavbarAssetsDropdownWatchlist = ({ activeLink }) => (
  <GetWatchlists
    render={props => {
      const renderWatchlistsList = pickFork(
        ifLoading,
        ifAnonymous,
        ifEmpty,
        ifData
      )
      return (
        <Fragment>
          {renderWatchlistsList({ activeLink, ...props })}
          {renderNewWatchlistForm(props)}
        </Fragment>
      )
    }}
  />
)

const renderNewWatchlistForm = fork(
  props => props.isLoggedIn,
  NavbarAssetsDropdownWatchlistBottom
)

const ifLoading = fork(
  props => props.isWatchlistsLoading,
  () => <h2 style={{ marginLeft: 30 }}>Loading...</h2>
)

const ifAnonymous = fork(props => !props.isLoggedIn, WatchlistsAnon)

const ifEmpty = fork(
  props => props.watchlists.length === 0,
  () => <h2 style={{ marginLeft: 30 }}>Empty</h2>
)

const ifData = fork(
  props => props.watchlists.length > 0,
  // TODO: activeLink is '/sonar' and we can't highlight here choosed watchlist
  ({ watchlists, isWatchlistsLoading, activeLink }) => (
    <SmoothDropdown
      showArrow={false}
      verticalOffset={5}
      closeAfterTimeout={0}
      verticalMotion
      className={styles.list}
    >
      {watchlists.map(({ name, id, isPublic }) => {
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
              className={styles.visibility}
              trigger={isPublic ? <Icon type='eye' /> : <Icon type='lock' />}
            >
              <Panel className={styles.label}>
                {isPublic ? 'Public' : 'Private'}
              </Panel>
            </SmoothDropdownItem>
          </Button>
        )
      })}
    </SmoothDropdown>
  )
)

export default NavbarAssetsDropdownWatchlist
