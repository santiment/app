import sanbaseLogoImg from '../../../assets/logos/logo-sanbase.svg'
import sheetsLogoImg from '../../../assets/logos/logo-sheets.svg'
import neuroLogoImg from '../../../assets/logos/logo-neuro.svg'

import socialTrendsImg from '../../../assets/labs/social_trends.svg'
import historicalBalanceImg from '../../../assets/labs/hist_balance.svg'
import buidlHeroesImg from '../../../assets/labs/buidl_heroes.svg'
import studioImg from '../../../assets/labs/studio.svg'

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
    img: socialTrendsImg,
    title: 'Emerging trends',
    description:
      'Explore the social volume of any word or phrase on crypto social media. Results gathered from 1000+ channels, groups, subreddits and more.',
    to: '/labs/trends',
    showLink: false
  },
  {
    img: historicalBalanceImg,
    title: 'Historical balance',
    description:
      'Look up any Ethereum wallet’s historical and current holdings. Create low-latency signals to track future wallet behavior.',
    to: '/labs/balance',
    showLink: false
  },
  {
    img: buidlHeroesImg,
    title: 'Buidl heroes',
    description:
      'Compare the development activity of all Ethereum, EOS and DeFi projects over time.',
    to: '/labs/buidl-heroes',
    showLink: false
  },
  {
    img: studioImg,
    title: 'Studio',
    description:
      'On-chain, social, development and financial indicators for 900+ crypto assets',
    to: '/',
    showLink: false
  }
]
