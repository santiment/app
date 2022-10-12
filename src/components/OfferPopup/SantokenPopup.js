import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { saveBoolean, getSavedBoolean } from 'webkit/utils/localStorage'
import { useCustomerData } from './hooks/useCustomerData'
import { ReactComponent as TokensSvg } from './images/tokens.svg'
import { ReactComponent as CloseSvg } from './images/close.svg'
import styles from './SantokensPopup.module.scss'

const IS_DISCOVER_SAN_TOKEN_VIEWED = 'IS_DISCOVER_SAN_TOKEN_VIEWED'
const TIMEOUT = 4 * 1000

const SantokenPopup = () => {
  const { isLoggedIn } = useCustomerData()
  const [isOpen, setIsOpen] = useState(false)

  function handleClosePopup() {
    // saveBoolean(IS_DISCOVER_SAN_TOKEN_VIEWED, JSON.stringify(true))
    setIsOpen(false)
  }

  function handleOpenPopup() {
    const isDiscoverSanTokenViewed = getSavedBoolean(IS_DISCOVER_SAN_TOKEN_VIEWED)

    if (!isDiscoverSanTokenViewed) {
      setIsOpen(true)
    }
  }

  useEffect(() => {
    if (isOpen) return
    const timeoutID = setTimeout(handleOpenPopup, TIMEOUT)
    return () => {
        clearTimeout(timeoutID)
    }
  }, [isOpen])

  if (!isLoggedIn || !isOpen) return <></>

  return (
    <div className={cx('row border', styles.santokens)}>
      <TokensSvg className={styles.tokensvg} />
      <div className={styles.main}>
        <div className={cx('body-2 txt-m mrg--b mrg-s', styles.title)}>Discover SAN token</div>
        <div className={'body-3 c-waterloo mrg--b mrg-l'}>
          SAN tokens provide major discounts to all of Santiment's products. Explore our Academy &
          learn more!
        </div>
        <div>
          <a
            className='btn-1 body-3 mrg--r mrg-l'
            href='https://academy.santiment.net/san-tokens/how-to-buy-san-tokens/'
            target='_blank'
            rel='noopener noreferrer'
            onClick={handleClosePopup}
          >
            Learn about SAN
          </a>
        </div>
      </div>
      <CloseSvg className='btn' onClick={handleClosePopup} />
    </div>
  )
}

export default SantokenPopup
