import React from 'react'
import cx from 'classnames'
import styles from './VideoPlayBtn.module.scss'

const VideoPlayBtn = ({ className, ...rest }) => (
  <svg
    width='48'
    height='48'
    {...rest}
    className={cx(className, styles.btn)}
    viewBox='0 0 48 48'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='24' cy='24' r='24' fill='var(--white)' />
    <path
      d='M20 31.0914C20 31.8981 20.906 32.3728 21.5692 31.9136L31.8124 24.8222C32.3868 24.4245 32.3868 23.5755 31.8124 23.1778L21.5692 16.0864C20.906 15.6272 20 16.1019 20 16.9086V31.0914Z'
      fill='var(--jungle-green)'
    />
  </svg>
)

export default VideoPlayBtn
