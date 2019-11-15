import React from 'react'
import chartImg from './../../assets/stories/platform_features/chart.png'
import mvrvImg from './../../assets/stories/platform_features/mvrv.png'
import mmaImg from './../../assets/stories/platform_features/mma.png'
import distroImg from './../../assets/stories/platform_features/distro.png'
import renTopsImg from './../../assets/stories/platform_features/ren.png'
import btcTacImg from './../../assets/stories/platform_features/btc_ta.png'
import weeklyUpdatesImg from './../../assets/stories/platform_features/weekly.png'

export const stories = [
  {
    type: 'SLIDES',
    previewTitle: 'Platform features',
    storyHeaderName: 'Platform features',
    slides: [
      {
        description: (
          <>
            <div>
              Between{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://app.santiment.net'
              >
                Sanbase
              </a>{' '}
              and{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://graphs.santiment.net'
              >
                Sangraphs
              </a>
              , our platform features over 120 different on-chain, social and
              development indicators - many of them 100% custom-built.
            </div>
            <br />

            <div>But how exactly can you use them?</div>

            <br />

            <div>
              Here’s a selection of Santiment articles highlighting some of our
              metrics and their use cases, and how they can help you better
              understand the crypto market
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
              In this{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://insights.santiment.net/read/btc-long%2Fshort-mvrv-difference-indicates-an-end-of-the-bear-cycle-377'
              >
                introductory piece
              </a>
              , our CTO Valentin Mihov explains the idea behind{' '}
              <b>MVRV Difference</b> - a brand new metric developed at Santiment
              - and why its trend lines may indicate the tail ends of BTC’s bear
              cycles.
            </div>
            <br />
            <div>
              P.S. note the date of the article - when this report was
              published, BTC trailed at around $5800. A week later, it
              skyrocketed to $8000 👀
            </div>
          </>
        )
      },
      {
        image: mmaImg,
        title: 'Maximal Mean Age',
        description: (
          <>
            <div>
              In this{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://insights.santiment.net/read/%F0%9F%93%A2-mean-age-653'
              >
                recent article
              </a>
              , Santiment developer Tzanko Matev breaks down one of our
              newly-developed metrics: <b>Maximal Mean Age</b>, and how it
              enables a radically new way to look at investor behavior.
            </div>

            <br />

            <i>
              ‘Every price top so far was accompanied by a drop in the mean coin
              age and with a significant drop of mean dollar age. ‘
            </i>
          </>
        )
      },
      {
        image: distroImg,
        title: 'Token Holder metrics',
        description: (
          <>
            <div>
              Jan Smirny, Santiment’s data scientist and researcher, dives deep
              into our <b>Token Holder metrics</b>{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                target='_blank'
                href='https://insights.santiment.net/read/token-distribution-ratio%3A-new-performance-indicator-for-crypto%3F-%5Bsantiment-analysis%5D-314'
              >
                in this backtest
              </a>
              , concluding that distributed coins tend to outperform centralized
              coins across the board - and even beat holding ETH:
            </div>

            <br />

            <i>
              ‘While more volatile, our distributed portfolio beats the ETH
              benchmark at almost all points in time.‘
            </i>
          </>
        )
      },
      {
        image: renTopsImg,
        title: 'On-chain and social indicators',
        description: (
          <>
            <div>
              In{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://insights.santiment.net/read/6-ways-you-could-have-caught-ren%E2%80%99s-summer-tops-643'
              >
                this listicle
              </a>
              , Dino Ibisbegovic highlights <b>6 different ways</b> that Sanbase
              metrics and tools could have helped users identify REN’s three
              summer tops.
            </div>

            <br />

            <div>
              Examples include anomalies in several of our on-chain and social
              indicators, as well as a bit of detective work to find and track
              market moving addresses with our{' '}
              <a target='_blank' rel='noopener noreferrer' href='/labs/balance'>
                Historical Balance tool
              </a>{' '}
              🕵️‍♂️
            </div>
          </>
        )
      },
      {
        image: btcTacImg,
        title: 'Token Age Consumed',
        description: (
          <>
            <div>
              And last but not least - a few weeks ago, Santiment founder Maksim
              Balashevich{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://insights.santiment.net/read/btc-%22coin-days-destroyed%22-spiked.-volatility-is-coming.-672'
              >
                warned
              </a>{' '}
              that Bitcoin’s <b>Token Age Consumed chart</b> suggests an intense
              volatility is coming to the market.
            </div>

            <br />

            <div>
              Since then, Bitcoin first dumped more than 6% on October 23rd,
              dropping all the way down to $7500, before ballooning to $9850
              just 3 days after. We’d say that qualifies as ‘intense volatility’
              - wouldn’t you?
            </div>
          </>
        )
      },
      {
        image: weeklyUpdatesImg,
        title: 'Want more insights like this?',
        description: (
          <>
            You can find regular examples and use cases of different Santiment
            metrics by following our daily{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='http://insights.santiment.net'
            >
              Community Insights
            </a>
            , or signing up to{' '}
            <a
              href='https://app.santiment.net/account#notifications'
              target='_blank'
              rel='noopener noreferrer'
            >
              our team’s Weekly Briefs
            </a>
            , where we break down recent market events from an on-chain, social
            and development perspective. It’s the most unique weekly newsletter
            in crypto!
          </>
        )
      }
    ]
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
