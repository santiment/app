import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import Twitter from '@santiment-network/ui/Twitter'
import { querySanbasePlans } from 'webkit/api/plans'
import { customerData$ } from 'webkit/stores/user'
import { subscription$ } from 'webkit/stores/subscription'
import Page from './index.svelte'
import Companies from './Companies/Companies'
import { TwitterBg } from './TwitterFeedbacks/TwitterFeedbacks'
import Testimonials from '../../components/Testimonials'
import PageLoader from '../../components/Loader/PageLoader'
import twitterStyles from './twitter.module.scss'
import styles from './index.module.scss'

export default ({ isDesktop }) => {
  const ref = useRef()
  const [referencedNode, setReferencedNode] = useState()
  const [twitterNode, setTwitterNode] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const root = document.getElementById('root')
    let race = false

    Promise.all([querySanbasePlans(), subscription$.query(), customerData$.query()]).finally(() => {
      if (race) return
      setLoading(false)
    })

    !isDesktop && (root.style.overflow = 'clip')

    return () => {
      race = true

      !isDesktop && root.removeAttribute('style')
    }
  }, [])

  useEffect(() => {
    if (loading) return

    const svelte = new Page({ target: ref.current })

    setReferencedNode(document.querySelector('#referenced-by div'))
    setTwitterNode(document.querySelector('#twitter'))

    return () => svelte.$destroy()
  }, [loading])

  return (
    <div ref={ref} className={styles.wrapper}>
      {loading && <PageLoader />}

      {referencedNode &&
        ReactDOM.createPortal(
          <>
            <Companies />
            <Testimonials slice={3} wrapperClass={styles.testimonials} />
          </>,
          referencedNode,
        )}

      {twitterNode &&
        ReactDOM.createPortal(
          <div className={twitterStyles.container}>
            <div className={twitterStyles.header}>
              <TwitterBg className={twitterStyles.headerBg} />
              <div className={twitterStyles.title}>
                <TwitterBg className={twitterStyles.twitterBlue} />
                More reviews from Twitter
              </div>
            </div>
            <Twitter />
          </div>,
          twitterNode,
        )}
    </div>
  )
}
