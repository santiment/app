import React from 'react'
import EditForm from '../Edit/EditForm'
import { useUser } from '../../../../stores/user'
import { useUserWatchlists } from '../../gql/lists/hooks'
import { useDialogState } from '../../../../hooks/dialog'
import { useCreateWatchlist } from '../../gql/list/mutations'
import { getTitleByWatchlistType, SCREENER } from '../../detector'
import LoginPopup from '../../../../components/banners/feature/PopupBanner'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import ProPopupWrapper from '../../../../components/ProPopup/Wrapper'

const SaveAs = ({ watchlist, trigger, type }) => {
  const { isLoggedIn } = useUser()
  const [lists] = useUserWatchlists(type)
  const title = getTitleByWatchlistType(type)
  const { isPro } = useUserSubscriptionStatus()
  const [createWatchlist, { loading }] = useCreateWatchlist(type)
  const { closeDialog, isOpened, toggleOpen } = useDialogState(false)

  if (type === SCREENER && !isPro) {
    return <ProPopupWrapper type={SCREENER}>{trigger}</ProPopupWrapper>
  }

  if (!isLoggedIn) {
    return <LoginPopup>{trigger}</LoginPopup>
  }

  function onSubmit ({ name, description, isPublic }) {
    createWatchlist({
      name,
      description,
      isPublic,
      function: watchlist.function,
      listItems: watchlist.listItems,
      openOnSuccess: true
    }).then(closeDialog)
  }

  return (
    <EditForm
      lists={lists}
      title={'Save as ' + title}
      type={title}
      settings={{
        name: watchlist.name,
        description: watchlist.description
      }}
      onFormSubmit={onSubmit}
      isLoading={loading}
      open={isOpened}
      toggleOpen={toggleOpen}
      trigger={trigger}
    />
  )
}

export default SaveAs
