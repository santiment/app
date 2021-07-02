import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Icon from '@santiment-network/ui/Icon'
import styles from './index.module.scss'

const CHANNEL_LINK = 'https://www.youtube.com/channel/UCSzP_Z3MrygWlbLMyrNmMkg'

const LiveWidget = () => {
  const [isShow, setIsShow] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [player, setPlayer] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)

  function initPlayer () {
    if (
      typeof window.YT === 'undefined' ||
      typeof window.YT.Player === 'undefined'
    ) {
      setTimeout(initPlayer, 1000)
    } else {
      const stream = new window.YT.Player('live_stream', {
        events: { onReady: () => setPlayer(stream) }
      })
    }
  }

  useEffect(
    () => {
      if (player !== null) {
        isLiveStreamExist()
      }
    },
    [player]
  )

  console.log(player)

  useEffect(
    () => {
      if (isShow) {
        const stream = document.getElementById('live_stream')
        // const youtubeCounter = stream.contentDocument.querySelector('.ytp-offline-slate-bar')
        // youtubeCounter.setAttribute('style', 'left: 0 !important;')

        player.mute()
        player.playVideo()
        setVideoUrl(player.getVideoUrl())
        // stream.src = 'https://www.youtube.com/embed/live_stream?channel=UCSzP_Z3MrygWlbLMyrNmMkg&enablejsapi=1'
      } else {
        // stream.src = 'https://www.youtube.com/embed/live_stream?channel=UC6K7yzj2kV3v3sASdaYCY0Q&enablejsapi=1'
      }
    },
    [isShow]
  )

  function isLiveStreamExist () {
    console.log(player.getPlayerState())
    const { video_id, title } = player.getVideoData()
    const isAvailableStream = !!title && video_id !== 'live_stream'
    if (!isAvailableStream) {
      setIsShow(false)
      setIsStarted(false)
      setTimeout(isLiveStreamExist, 3000)
    } else {
      setIsShow(true)
      const isStarted = player.getPlayerState() === 1
      if (isStarted) {
        setIsStarted(true)
      }
      setTimeout(isLiveStreamExist, 5000)
    }
  }

  useEffect(initPlayer, [])

  return (
    <div
      className={cx(
        styles.wrapper,
        isShow && isStarted && styles.wrapper__visible
      )}
    >
      <div className={styles.close}>
        <Icon type='close-medium' />
      </div>
      <h3 className={styles.title}>Join our Live weekly market breakdown!</h3>
      <iframe
        id='live_stream'
        title='live_stream'
        width='280'
        height='157'
        // src="https://www.youtube.com/embed/live_stream?channel=UC6K7yzj2kV3v3sASdaYCY0Q&enablejsapi=1&rel=0&showinfo=0&allowfullscreen"
        src='https://www.youtube.com/embed/live_stream?channel=UCSzP_Z3MrygWlbLMyrNmMkg&enablejsapi=1&rel=0&showinfo=0&allowfullscreen'
        frameBorder='0'
        allowFullScreen
      />
      <a
        href={videoUrl || CHANNEL_LINK}
        className={styles.link}
        target='_blank'
        rel='noopener noreferrer'
      />
    </div>
  )
}

export default LiveWidget
