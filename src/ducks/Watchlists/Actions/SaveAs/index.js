import React from 'react'
import EditForm from '../Edit/EditForm'
import { useUser } from '../../../../stores/user'
import { useDialogState } from '../../../../hooks/dialog'
import { useCreateWatchlist } from '../../gql/list/mutations'
import { getTitleByWatchlistType, SCREENER } from '../../detector'
import ProPopupWrapper from '../../../../components/ProPopup/Wrapper'
import LoginPopup from '../../../../components/banners/feature/PopupBanner'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'

const SaveAs = ({ watchlist, trigger, type, prefix = 'Duplicate' }) => {
  const { isLoggedIn } = useUser()
  const title = getTitleByWatchlistType(type)
  const { isPro } = useUserSubscriptionStatus()
  const { name, description, listItems, function: fn } = watchlist
  const [createWatchlist, { loading }] = useCreateWatchlist(type)
  const { closeDialog, isOpened, toggleOpen } = useDialogState(false)

  if (type === SCREENER && !isPro) {
    return <ProPopupWrapper type={type}>{trigger}</ProPopupWrapper>
  }

  if (!isLoggedIn) {
    return <LoginPopup>{trigger}</LoginPopup>
  }

  function onSubmit (props) {
    createWatchlist({
      ...props,
      listItems: props.listItems || listItems,
      function: fn,
      openOnSuccess: true,
    }).then(closeDialog)
  }

  return (
    <EditForm
      type={type}
      open={isOpened}
      trigger={trigger}
      isLoading={loading}
      toggleOpen={toggleOpen}
      onFormSubmit={onSubmit}
      title={`${prefix} ${title}`}
      buttonLabel={prefix}
      settings={{ name, description }}
      watchlist={watchlist}
    />
  )
}

export default SaveAs
