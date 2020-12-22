import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import EditForm from '../Edit/EditForm'
import { useUser } from '../../../../stores/user'
import LoginPopup from '../../../../components/banners/feature/PopupBanner'

import { USER_ADD_NEW_ASSET_LIST } from '../../../../actions/types'

const SaveAs = ({
  watchlist,
  lists,
  onSubmit,
  trigger,
  isPending,
  dispatchWatchlistCreation,
  createWatchlist = dispatchWatchlistCreation,
  isSuccess,
  type
}) => {
  const [isOpened, setIsOpened] = useState(false)
  const { isLoggedIn } = useUser()

  useEffect(
    () => {
      if (isSuccess) {
        setIsOpened(false)
      }
    },
    [isSuccess]
  )

  if (type === 'watchlist' && !isLoggedIn) {
    return <LoginPopup>{trigger}</LoginPopup>
  }

  return (
    <EditForm
      lists={lists}
      title='Save as ...'
      type={type}
      id={watchlist.id}
      onFormSubmit={({ name, description, isPublic }) => {
        createWatchlist(
          {
            name,
            description,
            isPublic,
            function: watchlist.function,
            listItems: watchlist.listItems,
            type
          },
          setIsOpened
        )
      }}
      isLoading={isPending}
      open={isOpened}
      toggleOpen={setIsOpened}
      trigger={trigger}
    />
  )
}

const mapStateToProps = ({
  watchlistUi: { newItemPending, newItemSuccess }
}) => ({
  isPending: newItemPending,
  isSuccess: newItemSuccess
})

const mapDispatchToProps = dispatch => ({
  dispatchWatchlistCreation: payload =>
    dispatch({
      type: USER_ADD_NEW_ASSET_LIST,
      payload
    })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveAs)
