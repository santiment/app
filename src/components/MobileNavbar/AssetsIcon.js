import React from 'react'

export default props => (
  <svg
    width='20'
    height='18'
    viewBox=' 0 0 20 18'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M14.5 8.7a4.5 4.5 0 11-9 .6 4.5 4.5 0 019-.6zm-4.33 2.8a2.5 2.5 0 10-.34-5 2.5 2.5 0 00.34 5z'
      fill='var(--menu-active-accent, var(--rhino))'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M8.95 17.1a8.3 8.3 0 119.03-5.93 1 1 0 01-1.92-.55 6.3 6.3 0 10-6.85 4.5 1 1 0 11-.26 1.99z'
      fill='var(--menu-active-shade, var(--porcelain))'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M17.41 10.01a1 1 0 01.68 1.24 8.3 8.3 0 01-10.3 5.65 1 1 0 01.56-1.92 6.3 6.3 0 007.82-4.29 1 1 0 011.24-.68z'
      fill='var(--menu-active-accent, var(--rhino))'
    />
  </svg>
)
