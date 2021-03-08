import React from 'react'
import EditForm from '../Edit/EditForm'
import { useUser } from '../../../../stores/user'
import { useDialogState } from '../../../../hooks/dialog'
import { useCreateWatchlist } from '../../gql/list/mutations'
import { getTitleByWatchlistType, SCREENER } from '../../detector'
import LoginPopup from '../../../../components/banners/feature/PopupBanner'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'
import ProPopupWrapper from '../../../../components/ProPopup/Wrapper'

const SaveAs = ({ watchlist, trigger, type }) => {
  const { isLoggedIn } = useUser()
  const { isPro } = useUserSubscriptionStatus()
  const title = getTitleByWatchlistType(type)
  const [createWatchlist, { loading }] = useCreateWatchlist(type)
  const { closeDialog, isOpened, toggleOpen } = useDialogState(false)

  if (type === SCREENER && !isPro) {
    return <ProPopupWrapper type={SCREENER}>{trigger}</ProPopupWrapper>
  }

  if (!isLoggedIn) {
    return <LoginPopup>{trigger}</LoginPopup>
  }

  return (
    <EditForm
      lists={[]}
      title={'Save as ' + title}
      type={type}
      id={watchlist.id}
      onFormSubmit={({ name, description, isPublic }) => {
        createWatchlist({
          name,
          description,
          isPublic,
          function: watchlist.function,
          listItems: watchlist.listItems
        }).then(closeDialog)
      }}
      isLoading={loading}
      open={isOpened}
      toggleOpen={toggleOpen}
      trigger={trigger}
    />
  )
}

export default SaveAs
