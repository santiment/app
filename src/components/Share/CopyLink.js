import React, { useState } from 'react'
import cx from 'classnames'
import copy from 'copy-to-clipboard'
import linkImg from '../../assets/link.svg'
import styles from './CopyLink.module.scss'

const CopyLink = ({ link, disabled }) => {
  const [isCopied, setIsCopied] = useState(undefined)

  function handleCopyClick() {
    if (!disabled) {
      copy(link)

      setIsCopied(setTimeout(() => setIsCopied(undefined), 1000))
    }
  }

  return (
    <button
      className={cx(styles.btn, 'btn-2 row hv-center body-2 c-black')}
      onClick={handleCopyClick}
    >
      <img src={linkImg} alt='Link' className='mrg-m mrg--r' />
      {isCopied ? 'Copied!' : 'Copy link'}
    </button>
  )
}

export default CopyLink
