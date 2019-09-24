import img1 from './tc.png'
import img2 from './2slide.jpg'
import img3 from './3slide.png'
import img4 from './4slide.png'
import img5 from './5slide.png'
import img6 from './6slide.png'
import img7 from './7slide.png'
import img8 from './8slide.png'
import preview1 from './Shot.png'
import preview2 from './Shot (1).png'

export const TYPES = {
  VIDEO: 'video',
  INSIGHT: 'insight',
  SLIDES: 'slides',
  TWO_STEPS: 'slides',
  SIGNAL: 'signal',
  ANOMALY: 'signal'
}

export const COLORS = {
  slides: 'jungle-green',
  video: 'heliotrope',
  signal: 'persimmon',
  insight: 'dodger-blue'
}

export const ICONS = {
  slides: 'slides',
  video: 'triangle-right',
  signal: 'ring',
  insight: 'article'
}

export const stories = [
  {
    type: TYPES.SLIDES,
    previewTitle: 'Are we in the ETH accumulation stage? 🕵️',
    previewImage: preview1,
    storyHeaderName: 'Are we in the ETH accumulation stage? 🕵️',
    slides: [
      {
        title: 'Here are 6 metrics that suggest we may be:',
        image: img1,
        description:
          '1. Token Circulation (# of unique ETH being used each day) continues to decline over the past 5 months.',
        buttonText: 'See chart',
        buttonLink: 'https://tinyurl.com/y54xlm89'
      },
      {
        title: 'Here are 6 metrics that suggest we may be:',
        image: img2,
        description:
          "2. Ethereum's maximal mean age (average age that each coin has remained in its current address) continues to rise.",
        buttonText: 'See chart',
        buttonLink: 'http://santiment.net/sangraphs'
      },
      {
        title: 'Here are 6 metrics that suggest we may be:',
        image: img3,
        description:
          '3. # of active coins over a period of 90 days has begun to decline as of recently.',
        buttonText: 'See chart',
        buttonLink: 'https://t.co/rGvvCISdBM?amp=1'
      },
      {
        title: 'Here are 6 metrics that suggest we may be:',
        image: img4,
        description:
          '4. Percent/share of ETH on exchanges has been declining ever since february.',
        buttonText: 'See chart',
        buttonLink: 'http://santiment.net/sangraphs'
      },
      {
        title: 'Here are 6 metrics that suggest we may be:',
        image: img5,
        description:
          '5. Total # of addresses holding 10k+ ETH has been on the rise, adding 1.44 million ETH since early January',
        buttonText: 'See chart',
        buttonLink: 'http://santiment.net/sangraphs'
      },
      {
        title: 'Here are 6 metrics that suggest we may be:',
        image: img6,
        description:
          '6. Amount of retail holders (holding btw 1-10 ETH) has also been growing, adding 75K ETH since start of year.',
        buttonText: 'See chart',
        buttonLink: 'http://santiment.net/sangraphs'
      },
      {
        title: 'Here are 6 metrics that suggest we may be:',
        image: img7,
        description: '7. The ETH Miners balance continues to amass',
        buttonText: 'See chart',
        buttonLink: 'https://t.co/rGvvCISdBM?amp=1'
      },
      {
        title: 'Here are 6 metrics that suggest we may be:',
        image: img8,
        description:
          '8. After a steady decline, the number of daily withdrawals of ETH from exchanges is now back in an uptrend',
        buttonText: 'See chart',
        buttonLink: 'http://santiment.net/sangraphs'
      }
    ]
  },
  {
    type: TYPES.INSIGHT,
    previewTitle: 'How to create a signal',
    previewImage: preview2,
    storyHeaderName: 'Tips & Trics',
    title: 'How to create a signal',
    minutes: 4,
    slides: [
      {
        title: 'How to create a signal',
        video: 'https://www.youtube-nocookie.com/embed/mjImmjeYEVI'
      }
    ]
  },
  {
    type: TYPES.SIGNAL,
    previewTitle: 'How to create a watchlist',
    previewImage: preview2,
    storyHeaderName: 'Tips & Trics',
    title: 'How to create a signal',
    minutes: 4,
    slides: [
      {
        title: 'How to create a signal',
        video: 'https://www.youtube-nocookie.com/embed/mjImmjeYEVI'
      }
    ]
  },
  {
    type: TYPES.VIDEO,
    previewTitle: 'Sonar Introduction',
    previewImage: preview2,
    storyHeaderName: 'Tips & Trics',
    title: 'How to create a signal',
    minutes: 4,
    slides: [
      {
        title: 'How to create a signal',
        video: 'https://www.youtube-nocookie.com/embed/mjImmjeYEVI'
      }
    ]
  }
]

export const getPreviewInfoByType = ({ type, slides, minutes }) => {
  switch (type) {
    case TYPES.INSIGHT:
      return `${minutes} min read`
    case TYPES.VIDEO:
      return `${minutes} min video`
    case TYPES.SIGNAL:
      return `signal suggestion`
    default:
      return `${slides.length} slides`
  }
}
