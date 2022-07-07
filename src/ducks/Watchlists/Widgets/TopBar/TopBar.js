import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { useLocation } from 'react-router-dom'
import toReact from 'svelte-adapter/react'
import Icon from '@santiment-network/ui/Icon'
import CreationInfoComponent from './CreationInfoWrapper.svelte'
import CommentsComponent from 'webkit/ui/Comments/svelte'
import { CreationType } from 'webkit/ui/Profile/types'
import { CommentsType } from 'webkit/api/comments'
import { lookupSavedComment, clearSavedComment } from 'webkit/ui/Comments/utils'
import { track } from 'webkit/analytics'
import BaseActions from '../TopPanel/BaseActions'
import SaveAs from '../../../../ducks/Watchlists/Actions/SaveAs'
import EditForm from '../../Actions/Edit/EditForm'
import Widgets from '../TopPanel/Widgets'
import ScreenerSignalDialog from '../../../Signals/ScreenerSignal/ScreenerSignalDialog'
import Share from '../../Actions/Share'
import WeeklyReport from '../../Actions/WeeklyReport'
import Filter from '../Filter'
import { usePublicUserData } from '../../../../pages/profile/ProfilePage'
import { useUser } from '../../../../stores/user'
import { BLOCKCHAIN_ADDRESS, PROJECT, SCREENER } from '../../detector'
import { useIsAuthor } from '../../gql/list/hooks'
import { onAnonComment, onCommentError } from '../../../../pages/Studio/utils'
import { useUpdateWatchlist } from '../../gql/list/mutations'
import { notifyUpdate } from './notifications'
import { mutateStoreUserActivity, InteractionType } from '../../../../queries/userActivity'
import styles from './TopBar.module.scss'

export const CreationInfo = toReact(
  CreationInfoComponent,
  {
    display: 'flex',
    alignItems: 'center',
  },
  'div',
)
export const Comments = toReact(
  CommentsComponent,
  {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  'div',
)

const TopBar = ({
  entity,
  type,
  refetchAssets,
  widgets,
  setWidgets,
  isDefaultScreener,
  projectsCount,
  updateWatchlistFunction,
  ...props
}) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)
  const { user: currentUser, isLoggedIn } = useUser()
  const { user, name: title, id, description, commentsCount, votes, isPublic } = entity
  const { data = {} } = usePublicUserData({ userId: user && user.id })
  const { isAuthor, isAuthorLoading } = useIsAuthor(entity)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [updateWatchlist, { loading }] = useUpdateWatchlist(type)
  const [isEditFormOpened, setIsEditFormOpened] = useState(false)
  const { state } = useLocation()

  useEffect(() => {
    if (state && state.openComments) {
      setIsCommentsOpen(true)
      closeFilter()
    }
  }, [state])

  useEffect(() => {
    if (isLoggedIn) {
      const comment = lookupSavedComment()

      if (comment) {
        setIsCommentsOpen(true)
      }
    }
  }, [id])

  function onVote() {
    mutateStoreUserActivity(type, id, InteractionType.UPVOTE)
    track.event('watchlist_like', { id })
  }

  function closeFilter() {
    if (isFilterOpen) {
      setIsFilterOpen(false)
    }
  }

  function handleSavedWatchlistComment() {
    const node = document.querySelector(`textarea[name="comment"]`)
    if (node) {
      const comment = lookupSavedComment()
      if (comment) {
        node.value = comment.content
        clearSavedComment()
      }
    }
  }

  const onEditApprove = (props) =>
    updateWatchlist(entity, { ...props }).then(() => {
      setIsEditFormOpened(false)
      notifyUpdate(title)

      if (refetchAssets) {
        refetchAssets()
      }
    })

  const isCurrentUser = data && currentUser && data.id === currentUser.id

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <CreationInfo
          id={id}
          type={
            type === BLOCKCHAIN_ADDRESS ? CreationType.AddressWatchlist : CreationType.Watchlist
          }
          title={title}
          user={data}
          editLabel={isCurrentUser ? 'Edit' : 'Save as'}
          currentUser={currentUser}
          onEditClick={() => setIsEditFormOpened((prev) => !prev)}
          comments={{
            count: commentsCount,
            active: isCommentsOpen,
            onClick: () => {
              setIsCommentsOpen((prev) => !prev)
              closeFilter()
            },
          }}
          votes={votes}
          onVote={onVote}
          description={description}
          titleHoverTooltipClass={styles.titleHoverTooltip}
        />
        {isCurrentUser ? (
          <EditForm
            type={type}
            open={isEditFormOpened}
            id={entity.id}
            watchlist={entity}
            isLoading={loading}
            toggleOpen={setIsEditFormOpened}
            title={'Edit ' + title}
            settings={{ name: title, description, isPublic }}
            onFormSubmit={(payload) =>
              onEditApprove(payload).then(() => setIsEditFormOpened(false))
            }
          />
        ) : (
          <SaveAs
            watchlist={entity}
            type={type}
            open={isEditFormOpened}
            customToggleOpen={setIsEditFormOpened}
          />
        )}
        {!isLoggedIn && type === SCREENER ? null : (
          <div className={cx(styles.commentsWrapper, isCommentsOpen && styles.active)}>
            <div
              className={cx(styles.closeWrapper, 'btn row v-center border')}
              onClick={() => setIsCommentsOpen(false)}
            >
              <Icon type='sidebar' className={styles.closeIcon} />
            </div>
            {entity && entity.user && (
              <Comments
                type={type === BLOCKCHAIN_ADDRESS ? CommentsType.Address : CommentsType.Watchlist}
                commentsFor={{
                  ...entity,
                  id: +entity.id,
                }}
                currentUser={currentUser}
                onAnonComment={onAnonComment}
                onCommentsLoaded={handleSavedWatchlistComment}
                onCommentError={onCommentError}
                onCommentSubmitted={() => mutateStoreUserActivity(type, id, 'COMMENT')}
              />
            )}
          </div>
        )}
        {isCommentsOpen && (
          <div className={styles.background} onClick={() => setIsCommentsOpen(false)} />
        )}
      </div>
      <div className={styles.actions}>
        <BaseActions
          type={type}
          watchlist={entity}
          onClick={closeFilter}
          isAuthor={isAuthor}
          isAuthorLoading={isAuthorLoading}
          refetchAssets={refetchAssets}
        />
        {widgets && type !== BLOCKCHAIN_ADDRESS && (
          <Widgets widgets={widgets} setWidgets={setWidgets} />
        )}
        <div className={cx(styles.rightDivider, isDefaultScreener && styles.defaultDivider)} />
        <Share watchlist={entity} isAuthor={isAuthor} />
        {(isAuthor || isDefaultScreener) && (
          <ScreenerSignalDialog watchlistId={entity.id} type={type} />
        )}
        {isAuthor && type === PROJECT && <WeeklyReport watchlist={entity} />}
        {type === SCREENER && (
          <Filter
            entityId={id}
            watchlist={entity}
            projectsCount={projectsCount}
            isAuthor={isAuthor}
            isAuthorLoading={isAuthorLoading}
            isLoggedIn={isLoggedIn}
            isDefaultScreener={isDefaultScreener}
            setIsOpen={(flag) => {
              setIsFilterOpen(flag)
              setIsCommentsOpen(false)
            }}
            isOpen={isFilterOpen}
            updateWatchlistFunction={updateWatchlistFunction}
            closeClasses={{
              wrapper: styles.closeWrapper,
              icon: styles.closeIcon,
            }}
            {...props}
          />
        )}
      </div>
    </div>
  )
}

export default TopBar
