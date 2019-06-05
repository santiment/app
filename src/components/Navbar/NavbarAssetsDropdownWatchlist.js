import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon } from '@santiment-network/ui'
import { fork, pickFork } from './../../utils/utils'
import GetWatchlists from './../../ducks/Watchlists/GetWatchlists'
import ExplanationTooltip from '../ExplanationTooltip/ExplanationTooltip'
import WatchlistsAnon from './../WatchlistPopup/WatchlistsAnon'
import WatchlistNewBtn from '../WatchlistPopup/WatchlistNewBtn'
import NewWatchlistDialog from '../Watchlists/NewWatchlistDialog'
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
          {renderNewWatchlistForm({
            trigger: <WatchlistNewBtn border className={styles.watchlistNew} />,
            ...props
          })}
        </Fragment>
      )
    }}
  />
)

const renderNewWatchlistForm = fork(
  props => props.isLoggedIn,
  NewWatchlistDialog
)

const ifLoading = fork(
  props => props.isWatchlistsLoading,
  () => <h2 style={{ marginLeft: 30, flex: 1 }}>Loading...</h2>
)

const ifAnonymous = fork(props => !props.isLoggedIn, WatchlistsAnon)

const ifEmpty = fork(
  props => props.watchlists.length === 0,
  ({ watchlists }) => (
    <div className={styles.emptyWrapper}>
      <span>
        <NewWatchlistDialog
          trigger={
            <Button accent='positive' className={styles.createBtn}>
              Create
            </Button>
          }
          watchlists={watchlists}
        />
        your own watchlist to track
      </span>
      <span>assets you are interested in</span>
    </div>
  )
)

const ifData = fork(
  props => props.watchlists.length > 0,
  // TODO: activeLink is '/sonar' and we can't highlight here choosed watchlist
  ({ watchlists, isWatchlistsLoading, activeLink }) => (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {watchlists.map(({ name, id, isPublic }) => {
          const link = `/assets/list?name=${name}@${id}`
          return (
            <Button
              fluid
              variant='ghost'
              key={id}
              as={Link}
              className={styles.item}
              to={link}
              isActive={activeLink === link}
            >
              <span className={styles.watchlistName}>{name}</span>
              <ExplanationTooltip
                text={isPublic ? 'Public' : 'Private'}
                className={styles.explanation}
                offsetY={5}
              >
                <Icon
                  type={isPublic ? 'eye' : 'lock-small'}
                  className={styles.icon}
                />
              </ExplanationTooltip>
            </Button>
          )
        })}
      </div>
    </div>
  )
)

export default NavbarAssetsDropdownWatchlist
