import React from 'react'
import sanr from './icons/sanr.svg'
import sanapi from './icons/sanapi.svg'
import sanbase from './icons/sanbase.svg'
import insights from './icons/insights.svg'
import sansheets from './icons/sansheets.svg'

export const BUSINESS_PRODUCTS = [
  {
    img: sanbase,
    title: 'Sanbase',
    isSelected: true,
    description: 'Behavior analysis & monitoring platform for 1500+ crypto assets',
    to: 'https://app.santiment.net',
  },
  {
    img: sansheets,
    title: 'Sansheets',
    description: 'Google Spreadsheets plugin for importing Santiment data',
    to: 'https://sheets.santiment.net',
  },
  {
    img: sanapi,
    title: 'SanAPI',
    description: 'The most comprehensive crypto API on the market',
    to: 'https://api.santiment.net',
  },
]

export const CHAIN_PRODUCTS = [
  {
    title: 'SanX',
    description: 'Actively traded index based on crypto-native metrics',
    to: 'https://sanx.santiment.net/',
  },
  {
    img: sanr,
    title: 'SanR',
    description: 'Decentralized marketplace for crypto price signals',
    to: 'https://sanr.app',
  },
  {
    img: insights,
    title: 'Insights',
    description: 'Market analysis from the San team and community members',
    label: 'SAN chain support soon',
    to: 'https://insights.santiment.net',
  },
]

export const ArrowRight = () => (
  <svg width='14' height='9' viewBox='0 0 14 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M9.12324 0.170741C8.94139 0.378553 8.96244 0.694435 9.17025 0.876284L12.7413 4.0012L9.17025 7.12613C8.96244 7.30797 8.94139 7.62386 9.12324 7.83167C9.30509 8.03948 9.62097 8.06053 9.82878 7.87868L13.8299 4.37748C13.9384 4.28254 14.0006 4.14538 14.0006 4.0012C14.0006 3.85703 13.9384 3.71987 13.8299 3.62493L9.82878 0.12373C9.62097 -0.0581183 9.30509 -0.0370707 9.12324 0.170741Z'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M-4.17087e-09 4C-1.86736e-09 3.72386 0.223858 3.5 0.5 3.5L12.4959 3.5C12.7721 3.5 12.9959 3.72386 12.9959 4C12.9959 4.27614 12.7721 4.5 12.4959 4.5L0.5 4.5C0.223858 4.5 -6.47437e-09 4.27614 -4.17087e-09 4Z'
    />
  </svg>
)
