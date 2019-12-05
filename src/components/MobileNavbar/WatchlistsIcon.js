import React from 'react'

export default props => (
  <svg
    width='23'
    height='18'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M.46 9L1 8.13l.07-.12C1.65 6.97 5.57 0 11.5 0c5.94 0 9.85 6.97 10.43 8.01l.06.12.54.87-.54.87-.06.12c-.58 1.04-4.5 8.01-10.43 8.01-5.85 0-9.84-6.97-10.42-8.01A4.3 4.3 0 001 9.87L.46 9zm2.35 0l.02.02c.33.6 1.2 2.13 2.63 3.7C7.14 14.55 9.2 16 11.49 16c2.29 0 4.36-1.44 6.04-3.29 1.42-1.56 2.3-3.1 2.63-3.69l.01-.02-.01-.02c-.34-.6-1.2-2.13-2.63-3.7C15.85 3.45 13.78 2 11.49 2 9.21 2 7.14 3.44 5.46 5.29A20.5 20.5 0 002.8 9z'
      fill='var(--menu-active-shade, var(--porcelain))'
    />
    <path
      d='M11 10.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'
      fill='var(--menu-active-accent, var(--mirage))'
    />
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M6 9a5 5 0 119.99-.01A5 5 0 016 9zm2 0a3 3 0 116 0 3 3 0 11-6 0z'
      fill='var(--menu-active-accent, var(--mirage))'
    />
  </svg>
)
