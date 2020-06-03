import React from 'react'
import styles from './VideoPlayBtn.module.scss'

const VideoPlayBtn = ({ onPlayClick, ...rest }) => (
  <svg
    onClick={onPlayClick}
    className={styles.btn}
    {...rest}
    width='96'
    height='96'
    viewBox='0 0 96 96'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g filter='url(#filter0_dd)'>
      <circle cx='48' cy='44' r='24' fill='var(--white)' />
    </g>
    <path
      d='M44 51.0914C44 51.8981 44.906 52.3728 45.5692 51.9136L55.8124 44.8222C56.3868 44.4245 56.3868 43.5755 55.8124 43.1778L45.5692 36.0864C44.906 35.6272 44 36.1019 44 36.9086V51.0914Z'
      fill='var(--jungle-green)'
    />
    <defs>
      <filter
        id='filter0_dd'
        x='0'
        y='0'
        width='96'
        height='96'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity='0' result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
        />
        <feOffset dy='2' />
        <feGaussianBlur stdDeviation='3' />
        <feColorMatrix
          type='matrix'
          values='0 0 0 0 0.0941176 0 0 0 0 0.105882 0 0 0 0 0.168627 0 0 0 0.02 0'
        />
        <feBlend
          mode='normal'
          in2='BackgroundImageFix'
          result='effect1_dropShadow'
        />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
        />
        <feOffset dy='4' />
        <feGaussianBlur stdDeviation='12' />
        <feColorMatrix
          type='matrix'
          values='0 0 0 0 0.0941176 0 0 0 0 0.105882 0 0 0 0 0.168627 0 0 0 0.05 0'
        />
        <feBlend
          mode='normal'
          in2='effect1_dropShadow'
          result='effect2_dropShadow'
        />
        <feBlend
          mode='normal'
          in='SourceGraphic'
          in2='effect2_dropShadow'
          result='shape'
        />
      </filter>
    </defs>
  </svg>
)

export default VideoPlayBtn
