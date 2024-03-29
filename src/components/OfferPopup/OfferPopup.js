import React, { useEffect } from 'react'
import cx from 'classnames'
import { useHistory } from 'react-router-dom'
import Dialog from '@santiment-network/ui/Dialog'
import { saveBoolean, getSavedBoolean } from 'webkit/utils/localStorage'
import { useDialogState } from '../../hooks/dialog'
import { useCustomerData } from './hooks/useCustomerData'
import { ReactComponent as OffersSvg } from './images/offers.svg'
import styles from './OfferPopup.module.scss'

const DISCOUNT_DESCRIPTION = {
  50: "Don't miss this one-time offer on all of our annual plans. This is valid exclusively while you are on a free trial!",
  35: "Don't miss our final offer on all of our annual plans. This is valid up until your first paid membership month elapses!",
}

const IS_OFFER_VIEWED = 'IS_OFFER_VIEWED'
const TIMEOUT = 5 * 60 * 1000

const OfferPopup = () => {
  const history = useHistory()
  const { isOpened, closeDialog, openDialog } = useDialogState()
  const { annualDiscount, isLoggedIn } = useCustomerData()

  function handleCloseOffer() {
    saveBoolean(IS_OFFER_VIEWED, JSON.stringify(true))
    closeDialog()
  }

  function handleOpenOffer() {
    const isOfferViewed = getSavedBoolean(IS_OFFER_VIEWED)

    if (!isOfferViewed) {
      openDialog()
    }
  }

  const hideDialog = !isLoggedIn || (annualDiscount && !annualDiscount.isEligible)

  useEffect(() => {
    if (!hideDialog) {
      const timeoutID = setTimeout(handleOpenOffer, TIMEOUT)

      return () => {
        clearTimeout(timeoutID)
      }
    }
  }, [hideDialog])

  if (hideDialog) {
    return null
  }

  const { discount: { percentOff } = { percentOff: 50 } } = annualDiscount

  const description = DISCOUNT_DESCRIPTION[percentOff]

  return (
    <Dialog
      withAnimation
      title={''}
      open={isOpened}
      trigger={<></>}
      onClose={handleCloseOffer}
      classes={{
        dialog: styles.wrapper,
        title: styles.title,
      }}
    >
      <div className={cx('row hv-center', styles.content)}>
        <OffersSvg />
        <div className={styles.rightBlock}>
          <div className='h2 txt-m mrg--b mrg-m'>{percentOff}% OFF offer!</div>
          <div className={cx('body-1', styles.description)}>{description}</div>
          <div>
            <button
              className={cx('btn-1 mrg--r mrg-l body-2', styles.upgradeBtn)}
              onClick={() => {
                handleCloseOffer()
                history.push('/pricing')
              }}
            >
              Upgrade Now
            </button>
            <button className={cx('btn-2 body-2', styles.cancelBtn)} onClick={handleCloseOffer}>
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default OfferPopup
