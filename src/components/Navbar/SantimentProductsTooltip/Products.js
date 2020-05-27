import React from 'react'
import sanbaseLogoImg from '../../../assets/logos/logo-sanbase.svg'
import sheetsLogoImg from '../../../assets/logos/logo-sheets.svg'
import trendsLogoImg from '../../../assets/logos/logo-trends.svg'
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
  },
  {
    img: trendsLogoImg,
    title: 'Santrends',
    description: 'Explore the social volume of any word on crypto social media',
    to: 'https://app.santiment.net/labs/trends/',
    showLink: true
  }
]
