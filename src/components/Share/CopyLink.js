import React, { useState } from 'react'
import cx from 'classnames'
import copy from 'copy-to-clipboard'
import { trackShareLinkCopy } from 'webkit/analytics/events/interaction'
import linkImg from '../../assets/link.svg'
import styles from './CopyLink.module.scss'

const CopyLink = ({ link, source }) => {
  const [isCopied, setIsCopied] = useState(undefined)

  function handleCopyClick() {
    copy(link)
    trackShareLinkCopy({ url: link, source })

    setIsCopied(setTimeout(() => setIsCopied(false), 10000))
  }

  return (
    <button className={cx(styles.btn, 'btn-2 row hv-center body-2')} onClick={handleCopyClick}>
      <img src={linkImg} alt='Link' className='mrg-m mrg--r' />
      {isCopied ? 'Copied!' : 'Copy link'}
    </button>
  )
}

export default CopyLink
