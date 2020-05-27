import React from 'react'
import chartImg from './../../assets/stories/platform_features/chart.png'
import mvrvImg from './../../assets/stories/platform_features/mvrv.png'
import mmaImg from './../../assets/stories/platform_features/mma.png'
import distroImg from './../../assets/stories/platform_features/distro.png'
import renTopsImg from './../../assets/stories/platform_features/ren.png'
import btcTacImg from './../../assets/stories/platform_features/btc_ta.png'
import email1 from './../../assets/stories/weekly_breif/image1.png'
import email2 from './../../assets/stories/weekly_breif/image2.png'
import email3 from './../../assets/stories/weekly_breif/image3.png'
import weeklySetting from './../../assets/stories/weekly_breif/image4.png'
import weeklyUpdatesImg from './../../assets/stories/platform_features/weekly.png'

export const stories = [
  {
    type: 'SLIDES',
    previewTitle: "Subscribe to Santiment's Weekly Market Briefs!",
    storyHeaderName: "Subscribe to Santiment's Weekly Market Briefs!",
    slides: [
      {
        image: email1,
        title: 'Want to know what hard data reveals about the crypto market?',
        description:
          'We give the answers in our new Santiment Weekly Briefs - available only to Sanbase users!'
      },
      {
        image: email2,
        description:
          'Each week, the Santiment team shares the most interesting market findings and analyses, using a combination of reliable on-chain, social and development data'
      },
      {
        image: email3,
        description:
          'The Weekly Brief is for anyone that wants to truly understand market behavior, and how Santiment tools can make you a better trader or an informed crypto participant'
      },
      {
        image: weeklySetting,
        description:
          'Sign up to our Weekly Briefs in your Sanbase account settings by navigating to ‘Digest’ and selecting ‘Weekly’. See you in your inbox!',
        buttonLink: 'https://app.santiment.net/account#notifications',
        buttonText: 'Turn on "Weekly Brief"'
      }
    ],
    createdAt: '2020-01-19T00:00:00Z'
  },
  {
    type: 'SLIDES',
    previewTitle: 'Platform features',
    storyHeaderName: 'Platform features',
    isTutorial: true,
    slides: [
      {
        description: (
          <>
            <div>
              Santiment has over 120 different on-chain, social and development
              indicators - many of them 100% custom-built. But how exactly can
              you use them?
            </div>
            <br />
            <div>
              Check out these use case articles, directly from the Santiment
              team.
            </div>
          </>
        ),
        image: chartImg
      },
      {
        image: mvrvImg,
        title: 'MVRV Difference',
        description: (
          <>
            <div>
              Santiment CTO Valentin Mihov{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://insights.santiment.net/read/btc-long%2Fshort-mvrv-difference-indicates-an-end-of-the-bear-cycle-377'
              >
                {' '}
                explained
              </a>{' '}
              how our <b>MVRV Difference</b> metric may indicate an end of BTC’s
              bear cycles.
            </div>
            <br />
            <i>
              P.S. note the date - when this article was published, BTC trailed
              at ~$5800. 1 week later, it skyrocketed to $8000
              <span role='img' aria-label='looking'>
                👀
              </span>
            </i>
          </>
        )
      },
      {
        image: mmaImg,
        title: 'Maximal Mean Age and HODLer behavior',
        description: (
          <>
            Santiment developer Tzanko Matev{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://insights.santiment.net/read/%F0%9F%93%A2-mean-age-653'
            >
              broke down
            </a>{' '}
            one of our newly-developed metrics: <b>Maximal Mean Age</b> and what
            it tells us about HODLer behavior.
          </>
        )
      },
      {
        image: distroImg,
        title: 'Token Holder metrics',
        description: (
          <>
            Santiment data scientist Jan Smirny{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://insights.santiment.net/read/token-distribution-ratio%3A-new-performance-indicator-for-crypto%3F-%5Bsantiment-analysis%5D-314'
            >
              backtested
            </a>{' '}
            our <b>Token Holder metrics</b> and found that distributed coins
            tend to outperform centralized coins - and HODLers - across the
            board.
          </>
        )
      },
      {
        image: renTopsImg,
        title: 'On-chain and social indicators',
        isDarkImage: true,
        description: (
          <>
            Dino Ibisbegovic{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://insights.santiment.net/read/6-ways-you-could-have-caught-ren%E2%80%99s-summer-tops-643'
            >
              wrote about
            </a>{' '}
            <b>6 ways</b> that Sanbase metrics and tools could have helped you
            identify REN’s summer tops, including anomalies in on-chain and
            social, and a bit of detective work to identify REN’s market makers
            🕵️‍
            <span role='img' aria-label='looking'>
              ♂️
            </span>
          </>
        )
      },
      {
        image: btcTacImg,
        title: 'Token Age Consumed',
        description: (
          <>
            <div>
              A few weeks ago, Maksim Balashevich{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://insights.santiment.net/read/btc-%22coin-days-destroyed%22-spiked.-volatility-is-coming.-672'
              >
                warned
              </a>{' '}
              that Bitcoin’s Token Age Consumed chart suggests intense
              volatility is coming.
            </div>

            <br />

            <i>
              Since then, BTC dumped more than 6% to $7500 on October 23rd,
              before ballooning to $9850 just 3 days after.
            </i>
          </>
        )
      },
      {
        image: weeklyUpdatesImg,
        title: 'Want more insights like this?',
        description: (
          <>
            You can find regular use cases for Santiment metrics on our daily{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='http://insights.santiment.net'
            >
              Community Insights
            </a>
            , or signing up to our team’s Weekly Briefs, where we break down
            recent market events with our data!
          </>
        ),
        buttonLink: 'http://insights.santiment.net',
        buttonText: 'Community UnAuth'
      }
    ],
    createdAt: '2020-01-19T00:00:00Z'
  },
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
    ],
    createdAt: '2020-01-19T00:00:00Z'
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
    ],
    createdAt: '2020-01-19T00:00:00Z'
  },
  {
    type: 'VIDEO',
    previewTitle: 'Sonar Introduction',
    storyHeaderName: 'Tips & Trics',
    isTutorial: true,
    minutes: 5,
    slides: [
      {
        title: 'Sonar Introduction: Tracking the Social Trends',
        description:
          'Setup push or Telegram notifications to trigger any time an asset starts trending on social media via our Santrends Tool to potentially spot local tops!',
        videoId: 'AsZRjm9x5HI'
      }
    ],
    createdAt: '2020-01-19T00:00:00Z'
  },
  {
    type: 'VIDEO',
    previewTitle: 'How to create a signal',
    storyHeaderName: 'Tips & Trics',
    isTutorial: true,
    minutes: 2,
    slides: [
      {
        title: 'How to create a signal',
        isDarkImage: true,
        description:
          'Recieve alerts via push or Telegram notification any time an asset crosses a price threshold, there is a significant change to the number of addresses transacting on-chain, and more!',
        videoId: 'mjImmjeYEVI'
      }
    ],
    createdAt: '2020-01-19T00:00:00Z'
  },
  {
    type: 'VIDEO',
    previewTitle: 'How to create a watchlist',
    storyHeaderName: 'Tips & Trics',
    minutes: 3,
    isTutorial: true,
    slides: [
      {
        title: 'How to create a watchlist',
        isDarkImage: true,
        description:
          "Populate a private or public watchlist with assets you'd like to track to see their price/volume action, development activity, on-chain addresses, and several other features!",
        videoId: 'yzo1gxoTFsk'
      }
    ],
    createdAt: '2020-01-19T00:00:00Z'
  }
]
