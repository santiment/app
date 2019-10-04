import React from 'react'

export const stories = [
  {
    type: 'SLIDES',
    previewTitle: 'Important facts about MakerDAO',
    storyHeaderName: 'Important facts about MakerDAO',
    slides: [
      {
        title: 'The DAI stable coin might not seem 100% “stable”',
        description: (
          <>
            <div>
              It sometimes appears unusually volatile. Yet, it always comes back
              to $1 USD.
            </div>
            <div>
              <b>Learning 1:</b> There is opportunity for arbitrage
            </div>
            <div>
              <b>Learning 2:</b> Stability is different than “absolutely no
              volatility”
            </div>
          </>
        ),
        image:
          'https://api-stage.santiment.net/images/sanbase/Stories/MakerDAO/slides_dai_price.png'
      },
      {
        title: 'The amount of user activity is constantly growing.',
        image:
          'https://api-stage.santiment.net/images/sanbase/Stories/MakerDAO/slides_onchain_volume.png',
        description: `
              The system works increasingly better as more transactions are
              processed. The highest recorded Transaction Volume YTD – on July 16 – was $148 mln USD (more than the whole supply of DAI). Even higher it was shorlty before the market bottomed in the year 2018 - $250 mln USD!
            `
      },
      {
        title: 'There is much to learn about “crowd behaviour”.',
        image:
          'https://api-stage.santiment.net/images/sanbase/Stories/MakerDAO/slides_crowd_behavior.png',
        description: (
          <>
            <div>
              We can already see some repeating patterns in the way ETH is being
              locked, DAI minted, and so on.
            </div>
          </>
        ),
        buttonLink: 'https://graphs.santiment.net/makerdao',
        buttonText: 'See MakerDAO Report'
      },
      {
        image:
          'https://api-stage.santiment.net/images/sanbase/Stories/MakerDAO/slides_crowd_behavior1.png',
        description: (
          <>
            <div>
              These rapidly emerging patterns, combined with other Santiment
              on-chain, social and project metrics, can provide savvy traders
              with unique insights.
            </div>
          </>
        ),
        buttonLink: 'https://graphs.santiment.net/makerdao',
        buttonText: 'See MakerDAO Report'
      }
    ]
  },
  {
    type: 'SLIDES',
    previewTitle: 'How do you measure risk in crypto?',
    storyHeaderName: 'How do you measure risk in crypto?',
    slides: [
      {
        title:
          'We made a template that calculates risk-adjusted returns of any coin. Here’s what we learned:',
        description: `The template calculates a coin’s Sharpe ratio, which analyzes its past returns in the context of risk, or how bumpy the road to its current returns proved to be.`,
        image:
          'https://api-stage.santiment.net/images/sanbase/Stories/Shrape/1.png'
      },
      {
        title: 'What does risk mean?',
        image:
          'https://api-stage.santiment.net/images/sanbase/Stories/Shrape/1.png',
        description: (
          <>
            <div>Risk in Sharpe ratio means general volatility.</div>
            <div>
              In other words: the&nbsp;amount&nbsp;+&nbsp;frequency of the
              coin’s up-&nbsp;and&nbsp;downswings.
            </div>
          </>
        )
      },
      {
        image:
          'https://api-stage.santiment.net/images/sanbase/Stories/Shrape/1.png',
        title: 'A high Sharpe ratio means one of 3 things:',
        description: (
          <>
            <div>1. Risk is low, but returns have been high</div>
            <div>2. Risk is moderate but returns have been even higher</div>
            <div>3. Risk is high, but returns have been sky high</div>
          </>
        )
      },
      {
        image:
          'https://api-stage.santiment.net/images/sanbase/Stories/Shrape/3.png',
        title:
          'YTD, the highest Sharpe ratio of top 10 cryptocurrencies — Binance Coin (2.51). Next is:',
        description: (
          <>
            <div>2. Bitcoin (2.37)</div>
            <div>3. Litecoin (1.49)</div>
            <div>4. Bitcoin Cash (1.26)</div>
            <div>5. Monero (1.17)</div>
          </>
        )
      },
      {
        title: 'Who is the worst?',
        description: (
          <>
            <div>
              The worst Sharpe ratio in the top 10 coins YTD goes
              to&nbsp;XRP,&nbsp;at&nbsp;-0.04.
            </div>
            <div>
              This indicates high volatility and poor returns relative to
              Ripple’s price swings.
            </div>
          </>
        ),
        image:
          'https://api-stage.santiment.net/images/sanbase/Stories/Shrape/4.png'
      },
      {
        image:
          'https://api-stage.santiment.net/images/sanbase/Stories/Shrape/2.png',
        title: 'Top 100 cryptocurrencies by Sharpe Ratio YTD:',
        description: (
          <>
            <div>BNB is still on top</div>
            <div>BTC is at #3</div>
            <div>LTC at #8</div>
            <div>and ETH at #31</div>
          </>
        )
      },
      {
        image:
          'https://api-stage.santiment.net/images/sanbase/Stories/Shrape/5.png',
        description: (
          <div>
            Use{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://tinyurl.com/y66dn8pk'
            >
              our template
            </a>{' '}
            to analyze any coin’s returns adjusted for risk. To change the time
            frame, make a copy of it and download Sansheets — our plugin for
            importing Santiment data into Spreadsheets.
          </div>
        ),
        buttonLink: 'http://sheets.santiment.net',
        buttonText: 'Explore Sansheets'
      }
    ]
  },
  {
    type: 'VIDEO',
    previewTitle: 'Sonar Introduction',
    storyHeaderName: 'Tips & Trics',
    minutes: 5,
    slides: [
      {
        title: 'Sonar Introduction: Tracking the Social Trends',
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
  }
]
