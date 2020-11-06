import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import EditForm from '../Edit/EditForm'
import { USER_ADD_NEW_ASSET_LIST } from '../../../../actions/types'

const SaveAs = ({
  watchlist,
  lists,
  onSubmit,
  trigger,
  isPending,
  createWatchlist,
  isSuccess,
  type
}) => {
  const [isOpened, setIsOpened] = useState(false)

  useEffect(
    () => {
      if (isSuccess) {
        setIsOpened(false)
      }
    },
    [isSuccess]
  )

  return (
    <EditForm
      lists={lists}
      title='Save as ...'
      type={type}
      id={watchlist.id}
      onFormSubmit={({ name, description, isPublic }) => {
        createWatchlist({
          name,
          description,
          isPublic,
          function: watchlist.function,
          type
        })
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
  createWatchlist: payload =>
    dispatch({
      type: USER_ADD_NEW_ASSET_LIST,
      payload
    })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveAs)
