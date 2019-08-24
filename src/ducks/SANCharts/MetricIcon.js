import React from 'react'

export default ({ isBar, ...props }) => {
  return isBar ? (
    <svg
      width='10'
      height='10'
      viewBox='0 0 10 10'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <rect y='4' width='2' height='6' />
      <rect x='4' width='2' height='10' />
      <rect x='8' y='6' width='2' height='4' />
    </svg>
  ) : (
    <svg
      width='14'
      height='8'
      viewBox='0 0 14 8'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 4C0 3.44772 0.587626 3 1.3125 3H12.6875C13.4124 3 14 3.44772 14 4C14 4.55228 13.4124 5 12.6875 5H1.3125C0.587626 5 0 4.55228 0 4Z'
      />
      <circle cx='7' cy='4' r='3.25' strokeWidth='1.5' />
    </svg>
  )
}
