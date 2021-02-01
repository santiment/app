import React from 'react'
import EditForm from '../Edit/EditForm'
import { useCreateWatchlist } from '../../gql/hooks'
import { getWatchlistAlias } from '../../utils'
import { useDialogState } from '../../../../hooks/dialog'

const NewWatchlist = ({
  createWatchlist: forceCreateWrapper,
  trigger,
  lists,
  type
}) => {
  const { closeDialog, isOpened, toggleOpen } = useDialogState(false)

  const [createWatchlist, data] = useCreateWatchlist()
  const { loading } = data

  function onCreate (data) {
    const callback = forceCreateWrapper || createWatchlist

    callback(data, closeDialog).then(closeDialog)
  }

  return (
    <EditForm
      title={`New ${getWatchlistAlias(type)}`}
      type={type}
      buttonLabel='Create'
      onFormSubmit={({ name, description, isPublic }) => {
        onCreate({ name, description, isPublic, type })
      }}
      isLoading={loading}
      open={isOpened}
      lists={lists}
      toggleOpen={toggleOpen}
      trigger={trigger}
    />
  )
}

export default NewWatchlist
