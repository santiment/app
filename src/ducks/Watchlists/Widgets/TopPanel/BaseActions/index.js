import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Panel from '@santiment-network/ui/Panel/Panel'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import { notifyUpdate } from '../notifications'
import SaveAsAction from '../../../Actions/SaveAs'
import { useUserWatchlists } from '../../../gql/lists/hooks'
import { useUpdateWatchlist } from '../../../gql/list/mutations'
import { getTitleByWatchlistType, SCREENER } from '../../../detector'
import { Delete, New, SaveAs, Edit, NonAuthorTrigger, Trigger } from './Items'
import styles from './index.module.scss'

const Actions = ({ watchlist, type, onClick, isAuthor, isAuthorLoading }) => {
  const [lists] = useUserWatchlists(type)
  const [updateWatchlist, { loading }] = useUpdateWatchlist(type)
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  if (!watchlist.id || isAuthorLoading) {
    return null
  }

  if (!isAuthor) {
    return (
      <div onClick={onClick} className={styles.container}>
        <SaveAsAction
          type={type}
          watchlist={watchlist}
          trigger={<NonAuthorTrigger />}
        />
      </div>
    )
  } else {
    const { id, name } = watchlist
    const title = getTitleByWatchlistType(type)
    const showDelete = isAuthor && (type !== SCREENER || lists.length > 1)

    const onEditApprove = props =>
      updateWatchlist(watchlist, { ...props }).then(() => {
        setIsMenuOpened(false)
        notifyUpdate(title)
      })

    return (
      <div onClick={onClick} className={styles.container}>
        <ContextMenu
          trigger={
            <Trigger
              type={type}
              title={title}
              isLoading={loading}
              watchlist={watchlist}
              onPrimaryAction={onEditApprove}
              openMenu={() => setIsMenuOpened(true)}
            />
          }
          align='start'
          position='bottom'
          open={isMenuOpened}
          passOpenStateAs='isActive'
          onClose={() => setIsMenuOpened(false)}
        >
          <Panel variant='modal' className={styles.wrapper}>
            <Edit
              type={type}
              title={title}
              watchlist={watchlist}
              isLoading={loading}
              onSubmit={onEditApprove}
            />
            <SaveAs type={type} watchlist={watchlist} />
            <New type={type} />
            {showDelete && <Delete id={id} name={name} title={title} />}
          </Panel>
        </ContextMenu>
      </div>
    )
  }
}

Actions.propTypes = {
  onClick: PropTypes.func,
  isAuthor: PropTypes.bool.isRequired,
  isAuthorLoading: PropTypes.bool.isRequired
}

Actions.defaultProps = {
  watchlist: {},
  onClick: _ => _
}

export default Actions
