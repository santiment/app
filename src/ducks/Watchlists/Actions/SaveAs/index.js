import React from 'react'
import EditForm from '../Edit/EditForm'
import { useUser } from '../../../../stores/user'
import LoginPopup from '../../../../components/banners/feature/PopupBanner'
import { useCreateWatchlist } from '../../gql/hooks'
import { useDialogState } from '../../../../hooks/dialog'

const SaveAs = ({
  createWatchlist: forceCreateWrapper,
  watchlist,
  lists,
  trigger,
  type
}) => {
  const { closeDialog, isOpened, toggleOpen } = useDialogState(false)
  const { isLoggedIn } = useUser()

  const [createWatchlist, data] = useCreateWatchlist()
  const { loading } = data

  function onCreate (data) {
    const callback = forceCreateWrapper || createWatchlist

    callback(data, closeDialog).then(closeDialog)
  }

  if (type === 'watchlist' && !isLoggedIn) {
    return <LoginPopup>{trigger}</LoginPopup>
  }

  console.log(type)

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
