import React from 'react'
import EditForm from '../Edit/EditForm'
import { useUser } from '../../../../stores/user'
import { useDialogState } from '../../../../hooks/dialog'
import { useCreateWatchlist } from '../../gql/list/mutations'
import LoginPopup from '../../../../components/banners/feature/PopupBanner'

const SaveAs = ({ watchlist, lists, trigger, type }) => {
  const { closeDialog, isOpened, toggleOpen } = useDialogState(false)
  const { isLoggedIn } = useUser()

  const [createWatchlist, data] = useCreateWatchlist(type)
  const { loading } = data

  function onCreate (data) {
    createWatchlist(data).then(closeDialog)
  }

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
        onCreate({
          name,
          description,
          isPublic,
          function: watchlist.function,
          listItems: watchlist.listItems,
          type
        })
      }}
      isLoading={loading}
      open={isOpened}
      toggleOpen={toggleOpen}
      trigger={trigger}
    />
  )
}

export default SaveAs
