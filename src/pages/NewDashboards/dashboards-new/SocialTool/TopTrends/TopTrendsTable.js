import React, { useRef, useState } from 'react'
import cx from 'classnames'
import Tooltip from '@santiment-network/ui/Tooltip'
import Svg from 'webkit/ui/Svg/react'
import { copy } from 'webkit/utils'
import Table from '../../../../../ducks/_Table'
import ShareModalTrigger from '../../../../../components/Share/ShareModalTrigger'
import { useTrendingWords } from '../../../../../ducks/TrendsTable/hooks'
import { useColumns } from '../../../../../ducks/_Table/hooks'
import { useShortShareLink } from '../../../../../components/Share/hooks'
import { useSocialDominanceTrendingWords } from '../hooks'
import { COLUMNS } from './TopTrendsColumns'
import styles from './TopTrends.module.scss'

const LINK_SELECTOR = `.${styles.word}`

const TopTrendsTable = () => {
  const [isShareOpened, setIsShareOpened] = useState(false)
  const clearTimerRef = useRef()
  const { trendingWords, words, isLoading } = useTrendingWords()
  const { data } = useSocialDominanceTrendingWords()
  const columns = useColumns(COLUMNS)

  const sharePath = '/charts' + window.location.search
  const { shortShareLink, getShortShareLink } = useShortShareLink(sharePath)

  function onRowClick(_, { target, currentTarget }) {
    if (!target.closest('a')) {
      currentTarget.querySelector(LINK_SELECTOR).click()
    }
  }

  function onShareClick() {
    getShortShareLink(window.location.pathname)
    setIsShareOpened(true)
  }

  function onCopyLinkClick() {
    if (clearTimerRef.current) clearTimerRef.current()

    getShortShareLink(window.location.pathname).then((url) => {
      const node = document.querySelector('.copy .link')
      const clb = () => node && (node['aria-label'] = 'Copy link')

      if (node) node['aria-label'] = 'Copied!'
      clearTimerRef.current = copy(url, clb)
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.topBar, 'row v-center justify')}>
        <p className={styles.socDominance}>
          Social dominance SUM:{' '}
          <Tooltip
            trigger={<span className={cx(styles.sum, 'btn mrg-m mrg--l')}>{data.toFixed(1)}%</span>}
            position='top'
            className={cx(styles.tooltip, 'border box body-3')}
          >
            <div className='relative row body-3'>
              This metric calculates the social volume for a list of words, and measures what its
              discussion rate is vs. all other topics
            </div>
          </Tooltip>
        </p>
        <div>
          <div className='row v-center btn--green'>
            <button className={cx(styles.share, styles.action, 'btn')} onClick={onShareClick}>
              Share
            </button>
            <button
              className={cx(styles.link, styles.action, 'copy link btn expl-tooltip')}
              aria-label='Copy link'
              onClick={onCopyLinkClick}
            >
              <Svg id='link' w='16' />
            </button>
          </div>
        </div>
      </div>
      <Table
        className={cx(styles.table)}
        items={trendingWords}
        columns={columns}
        itemKeyProperty='word'
        itemProps={{ words }}
        minRows={10}
        isLoading={isLoading}
        onRowClick={onRowClick}
      />
      <ShareModalTrigger
        isDialogOnly
        classes={styles}
        shareLink={shortShareLink}
        open={isShareOpened}
        onClose={() => setIsShareOpened(false)}
      />
    </div>
  )
}

export default TopTrendsTable
