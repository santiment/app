import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Panel from '@santiment-network/ui/Panel/Panel'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import { notifyUpdate } from '../notifications'
import SaveAsAction from '../../../Actions/SaveAs'
import { useUserWatchlists } from '../../../gql/lists/hooks'
import { useUpdateWatchlist } from '../../../gql/list/mutations'
import { getTitleByWatchlistType, SCREENER } from '../../../detector'
import { Delete, New, SaveAs, Edit, NonAuthorTrigger, Trigger, Copy } from './Items'
import styles from './index.module.scss'

const Actions = ({ watchlist, type, onClick, isAuthor, isAuthorLoading, refetchAssets }) => {
  const [lists] = useUserWatchlists(type)
  const [updateWatchlist, { loading }] = useUpdateWatchlist(type)
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [showPanel, setShowPanel] = useState(true)

  useEffect(() => {
    const panelVisibilityChange = ({ detail }) => {
      const isShowPanel = detail === 'show'
      if (!isShowPanel) setShowPanel(isShowPanel)
      setIsMenuOpened(!isShowPanel)
    }
    window.addEventListener('panelVisibilityChange', panelVisibilityChange, false)
    return () => window.removeEventListener('panelVisibilityChange', panelVisibilityChange, false)
  }, [])

  if ((!watchlist.id && type !== SCREENER) || isAuthorLoading) {
    return null
  }

  if (!isAuthor) {
    return (
      <div onClick={onClick} className={styles.container}>
        <SaveAsAction type={type} watchlist={watchlist} trigger={<NonAuthorTrigger />} />
      </div>
    )
  }

  const { id, name } = watchlist
  const title = getTitleByWatchlistType(type)
  const showDelete = isAuthor && (type !== SCREENER || lists.length > 1)

  const onEditApprove = (props) =>
    updateWatchlist(watchlist, { ...props }).then(() => {
      setIsMenuOpened(false)
      notifyUpdate(title)
      refetchAssets && refetchAssets()
    })

  return (
    <div onClick={onClick}>
      <ContextMenu
        trigger={
          <Trigger
            type={type}
            title={title}
            isLoading={loading}
            watchlist={watchlist}
            onPrimaryAction={onEditApprove}
            openMenu={() => {
              setShowPanel(true)
              setIsMenuOpened(true)
            }}
          />
        }
        align='start'
        position='bottom'
        open={isMenuOpened}
        passOpenStateAs='isActive'
        onClose={() => setIsMenuOpened(false)}
      >
        <Panel variant='modal' className={showPanel ? styles.wrapper : styles.hidePanel}>
          <New type={type} />
          <SaveAs type={type} watchlist={watchlist} />
          {type === 'PROJECT' && <Copy watchlist={watchlist} />}
          <Edit
            type={type}
            title={title}
            watchlist={watchlist}
            isLoading={loading}
            onSubmit={onEditApprove}
          />
          {showDelete && <Delete id={id} name={name} title={title} />}
        </Panel>
      </ContextMenu>
    </div>
  )
}

Actions.propTypes = {
  onClick: PropTypes.func,
  isAuthor: PropTypes.bool.isRequired,
  isAuthorLoading: PropTypes.bool.isRequired,
}

Actions.defaultProps = {
  watchlist: {},
  onClick: (_) => _,
}

export default Actions
