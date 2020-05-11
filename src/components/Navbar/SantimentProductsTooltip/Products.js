import React from 'react'
import sanbaseLogoImg from '../../../assets/logos/logo-sanbase.svg'
import sheetsLogoImg from '../../../assets/logos/logo-sheets.svg'
import neuroLogoImg from '../../../assets/logos/logo-neuro.svg'

export const MAIN_PRODUCTS = [
  {
    img: sanbaseLogoImg,
    title: 'Sanbase',
    description:
      'Behavior analysis & monitoring platform for 1000+ crypto assets',
    to: 'https://app.santiment.net',
    showLink: true
  },
  {
    img: sheetsLogoImg,
    title: 'Sansheets',
    description: 'Google Spreadsheets plugin for importing Santiment data',
    to: 'https://sheets.santiment.net',
    showLink: true
  },
  {
    img: neuroLogoImg,
    title: 'SanAPI',
    description: 'The most comprehensive crypto API on the market',
    to: 'https://neuro.santiment.net',
    showLink: true
  }
]

export const LABS = [
  {
    Icon: ({ className }) => (
      <svg
        className={className}
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        fill='none'
      >
        <g clipPath='url(#clip0)'>
          <path
            fill='var(--athens)'
            d='M4.2 16.3C3.3 29.8 8.7 41 17.6 42c9 1 0-11 17-17s1.8-18.4-6.3-20.2c-8-1.8-23.2-2-24.1 11.5z'
          />
          <path
            fill='#FFE7CA'
            d='M29 23c-3.2 2-2.5 6 0 8s1.8 5.6 5 6c4 .5-.1-.2 3 5 1.5 2.5 4.5-3.5 4.5-5s1-5.5 0-9-2-2.5-3 1.5-3.5.5-4.5 0 0-4 0-7.5-1-1.5-5 1z'
          />
          <path
            fill='#FFAD4D'
            fillRule='evenodd'
            d='M39.2 24.8c.2 4.2-1.6 7-3 6.3-1-.4-.9-1.8-.9-1.8.4-3 .2-6.1-.7-9a12 12 0 00-3.3-5.2 8.8 8.8 0 00-3-2.1 9 9 0 01-2 6 25.1 25.1 0 01-2.2 3c-2.3 2.5-5.1 5.7-5.1 10.3 0 4.3 2.9 8.3 6.8 10.4a13 13 0 003.5 1.3 5 5 0 01-2-3.3s-.8-2.7 1.2-6.7l1.4-2.4s0 1 1 2.3c.5.9 1.4 1.9 2.9 2.9a4.3 4.3 0 011.9 4.5 4.2 4.2 0 01-2 2.7 12.5 12.5 0 003.6-1.3c3.9-2.1 6.7-6.1 6.7-10.4a13.8 13.8 0 00-5-10.5l-.5-.3.2.6c.3 1 .4 1.9.5 2.7zm2.8 7.5c0-1.5-.4-3-1-4.5 0 .6-.2 1.2-.4 1.7a6.7 6.7 0 01-1.7 2.8c-.8.7-2.2 1.3-3.6.7a3.5 3.5 0 01-1.9-2.5 5 5 0 010-1.3h2-2a21 21 0 00-.7-8.4 10 10 0 00-2.8-4.3A11 11 0 0128 20a27.1 27.1 0 01-2.5 3.2c-2.3 2.6-4.5 5.2-4.5 9a10 10 0 004.2 7.7v-2.1c.3-2 1-4.5 3-7.4a2 2 0 013.7 1v.1l.3.7a7.4 7.4 0 002.6 2.8 6.3 6.3 0 013 5 10 10 0 004.2-7.8z'
            clipRule='evenodd'
          />
          <path
            fill='#FD9317'
            d='M22.1 12.2c-.1 1.4-1.4 2.4-3 4.2a5 5 0 00-1 4.3c6.6-3.1 4-8.5 4-8.5z'
          />
        </g>
        <defs>
          <clipPath id='clip0'>
            <path fill='#fff' d='M0 0h48v48H0z' />
          </clipPath>
        </defs>
      </svg>
    ),
    title: 'Emerging trends',
    description:
      'Explore the social volume of any word or phrase on crypto social media. Results gathered from 1000+ channels, groups, subreddits and more.',
    to: '/labs/trends',
    showLink: false
  },
  {
    Icon: ({ className }) => (
      <svg
        className={className}
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        fill='none'
      >
        <g clipPath='url(#clip0)'>
          <path
            fill='var(--athens)'
            d='M2.5 15c-1 13.5 3 22.5 12 23.5S18.1 34.1 35 28c17-6-1.5-29.5-8.5-22s-23-4.5-24 9z'
          />
          <path
            fill='#D6F6D6'
            d='M24.3 40.3c2.1-1.3-5.4-6-5.2-8.4.3-2 3.5-4.1 6.2-3.4 3.5.8 4.8-4.7 2.2-6.7-3-2.2-3.4 2.3-7.7-.5-6.4-4.2-3 5.5-8.5 8.5s2.5 11.5 5.5 9 5.4 2.8 7.5 1.5z'
          />
          <path
            fill='#26C953'
            fillRule='evenodd'
            d='M29.2 12a7 7 0 012.3-.4l2.3.3c-.2 2-1 4-3 6a1 1 0 01-.7.2h-6.3a1 1 0 01-1-.6l-2.5-5.9a11.4 11.4 0 014-.8c.8 0 1.6.1 2.3.3.7.1 1.5.4 2.2.9h.4zm-3 1l1.7.7-1.7-.7zm1.7.7c.6.4 1.3.4 2 .2a5 5 0 011.5-.3c-.4.9-1 1.7-1.7 2.5h-5.3L23.1 13a8.6 8.6 0 013 .1'
            clipRule='evenodd'
          />
          <path
            fill='#26C953'
            d='M32.7 27.6a1 1 0 10-1.7 1c1.7 3.2 1.5 4.9 1 5.6l-.1.2c-.6.7-1.6 1-2.6 1a1 1 0 100 2c1.4 0 3.4-.4 4.4-2.1l.2-.3c.9-1.7.6-4.1-1.2-7.4z'
          />
          <path
            fill='#26C953'
            fillRule='evenodd'
            d='M30 19.2c.2 0 .4 0 .6.2a29 29 0 017.6 9.7 9 9 0 010 7.5C36.5 40 32 42 26.4 42c-5.3 0-9.9-2-11.5-5.2-1.1-2-1-4.5 0-7.3 1.3-3 4.2-6.4 8.1-10 .2-.3.4-.3.7-.3h6.2zm6.4 10.7a7 7 0 010 5.8c-1.2 2.3-4.9 4.3-10 4.3-5 0-8.6-2-9.8-4.2-.7-1.3-.8-3.1.2-5.5 1-2.6 3.5-5.6 7.3-9.1h5.4c3.6 3.3 5.8 6.1 6.9 8.7z'
            clipRule='evenodd'
          />
        </g>
        <defs>
          <clipPath id='clip0'>
            <path fill='#fff' d='M0 0h48v48H0z' />
          </clipPath>
        </defs>
      </svg>
    ),
    title: 'Historical balance',
    description:
      'Look up any Ethereum wallet’s historical and current holdings. Create low-latency signals to track future wallet behavior.',
    to: '/labs/balance',
    showLink: false
  },
  {
    Icon: ({ className }) => (
      <svg
        className={className}
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        fill='none'
      >
        <defs />
        <g clipPath='url(#clip0)'>
          <path
            fill='var(--athens)'
            d='M4.2 16.3C3.3 29.83 8.67 40.95 17.62 42c8.96 1.05.06-10.92 17-17 16.95-6.08 1.76-18.4-6.31-20.2C20.22 3 5.13 2.78 4.2 16.3z'
          />
          <path
            fill='#DAE0FD'
            d='M37.83 18.82c-3.43.1-3.32-4.7-7.2-4.15-3.86.55-3.08 4.88 4.16 9.13 6.36 3.73-5.81 1.66-7.6 8.15-2.37 8.53 8 11.27 12.26 8.8 4.26-2.47 3.55-5.51 5.5-7.96 4.8-6.04-.7-8.05-.7-10.27 0-2.2-2.14-3.84-6.42-3.7z'
          />
          <path
            fill='#375BE9'
            d='M31.87 7.85a2 2 0 104 0 2 2 0 00-4 0zM41.43 16.68a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z'
          />
          <path
            fill='#5275FF'
            fillRule='evenodd'
            d='M20.18 25.86a7.1 7.1 0 1014.21 0 7.1 7.1 0 00-14.2 0zm7.11 5.1a5.1 5.1 0 110-10.21 5.1 5.1 0 010 10.21z'
            clipRule='evenodd'
          />
          <path
            fill='#5275FF'
            fillRule='evenodd'
            d='M37.5 30.8l.5-1.22a1.4 1.4 0 011.23-.89h.84c.51 0 1-.41 1.07-.92 0 0 .15-.94.15-1.92 0-.97-.15-1.92-.15-1.92-.08-.5-.56-.92-1.07-.92h-.84a1.4 1.4 0 01-1.23-.88l-.5-1.22a1.38 1.38 0 01.24-1.5l.6-.58c.35-.36.39-.99.06-1.38l-2.7-2.71c-.4-.32-1.02-.3-1.39.07l-.59.59a1.4 1.4 0 01-1.5.24l-1.2-.5a1.4 1.4 0 01-.89-1.23v-.84c0-.5-.41-1-.92-1.07 0 0-.95-.15-1.92-.15s-1.92.15-1.92.15c-.5.08-.92.56-.92 1.07v.84c0 .51-.4 1.07-.89 1.23l-1.21.5a1.4 1.4 0 01-1.5-.24l-.58-.6a1.08 1.08 0 00-1.39-.06l-2.7 2.7c-.33.4-.3 1.03.07 1.39l.59.59c.36.36.47 1.03.24 1.5l-.5 1.2a1.4 1.4 0 01-1.23.89h-.84c-.51 0-1 .41-1.07.92 0 0-.15.95-.15 1.92 0 .98.15 1.92.15 1.92.07.5.56.92 1.07.92h.84c.5 0 1.06.4 1.23.89l.5 1.21a1.4 1.4 0 01-.24 1.5l-.6.58c-.36.37-.39.99-.06 1.39l2.7 2.7c.4.33 1.02.3 1.39-.07l.59-.59a1.38 1.38 0 011.49-.24l1.21.5c.49.17.89.72.89 1.24v.83c0 .51.41 1 .92 1.07 0 0 .95.15 1.92.15s1.92-.15 1.92-.15c.5-.07.92-.56.92-1.07v-.83c0-.52.4-1.07.89-1.24l1.2-.5a1.38 1.38 0 011.5.24l.6.6c.35.36.98.39 1.37.06l2.71-2.7c.33-.4.3-1.02-.07-1.39l-.59-.59a1.38 1.38 0 01-.24-1.49zm1.73-5.8h.02a10.56 10.56 0 010 1.68h-.02a3.3 3.3 0 00-1.91.64c-.48.34-.94.86-1.19 1.53l-.46 1.12a3.34 3.34 0 00.56 3.61l-1.2 1.2a3.32 3.32 0 00-1.7-.8 3.32 3.32 0 00-1.91.24l-1.12.47c-.68.24-1.2.7-1.53 1.18a3.3 3.3 0 00-.64 1.92v.01a10.56 10.56 0 01-1.68 0v-.01a3.3 3.3 0 00-.64-1.92 3.32 3.32 0 00-1.53-1.18l-1.12-.46a3.31 3.31 0 00-1.91-.25c-.57.09-1.2.33-1.7.8l-1.2-1.2c.47-.5.71-1.13.8-1.7.1-.57.06-1.26-.24-1.91l-.47-1.12a3.32 3.32 0 00-1.18-1.53 3.3 3.3 0 00-1.91-.64h-.02a10.56 10.56 0 010-1.68h.02a3.3 3.3 0 001.9-.64 3.3 3.3 0 001.2-1.53l.45-1.11c.3-.65.35-1.34.25-1.92a3.28 3.28 0 00-.8-1.7l1.2-1.2c.5.47 1.13.72 1.7.8.58.1 1.26.06 1.91-.24l1.12-.46a3.32 3.32 0 001.53-1.19c.36-.5.64-1.16.64-1.91v-.02a10.56 10.56 0 011.68 0v.02c0 .75.28 1.42.64 1.91.34.48.85.94 1.53 1.19l1.11.46a3.37 3.37 0 003.62-.56l1.2 1.2a3.32 3.32 0 00-.8 1.7c-.1.58-.06 1.27.24 1.92l.46 1.11c.25.68.71 1.2 1.19 1.53.5.36 1.16.64 1.91.64z'
            clipRule='evenodd'
          />
        </g>
        <defs>
          <clipPath id='clip0'>
            <path fill='#fff' d='M0 0h48v48H0z' />
          </clipPath>
        </defs>
      </svg>
    ),
    title: 'Buidl heroes',
    description:
      'Compare the development activity of all Ethereum, EOS and DeFi projects over time.',
    to: '/labs/buidl-heroes',
    showLink: false
  },
  {
    Icon: ({ className }) => (
      <svg
        className={className}
        width='48'
        height='48'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0)'>
          <path
            d='M13.71 5.51c-11.8-1.77-8.12 26.75.13 30.4 8.24 3.65 3.24-7.29 21.22-8.08 18-.8 6.53-19.12-.65-23.23-7.18-4.12-8.9 2.68-20.7.91z'
            fill='var(--athens)'
          />
          <path
            d='M24.39 16c-3.36.11-3.43 4.48-8.8 5.97-5.38 1.5-9.29 5.47-6.85 11.94 2.45 6.46 9.64 8.55 13.8 6.09 4.16-2.46 3.47-5.49 5.37-7.92 4.7-6.01 0-5.42 0-7.62s.67-8.6-3.52-8.46z'
            fill='#F0EEFF'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M35.74 20.83c-1.1-4.37-4.86-7.81-9.74-8.66v8.66h9.74zM24.68 10c7.04.46 12.64 5.58 13.32 12.18a.58.58 0 01-.17.46c-.12.12-.29.2-.47.2H24.64c-.36 0-.64-.28-.64-.6V10.6c0-.17.07-.33.2-.44.13-.11.3-.17.48-.16z'
            fill='#8358FF'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M12.6 31.81a.64.64 0 00-.12.93A14.4 14.4 0 0023.63 38c7.5 0 13.81-5.85 14.37-13.31a.64.64 0 00-.64-.69H24a.63.63 0 00-.37.12l-11.01 7.7zM35.8 26H24.42l-9.38 6.56c2.3 2.2 5.36 3.44 8.6 3.44 5.95 0 11.05-4.3 12.18-10z'
            fill='#8358FF'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M22.58 23.75c.16-.12.25-.3.25-.5V10.61a.62.62 0 00-.2-.46.6.6 0 00-.46-.16A13.74 13.74 0 0010 23.84c0 2.39.61 4.76 1.77 6.85a.6.6 0 00.52.31c.12 0 .24-.04.35-.11l9.94-7.14zm-9.74 4.53a12.19 12.19 0 01-.84-4.44 11.8 11.8 0 018.83-11.58v10.28l-7.99 5.74zm8.57-6.16z'
            fill='#8358FF'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M34 9a1 1 0 011-1h5.06a1 1 0 110 2H35a1 1 0 01-1-1z'
            fill='#8358FF'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M1 22a1 1 0 011-1h3a1 1 0 110 2H2a1 1 0 01-1-1z'
            fill='#8358FF'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M38 36a1 1 0 011-1h5.06a1 1 0 110 2H39a1 1 0 01-1-1z'
            fill='#8358FF'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M38 39a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1z'
            fill='#8358FF'
          />
        </g>
        <defs>
          <clipPath id='clip0'>
            <path fill='#fff' d='M0 0h48v48H0z' />
          </clipPath>
        </defs>
      </svg>
    ),
    title: 'Studio',
    description:
      'On-chain, social, development and financial indicators for 900+ crypto assets',
    to: '/',
    showLink: false
  }
]
