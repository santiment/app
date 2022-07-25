import React from 'react'
import cx from 'classnames'
import styles from './PageLoader.module.scss'

export const LoaderImage = ({ withAnimation = true, size = 44 }) => (
  <svg
    size={size}
    viewBox='0 0 32 32'
    fill='none'
    className={cx(withAnimation && styles.loader__img)}
  >
    <path fill='#fff' d='M32 16a16 16 0 11-32 0 16 16 0 0132 0z' />
    <path
      fill='#181B2B'
      d='M8.23 16a1.7 1.7 0 01-1.71 1.69A1.7 1.7 0 014.8 16c0-.93.77-1.69 1.72-1.69.94 0 1.71.76 1.71 1.69zM25.48 17.69A1.7 1.7 0 0027.2 16a1.7 1.7 0 00-1.72-1.69A1.7 1.7 0 0023.77 16c0 .93.77 1.69 1.71 1.69zM19.43 9.61a6.5 6.5 0 00-4.4-.67c-1.38.32-2.57 1.26-2.8 2.84-.18 1.3.22 2.33.9 3.14a9.31 9.31 0 002.27 1.77c.81.5 1.48.9 1.97 1.38.46.44.7.9.7 1.5 0 .69-.2 1.04-.43 1.24-.24.22-.63.38-1.19.42a5.43 5.43 0 01-3.3-.97l-1.21 1.56a7.42 7.42 0 004.65 1.37 3.92 3.92 0 002.4-.94 3.48 3.48 0 001.07-2.68c0-1.26-.55-2.19-1.28-2.9-.7-.67-1.6-1.2-2.32-1.65a7.52 7.52 0 01-1.8-1.36c-.35-.42-.55-.9-.45-1.61.08-.59.5-1.02 1.28-1.2a4.5 4.5 0 013 .5l.94-1.74z'
    />
    <path
      fill='#D2D6E7'
      d='M16 30.83a14.83 14.83 0 100-29.66 14.83 14.83 0 000 29.66zM32 16a16 16 0 11-32 0 16 16 0 0132 0z'
    />
  </svg>
)

const PageLoader = ({ className, text = 'Loading', containerClass = 'page' }) => (
  <div className={containerClass}>
    <div className={cx(styles.loader, className)}>
      <LoaderImage />
      <span className={styles.text}>{text}...</span>
    </div>
  </div>
)

export default PageLoader
