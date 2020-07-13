import React from 'react'
import cx from 'classnames'
import styles from './VideoPlayBtn.module.scss'

export const DarkVideoPlayBtn = ({ className }) => (
  <svg
    className={cx(styles.btn, className)}
    width='40'
    height='40'
    viewBox='0 0 40 40'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle opacity='0.8' cx='20' cy='20' r='20' fill='#2F354D' />
    <path d='M26 20L17 25.1961L17 14.8038L26 20Z' fill='#8B93B6' />
  </svg>
)

const LigthVideoPlayBtn = ({ className }) => (
  <svg
    width='48'
    height='48'
    className={cx(styles.btn, className)}
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

export default LigthVideoPlayBtn
