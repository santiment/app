import React from 'react'

export const TYPES = {
  VIDEO: {
    color: 'heliotrope',
    icon: 'article',
    previewInfo: ({ slides, minutes }) => `${minutes} min video`
  },
  INSIGHT: {
    color: 'dodger-blue',
    icon: 'triangle-right',
    previewInfo: ({ slides, minutes }) => `${minutes} min read`
  },
  SLIDES: {
    color: 'jungle-green',
    icon: 'slides',
    previewInfo: ({ slides }) => `${slides.length} slides`
  },
  SIGNAL: {
    color: 'persimmon',
    icon: 'ring',
    previewInfo: () => `signal suggestion`
  }
}

export const ICONS = {
  'triangle-right': (
    <svg
      width='5'
      height='6'
      viewBox='0 0 5 6'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.77412 2.57677L0.592929 0.135714C0.466487 0.0605154 0.315492 0.0677459 0.19396 0.154513C0.0724283 0.239835 0 0.393124 0 0.557982V5.44444C0 5.60785 0.0724283 5.76114 0.19396 5.84646C0.26025 5.89418 0.333906 5.91732 0.408789 5.91732C0.472624 5.91732 0.535232 5.89996 0.592929 5.8667L4.77535 3.42275C4.91284 3.34322 5 3.17981 5 3.00049C5 2.82117 4.91161 2.65775 4.77412 2.57677Z'
        fill='white'
      />
    </svg>
  ),
  slides: (
    <svg
      width='10'
      height='6'
      viewBox='0 0 10 6'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.21074 5.38017L0.343078 3.51251C0.06012 3.22956 0.06012 2.77044 0.343078 2.48749L2.21074 0.619827C2.46665 0.363917 2.90495 0.544927 2.90495 0.907639V5.09236C2.90495 5.45507 2.46665 5.63608 2.21074 5.38017ZM4.98552 3.69352C4.6027 3.69352 4.292 3.38283 4.292 3C4.292 2.61718 4.6027 2.30648 4.98552 2.30648C5.36835 2.30648 5.67905 2.61718 5.67905 3C5.67905 3.38283 5.36835 3.69352 4.98552 3.69352ZM7.06609 5.09236V0.907639C7.06609 0.54562 7.5044 0.363917 7.76031 0.619827L9.62797 2.48749C9.91093 2.77044 9.91093 3.22956 9.62797 3.51251L7.76031 5.38017C7.5044 5.63608 7.06609 5.45507 7.06609 5.09236Z'
        fill='white'
      />
    </svg>
  ),
  article: (
    <svg
      width='8'
      height='8'
      viewBox='0 0 8 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect y='0.25' width='6' height='1.5' rx='0.75' fill='white' />
      <rect y='3.25' width='8' height='1.5' rx='0.75' fill='white' />
      <rect y='6.25' width='4' height='1.5' rx='0.75' fill='white' />
    </svg>
  ),
  ring: (
    <svg
      width='8'
      height='8'
      viewBox='0 0 8 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='4' cy='4' r='2.75' stroke='white' strokeWidth='1.5' />
    </svg>
  )
}
