import React from 'react'
import EditForm from '../Edit/EditForm'
import { useUser } from '../../../../stores/user'
import { useDialogState } from '../../../../hooks/dialog'
import { useUserWatchlists } from '../../gql/lists/hooks'
import { useCreateWatchlist } from '../../gql/list/mutations'
import { getTitleByWatchlistType, SCREENER } from '../../detector'
import ProPopupWrapper from '../../../../components/ProPopup/Wrapper'
import LoginPopup from '../../../../components/banners/feature/PopupBanner'
import { useUserSubscriptionStatus } from '../../../../stores/user/subscriptions'

const NewWatchlist = ({ trigger, type, openOnSuccess = true }) => {
  const { isLoggedIn } = useUser()
  const [lists] = useUserWatchlists(type)
  const title = getTitleByWatchlistType(type)
  const { isPro } = useUserSubscriptionStatus()
  const [createWatchlist, { loading }] = useCreateWatchlist(type)
  const { closeDialog, isOpened, toggleOpen } = useDialogState(false)

  if (type === SCREENER && !isPro) {
    return <ProPopupWrapper type={type}>{trigger}</ProPopupWrapper>
  }

  if (!isLoggedIn) {
    return <LoginPopup>{trigger}</LoginPopup>
  }

  function onSubmit ({ name, description, isPublic }) {
    createWatchlist({
      name,
      description,
      isPublic,
      openOnSuccess
    }).then(closeDialog)
  }

  return (
    <EditForm
      type={type}
      lists={lists}
      open={isOpened}
      trigger={trigger}
      isLoading={loading}
      buttonLabel='Create'
      title={'New ' + title}
      toggleOpen={toggleOpen}
      onFormSubmit={onSubmit}
    />
  )
}

export default NewWatchlist
