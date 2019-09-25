import img1 from './images/1slide.png'
import img2 from './images/2slide.png'
import img3 from './images/3slide.png'
import img4 from './images/4slide.png'
import img5 from './images/5slide.png'
import img6 from './images/6slide.png'
import img7 from './images/7slide.png'
import img8 from './images/8slide.png'

export const stories = [
  {
    type: 'VIDEO',
    previewTitle: 'Sonar Introduction',
    storyHeaderName: 'Tips & Trics',
    minutes: 5,
    slides: [
      {
        title: 'Sonar Introduction',
        description:
          'Setup push or Telegram notifications to trigger any time an asset starts trending on social media via our Emerging Trends Tool to potentially spot local tops!',
        videoId: 'AsZRjm9x5HI'
      }
    ]
  },
  {
    type: 'VIDEO',
    previewTitle: 'How to create a signal',
    storyHeaderName: 'Tips & Trics',
    minutes: 2,
    slides: [
      {
        title: 'How to create a signal',
        isDarkImage: true,
        description:
          'Recieve alerts via push or Telegram notification any time an asset crosses a price threshold, there is a significant change to the number of addresses transacting on-chain, and more!',
        videoId: 'mjImmjeYEVI'
      }
    ]
  },
  {
    type: 'VIDEO',
    previewTitle: 'How to create a watchlist',
    storyHeaderName: 'Tips & Trics',
    minutes: 3,
    slides: [
      {
        title: 'How to create a watchlist',
        isDarkImage: true,
        description:
          "Populate a private or public watchlist with assets you'd like to track to see their price/volume action, development activity, on-chain addresses, and several other features!",
        videoId: 'yzo1gxoTFsk'
      }
    ]
  },
  {
    type: 'SLIDES',
    previewTitle: 'Are we in the ETH accumulation stage? 🕵️',
    storyHeaderName: 'Are we in the ETH accumulation stage? 🕵️',
    slides: [
      {
        title: 'Here are 6 metrics that suggest we may be:',
        image: img1,
        isDarkImage: true,
        description:
          '1. Token Circulation (# of unique ETH being used each day) continues to decline over the past 5 months.',
        buttonText: 'See chart',
        buttonLink: 'https://tinyurl.com/y54xlm89'
      },
      {
        title: 'Here are 6 metrics that suggest we may be:',
        image: img2,
        isDarkImage: true,
        description:
          "2. Ethereum's maximal mean age (average age that each coin has remained in its current address) continues to rise.",
        buttonText: 'See chart',
        buttonLink: 'http://santiment.net/sangraphs'
      },
      {
        title: 'Here are 6 metrics that suggest we may be:',
        image: img3,
        isDarkImage: true,
        description:
          '3. # of active coins over a period of 90 days has begun to decline as of recently.',
        buttonText: 'See chart',
        buttonLink: 'https://t.co/rGvvCISdBM?amp=1'
      },
      {
        title: 'Here are 6 metrics that suggest we may be:',
        image: img4,
        isDarkImage: true,
        description:
          '4. Percent/share of ETH on exchanges has been declining ever since february.',
        buttonText: 'See chart',
        buttonLink: 'http://santiment.net/sangraphs'
      },
      {
        title: 'Here are 6 metrics that suggest we may be:',
        image: img5,
        isDarkImage: true,
        description:
          '5. Total # of addresses holding 10k+ ETH has been on the rise, adding 1.44 million ETH since early January',
        buttonText: 'See chart',
        buttonLink: 'http://santiment.net/sangraphs'
      },
      {
        title: 'Here are 6 metrics that suggest we may be:',
        image: img6,
        isDarkImage: true,
        description:
          '6. Amount of retail holders (holding btw 1-10 ETH) has also been growing, adding 75K ETH since start of year.',
        buttonText: 'See chart',
        buttonLink: 'http://santiment.net/sangraphs'
      },
      {
        title: 'Here are 6 metrics that suggest we may be:',
        image: img7,
        isDarkImage: true,
        description: '7. The ETH Miners balance continues to amass',
        buttonText: 'See chart',
        buttonLink: 'https://t.co/rGvvCISdBM?amp=1'
      },
      {
        title: 'Here are 6 metrics that suggest we may be:',
        image: img8,
        isDarkImage: true,
        description:
          '8. After a steady decline, the number of daily withdrawals of ETH from exchanges is now back in an uptrend',
        buttonText: 'See chart',
        buttonLink: 'http://santiment.net/sangraphs'
      }
    ]
  }
]
