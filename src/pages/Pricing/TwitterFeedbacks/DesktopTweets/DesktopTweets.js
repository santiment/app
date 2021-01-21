import React, { useCallback, useState } from 'react'
import Masonry from 'react-responsive-masonry'
import { useEventListener } from '../../../../hooks/eventListeners'
import { TweetCard, TweetsParsed } from '../Tweets'
import styles from './DesktopTweets.module.scss'

const SETTINGS = {
  columnWidth: 370,
  height: 300,
  gutterSize: 10
}

function getColumnsCount () {
  const { columnWidth, gutterSize } = SETTINGS

  const width = Math.min(window.innerWidth, 1140)
  return Math.floor(width / (columnWidth + gutterSize))
}

const DesktopTweets = () => {
  const [columnsCount, setColumnsCount] = useState(() => getColumnsCount())

  function _calculateColumnCount () {
    const newCount = getColumnsCount()

    if (newCount !== columnsCount) {
      setColumnsCount(newCount)
    }
  }

  const _onResize = useCallback(
    () => {
      _calculateColumnCount()
    },
    [_calculateColumnCount]
  )

  useEventListener('resize', _onResize)

  return (
    <div className={styles.container}>
      <Masonry columnsCount={columnsCount} gutter={'24px'}>
        {TweetsParsed.map((item, index) => (
          <TweetCard item={item} key={index} />
        ))}
      </Masonry>
      <div className={styles.gradient} />
    </div>
  )
}

export default DesktopTweets
