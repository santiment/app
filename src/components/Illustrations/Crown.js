import React from 'react'

const Icon = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    className={className}
    fill='none'
  >
    <rect width='24' height='24' fill='var(--texas-rose-light)' rx='12' />
    <path
      fill='var(--texas-rose)'
      d='M16.5 9.41c0-.51-.6-.77-.96-.4l-1.29 1.33-1.85-1.92a.55.55 0 00-.8 0l-1.85 1.92L8.46 9c-.35-.36-.96-.1-.96.42v5c0 .32.25.58.56.58h7.88c.3 0 .56-.26.56-.58v-5z'
    />
  </svg>
)

export default Icon
