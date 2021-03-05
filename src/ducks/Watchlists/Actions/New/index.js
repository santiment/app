import React from 'react'
import EditForm from '../Edit/EditForm'
import { useDialogState } from '../../../../hooks/dialog'
import { getTitleByWatchlistType } from '../../detector'
import { useCreateWatchlist } from '../../gql/list/mutations'

const NewWatchlist = ({ trigger, type }) => {
  const { closeDialog, isOpened, toggleOpen } = useDialogState(false)

  const [createWatchlist, data] = useCreateWatchlist(type)
  const { loading } = data

  function onCreate (data) {
    createWatchlist(data).then(closeDialog)
  }

  return (
    <EditForm
      title={`New ${getTitleByWatchlistType(type)}`}
      type={type}
      buttonLabel='Create'
      onFormSubmit={({ name, description, isPublic }) => {
        onCreate({ name, description, isPublic })
      }}
      isLoading={loading}
      open={isOpened}
      lists={[]}
      toggleOpen={toggleOpen}
      trigger={trigger}
    />
  )
}

export default NewWatchlist
