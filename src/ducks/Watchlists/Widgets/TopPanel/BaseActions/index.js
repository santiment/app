import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Panel from '@santiment-network/ui/Panel/Panel'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import SaveAs from '../../../Actions/SaveAs'
import { notifyUpdate } from '../notifications'
import { Delete, NonAuthorTrigger, Trigger } from './Items'
import { useUserWatchlists } from '../../../gql/lists/hooks'
import { useUpdateWatchlist } from '../../../gql/list/mutations'
import { getTitleByWatchlistType, SCREENER } from '../../../detector'
import styles from './index.module.scss'

const Actions = ({ watchlist, type, onClick, isAuthor, isAuthorLoading }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [isEditPopupOpened, setIsEditPopupOpened] = useState(false)
  const [lists] = useUserWatchlists(type)
  const [updateWatchlist, { loading }] = useUpdateWatchlist()

  if (!watchlist.id || isAuthorLoading) {
    return null
  }

  if (!isAuthor) {
    return (
      <div onClick={onClick} className={styles.container}>
        <SaveAs
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
      updateWatchlist(watchlist, { ...props }).then(() => notifyUpdate(title))

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
