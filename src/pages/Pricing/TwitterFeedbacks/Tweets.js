import React from 'react'
import cx from 'classnames'
import styles from './TwitterFeedbacks.module.scss'

export const TweetsParsed = [
  <blockquote className='twitter-tweet' data-conversation='none'>
    <p lang='en' dir='ltr'>
      That is some fantastic data.
    </p>
    &mdash; Menno Pietersen (@MennoPP){' '}
    <a href='https://twitter.com/MennoPP/status/1326784275539255298?ref_src=twsrc%5Etfw'>
      November 12, 2020
    </a>
  </blockquote>,
  <blockquote className='twitter-tweet' data-conversation='none'>
    <p lang='en' dir='ltr'>
      Great stuff
    </p>
    &mdash; Artemio (@bitcryptid){' '}
    <a href='https://twitter.com/bitcryptid/status/1323579037667725319?ref_src=twsrc%5Etfw'>
      November 3, 2020
    </a>
  </blockquote>,
  <blockquote className='twitter-tweet' data-conversation='none'>
    <p lang='en' dir='ltr'>
      Great insight
      <span role='img' aria-label='eyes'>
        👀
      </span>
    </p>
    &mdash; CRYPTO₿IRB (@crypto_birb){' '}
    <a href='https://twitter.com/crypto_birb/status/1322545215576690697?ref_src=twsrc%5Etfw'>
      October 31, 2020
    </a>
  </blockquote>,
  <blockquote className='twitter-tweet' data-conversation='none'>
    <p lang='en' dir='ltr'>
      great content as always
    </p>
    &mdash; perps (@btcperps){' '}
    <a href='https://twitter.com/btcperps/status/1320914030265921536?ref_src=twsrc%5Etfw'>
      October 27, 2020
    </a>
  </blockquote>,
  <blockquote className='twitter-tweet' data-conversation='none'>
    <p lang='en' dir='ltr'>
      amazing ! keeep up the{' '}
      <span aria-label='fire' role='img'>
        🔥🔥🔥
      </span>
      post
    </p>
    &mdash; Ortier Capital (@ortiercapital){' '}
    <a href='https://twitter.com/ortiercapital/status/1320905514931412998?ref_src=twsrc%5Etfw'>
      October 27, 2020
    </a>
  </blockquote>,
  <blockquote className='twitter-tweet' data-conversation='none'>
    <p lang='en' dir='ltr'>
      Great analysis; thank you for the info!
    </p>
    &mdash; Darius Dale (@HedgeyeDDale){' '}
    <a href='https://twitter.com/HedgeyeDDale/status/1329189430335328261?ref_src=twsrc%5Etfw'>
      November 18, 2020
    </a>
  </blockquote>,
  <blockquote className='twitter-tweet' data-conversation='none'>
    <p lang='en' dir='ltr'>
      great work!
    </p>
    &mdash; Dr. Julian Hosp (DFI = DeFi on Bitcoin!) (@julianhosp){' '}
    <a href='https://twitter.com/julianhosp/status/1326767360733286405?ref_src=twsrc%5Etfw'>
      November 12, 2020
    </a>
  </blockquote>,

  <blockquote className='twitter-tweet' data-conversation='none'>
    <p lang='en' dir='ltr'>
      Great analysis. I like it as you bring facts on the table rather than as
      all the others on this platform shouting 100k continually. Thanks you!
    </p>
    &mdash; alexei Slivinschi (@ASlivinschi){' '}
    <a href='https://twitter.com/ASlivinschi/status/1329226946656530436?ref_src=twsrc%5Etfw'>
      November 19, 2020
    </a>
  </blockquote>,
  <blockquote className='twitter-tweet' data-conversation='none'>
    <p lang='en' dir='ltr'>
      Love this kinds data now if you could make an indicator that showed it all
      aggregated in a simple form that would be super cool
    </p>
    &mdash; Joel - Coach K (@Coachkcrypto){' '}
    <a href='https://twitter.com/Coachkcrypto/status/1325316475117207552?ref_src=twsrc%5Etfw'>
      November 8, 2020
    </a>
  </blockquote>,

  <blockquote className='twitter-tweet'>
    <p lang='en' dir='ltr'>
      Great insights.
      <br />
      <br />
      Social chat is heating up for bitcoin
    </p>
    &mdash; Ameer Rosic (@AmeerRosic){' '}
    <a href='https://twitter.com/AmeerRosic/status/1328852470559338499?ref_src=twsrc%5Etfw'>
      November 18, 2020
    </a>
  </blockquote>,
  <blockquote className='twitter-tweet'>
    <p lang='en' dir='ltr'>
      I love these charts man!
      <a href='https://twitter.com/hashtag/btc?src=hash&amp;ref_src=twsrc%5Etfw'>
        #btc
      </a>{' '}
      <a href='https://twitter.com/hashtag/bitcoin?src=hash&amp;ref_src=twsrc%5Etfw'>
        #bitcoin
      </a>{' '}
      <a href='https://twitter.com/hashtag/crypto?src=hash&amp;ref_src=twsrc%5Etfw'>
        #crypto
      </a>{' '}
      <a href='https://t.co/M31sVoFOMA'>https://t.co/M31sVoFOMA</a>
    </p>
    &mdash; CryptoNacci (@XCryptonacciX){' '}
    <a href='https://twitter.com/XCryptonacciX/status/1327735651895304192?ref_src=twsrc%5Etfw'>
      November 14, 2020
    </a>
  </blockquote>
]

export const TweetCard = ({ item }) => (
  <div className={cx('twitter-embed', styles.twitterEmbed)}>{item}</div>
)
