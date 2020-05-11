import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '@santiment-network/ui/Button'
import Dialog from '@santiment-network/ui/Dialog'
import Panel from '@santiment-network/ui/Panel'
import { PATHS } from '../../App'
import { checkIsLoggedIn } from '../../pages/UserSelectors'
import styles from './CtaJoinPopup.module.scss'

const TIMEOUT = 2 * 60 * 1000

let timeoutId = null

const CtaJoinPopup = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return null
  }

  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    timeoutId = setTimeout(() => {
      if (!isLoggedIn) {
        setOpen(true)
      }
    }, TIMEOUT)

    return () => {
      timeoutId && clearTimeout(timeoutId)
    }
  }, [])

  return (
    <Dialog
      title=''
      open={isOpen}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      classes={styles}
    >
      <Panel padding className={styles.container}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='115'
          height='93'
          fill='none'
        >
          <path
            fill='var(--porcelain)'
            d='M85.7 37c-6.3-2.6-2.6 7.6 0 13 .6 1.4 2.3 8.3 0 15.4-2.3 7-8.1 5.7-14.3 10.8-6.2 5.2-10.7-1.9-18.9 3.2-8.5 5.4-10.7 3.9-18.5 3.9-7.8 0-17.5-.7-21.1 3.2C9.3 90.3 1.5 85.2.2 89-1.1 93 4.1 94.1 10.9 92c6.9-2.2 11.7-.3 23.1-2.9 11.4-2.5 10.7 1 24.7-2.5 14-3.6 20.2-5.1 27-10.3 6.8-5 7.5-14.3 8.8-18.5 1.3-4.2-1-17.6-8.8-20.8z'
          />
          <path
            fill='var(--jungle-green-accent)'
            d='M35.5 77a30 30 0 012.7 6.6s-9.4 2-14.5 1.6c-5.2-.3-3.2-5-4-8-1.8-.9-3-3-1.8-5 1.6-2.7 3.4-5.6 5.2-8.2l.6-1.4c1.3-3.7 6.3-3 6.7.9.5 4.8 1.3 10.2 5.1 13.5zM86.3 53.9c-1-5.1-2-4.5-3.5-6.4-1.6-2 .5-5.9 0-7.4-1.2-3-3-6.4-4.3-8.3-1.4-2-6.9-8-10.5-8.3-3.6-.2-11.2-2.5-15.1 5-6.2 4.8-6.6 18.4-5.2 24.8C51.8 72.7 72 79 78.5 73c6.6-5.8 8.8-14 7.8-19.1zM68 64.9c.7-1.5 1.4-3 2.3-4.2.2-.4 1.4-1.6 1.5-2.4l1 1c1.1.6 2.2 1 3.4.8.8 0 1.7-.4 2.3-.8-.4 2.6-1.2 5.3-3 7l-1.8.9-.5.3c-2 .5-4.4-.2-6.4-1.2a3 3 0 001.2-1.5zM54.6 41.1c0-1.9.1-3.7.4-5.6.8.3 1.6.4 2.4 0 3-1 5.1.4 5.9 2.7l-2.4 3-1.6 3-1.3-1.6c-1-1.3-2.2-1.7-3.4-1.5z'
          />
          <path
            fill='var(--porcelain)'
            d='M81 13c-1.4.7-2 2.1-3.6 2.6-1.3.5-2.9.5-4.3.2-1.6-.2-3 1.2-2.1 2.7 1.5 2.6 4.5 4 7.5 3.6 2.8-.4 6.8-2.4 7.2-5.6.4-2.5-2.1-5-4.8-3.5zM100.8 6.2c-.9 0-1.7.3-2.4.7l-.6.2-.5.2a5 5 0 00-1 .4l-.2.1c-.8.4-1.6 1-1.6 1.9.2 2 2.2 3 4 3.1 2.3.2 4.5-.8 5.3-3 .5-1.8-1.2-3.6-3-3.6zM105 50.8c-1.1-.3-2 .3-2.9 1 .4-.4-.6.3-.5.3l-.3.4-1-.3c-.3 0-.8-.3-1.2-.5-1-.4-2.5.4-2.7 1.5-.4 2.7 1.6 5 4.4 5.3 2.8.3 6-1.6 6.2-4.5 0-1.3-.5-2.8-2-3.2z'
          />
          <path
            fill='var(--rhino)'
            d='M113.2 41.4c-.7 0-1.5-.6-1.5-1.7v-.2c0-.7.4-1 .6-1.1.2-.2.6-.3.9-.3.3-.2.6-.2 1 0 .5.4.8 1 .8 1.6 0 1-.8 1.7-1.8 1.7z'
          />
          <path
            stroke='var(--rhino)'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M84 40.3c.4-.2.6-.8.4-1.3-3.3-7.7-9-13.9-14.8-16.1-2.4-1-4.7-1.5-6.9-1.6h-.9c-6.7 0-10.9 4-13.2 7.4-2.9 4-4.5 9.5-4.5 14.9C44 58 54.5 78.3 71.5 78.3c9.9 0 16.5-11.8 16.5-22.8 0-2.1-.2-4.3-.6-6.4'
          />
          <path
            stroke='var(--rhino)'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M50.8 26.6c-7.7 9-14.4 18-21.5 27.5-4.7 6.3-9.5 12.9-14.7 19.4l-4.8 6a246 246 0 00-7.5 9.3 1 1 0 000 1c.2.3.5.5.8.5h.2l70-12.3M21.8 86.5A47.3 47.3 0 0116 72.2'
          />
          <path
            stroke='var(--rhino)'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M40 84a1 1 0 01-.9-.5 51.5 51.5 0 01-10-28.8M65.2 51.8c1-2.8 3.8-4.8 6.6-4.8 1.4 0 2 .6 2.6 1 .4.4.7.8 1.7.8s1.5-.7 2.3-2c1-1.4 2-3.2 4.7-3.2l.8.2 1.4.2c1.6 0 3.1-1 4-2.3M74.8 67.5c-.4 0-.7 0-1-.3-.7-.3-1.9-.8-4.2-1.4-.5-.2-.8-.6-.8-1a1 1 0 010-1.2l1.8-3c.5-1 .8-1.5 1.4-1.6.7-.2 1.3.2 2.2.7.6.5 1.7 1.1 3.2 2 .3 0 .5.3.5.6.1.3 0 .6 0 .8a11.1 11.1 0 00-1.8 3.3c-.2.4-.4.9-.9 1l-.4.1zM58.3 41a3.1 3.1 0 01-3.3-3.2c0-1.7 1.1-4 3.1-3.9 1.1.1 2.1.7 2.9 1.6.4.5.6 1.3.6 2 0 1.7-1.3 3.5-3.4 3.5zM101.9 55.5c-1 0-1.8-.7-3.2-1.9l-1.4-1a1 1 0 01-.4-.8l-.2-.2a1 1 0 01.1-1.3c1.6-1.5 2.1-2.6 2.5-3.4.4-.6.6-1.2 1.3-1.3.8-.2 1.4.2 3.3 1.6.6.4 1.2 1 2 1.4.4.3.5.9.3 1.2l-.6 1.2c-1.6 2.9-2.2 4-3.4 4.3 0 .2-.2.2-.3.2zM86.7 32.2c0-3.8 3-8.1 7.4-8.1 1.5 0 2.3.9 2.3 2.4v1l-.1.7c0 1 .9 1.5 1.2 1.5 1 0 1.8-1.5 2.5-3 1.2-2 2.5-4.7 5.4-4.7 1 0 1.8.9 1.8 1.8v.7l-.1.7c1-.2 2-1.1 2.8-2M77 18.7l-.5-.1-1.2-.8-4.4-2.6c-.4-.3-.6-.8-.4-1.3l.4-.4c0-.2.2-.3.4-.4 1.9-2.3 2.7-3.6 3.2-4.5.5-.8.8-1.2 1.4-1.3.7-.2 1 .2 1.7.7.7.6 2 1.7 4.9 3.2.3 0 .5.3.5.7 0 .3 0 .5-.2.8l-5 5.7-.4.3H77zM97.7 9.1c-1 0-2-.4-2.7-1.1a3.7 3.7 0 01-1.3-3c0-1.9 1.4-4 3.5-4H97.8c2 0 3.9 2 3.9 4.2 0 2.4-2 4-4 4zM103 63.7l.5.2c1.8.6 6 2.1 8 2.1h.6'
          />
        </svg>
        <div className={styles.join}>Join our community!</div>
        <div className={styles.description}>
          Santiment provides custom metrics, insights metrics and data-driven
          strategies on 900+ cryptocurrencies.
        </div>
        <Button
          as={Link}
          to={PATHS.CREATE_ACCOUNT}
          variant='fill'
          accent='positive'
          className={styles.btn}
        >
          Start crypto journey
        </Button>
      </Panel>
    </Dialog>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state)
})

export default connect(mapStateToProps)(CtaJoinPopup)
