import React from 'react'
import EditForm from '../Edit/EditForm'
import { useUser } from '../../../../stores/user'
import { useDialogState } from '../../../../hooks/dialog'
import { useCreateWatchlist } from '../../gql/list/mutations'
import { getTitleByWatchlistType, SCREENER } from '../../detector'
import LoginPopup from '../../../../components/banners/feature/PopupBanner'

const SaveAs = ({ watchlist, trigger, type }) => {
  const { isLoggedIn } = useUser()
  const title = getTitleByWatchlistType(type)
  const [createWatchlist, { loading }] = useCreateWatchlist(type)
  const { closeDialog, isOpened, toggleOpen } = useDialogState(false)

  function onCreate (data) {
    createWatchlist(data).then(closeDialog)
  }

  if (type !== SCREENER && !isLoggedIn) {
    return <LoginPopup>{trigger}</LoginPopup>
  }

  return (
    <EditForm
      lists={[]}
      title={'Save as ' + title}
      type={type}
      id={watchlist.id}
      onFormSubmit={({ name, description, isPublic }) => {
        onCreate({
          name,
          description,
          isPublic,
          function: watchlist.function,
          listItems: watchlist.listItems
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
