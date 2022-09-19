import React, { useRef, useState } from 'react'
import cx from 'classnames'
import { copy } from 'webkit/utils'
import Svg from 'webkit/ui/Svg/react'
import ShareModalTrigger from '../../../../../components/Share/ShareModalTrigger'
import { useShortShareLink } from '../../../../../components/Share/hooks'
import styles from './Share.module.scss'

const Share = ({ id }) => {
  const [isShareOpened, setIsShareOpened] = useState(false)
  const clearTimerRef = useRef()
  const { shortShareLink, getShortShareLink } = useShortShareLink()

  function onShareClick() {
    getShortShareLink(window.location.pathname)
    setIsShareOpened(true)
  }

  function onCopyLinkClick() {
    if (clearTimerRef.current) clearTimerRef.current()

    getShortShareLink(window.location.pathname).then((url) => {
      const node = document.getElementById(id)
      const clb = () => node && (node.ariaLabel = 'Copy link')

      if (node) node.ariaLabel = 'Copied!'
      clearTimerRef.current = copy(url, clb)
    })
  }

  return (
    <>
      <div className='row v-center btn--green'>
        <button className={cx(styles.share, styles.action, 'btn')} onClick={onShareClick}>
          Share
        </button>
        <button
          id={id}
          className={cx(styles.link, styles.action, 'btn row hv-center expl-tooltip')}
          aria-label='Copy link'
          onClick={onCopyLinkClick}
        >
          <Svg id='link' w='16' />
        </button>
      </div>

      <ShareModalTrigger
        isDialogOnly
        classes={styles}
        shareLink={shortShareLink}
        open={isShareOpened}
        onClose={() => setIsShareOpened(false)}
      />
    </>
  )
}

export default Share
