import React from 'react'

export const SvgNew = ({ className, isDisabled }) => (
  <svg width='45' height='48' fill='none' style={{ fill: 'none' }} className={className}>
    <path
      fill={isDisabled ? 'var(--athens)' : 'var(--porcelain)'}
      d='M11.78 45.58c-7.03-3.3-9.1-12.9-6.56-11.77 16.88 7.5 16.34-1.22 21.5-4.63 8.57-5.68 11.52-11.51 6.97-18.28-1.91-2.84-6.5-8.01-3.63-8.62 2.88-.6 11.53 3.53 13.44 11.26 2.52 10.2 1.5 23.83-7.81 30.62-5.16 3.77-16.88 4.71-23.9 1.42z'
    />
    <g strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5'>
      <g stroke={isDisabled ? 'var(--waterloo)' : 'var(--rhino)'}>
        <path d='M20.55 29.63c-.38-2.73-.5-5.58-.74-8.3-.12-2.6-.37-5.45-.62-8.04' />
        <path d='M11.28 22.59c2.46-.64 4.91-.63 7.23-.62h1.68c2.71.02 5.3-.1 7.75-1' />
      </g>
      <path
        stroke={isDisabled ? 'var(--porcelain)' : 'var(--waterloo)'}
        d='M20.73 42.37c6.58.2 12.64-3.24 16.57-10.02 4.92-8.56 3.52-19.54-3.27-26.1-.85-.82-1.76-1.51-2.77-2.13C20.94-2.04 8.55 2.7 3.88 10.78c-6.5 11.3-1.74 23.5 6.32 28.31a22.16 22.16 0 0010.53 3.28z'
      />
    </g>
  </svg>
)
