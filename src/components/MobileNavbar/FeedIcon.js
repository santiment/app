import React from 'react'

export default props => (
  <svg
    width='18'
    height='18'
    viewBox='0 0 18 18'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M7.59.6A1 1 0 006.24.16a9.39 9.39 0 004.25 17.76c1.95 0 3.69-.6 5.33-1.6a1 1 0 00.48-.89c.02-.86-1.01-1.92-1.44-2.62a1 1 0 00-1.7 1.04l.75 1.24a7.39 7.39 0 01-7.66-12.6l.98 1.63a1 1 0 101.71-1.04C8.44 2.26 8.01 1.43 7.6.6z'
      fill='var(--menu-active-shade, var(--porcelain))'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M16.9 8.33a6.07 6.07 0 11-12.14 0 6.07 6.07 0 0112.13 0zm-2 0a4.07 4.07 0 01-6.85 2.96l3.32-2.12a1 1 0 10-1.08-1.68L6.97 9.6a4.06 4.06 0 117.92-1.28z'
      fill='var(--menu-active-accent, var(--rhino))'
    />
  </svg>
)
