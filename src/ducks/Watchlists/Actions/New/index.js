import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import EditForm from '../Edit/EditForm'
import { USER_ADD_NEW_ASSET_LIST } from '../../../../actions/types'

const NewList = ({
  onSubmit,
  trigger,
  dispatchWatchlistCreation,
  createWatchlist = dispatchWatchlistCreation,
  isPending,
  isSuccess,
  lists,
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
      title={`New ${type}`}
      type={type}
      buttonLabel='Create'
      onFormSubmit={({ name, description, isPublic }) => {
        createWatchlist({ name, description, isPublic, type })
      }}
      isLoading={isPending}
      open={isOpened}
      lists={lists}
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
)(NewList)
