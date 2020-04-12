import React from 'react'
import cx from 'classnames'
import Panel from '@santiment-network/ui/Panel/Panel'
import Icon from '@santiment-network/ui/Icon'
import styles from '../HelpPopup.module.scss'

const SecondQuestion = ({ isOpen, onClick }) => (
  <Panel padding className={styles.block} onClick={onClick}>
    <div className={styles.header}>
      <h4 className={styles.headingSmall}>How do I use the list?</h4>
      <Icon
        type='arrow-right-big'
        className={cx(styles.arrow, isOpen && styles.openedArrow)}
      />
    </div>
    {isOpen && (
      <div className={styles.content}>
        <p>
          Although it’s still very new, we keep finding new ways that you can
          use our list to{' '}
          <b>keep up with the crypto crowd or inform your trading decisions.</b>
        </p>
        <p>
          <b>
            1. Get a 1-minute overview of the biggest (developing) stories in
            crypto
          </b>
        </p>
        <p>
          There’s a lot of noise on crypto social media daily, and dozens of
          minor or irrelevant stories published on crypto news sites.
        </p>
        <p>
          Our list filters out this noise to only <b>show what sticks</b>, and
          eliminate topics and narratives that didn’t get the crowd’s attention.
          It crowns the ‘social winners’ and weeds out ‘social losers’ so you
          can <b>pinpoint</b> where the community focus lies at any point.
        </p>
        <p>
          Our list also often picks up on important stories that fly{' '}
          <b>under the radar</b> of major crypto publications.
        </p>
        <p>
          For example, when Afri Schoeden, one of Ethereum long-standing devs
          was accused of conflict of interest and denounced by the Ethereum
          community across major crypto subreddits, the story showed up on our
          list <b>days</b> before any news outlet reported on it. If you want to
          discover grassroots crypto narratives before they turn mainstream,
          bookmark our list ASAP.
        </p>
        <p>
          <b>2. Spot local tops and hype peaks</b>
        </p>
        <p>
          In our experience so far, we found that a coin ticker’s appearance on
          the list can be a fairly effective top indicator.
        </p>
        <p>
          If the coin is already in an uptrend, its presence on our Top 10 list
          might signal that a local top is nearing, as the hype around the coin
          reaches its peak.
        </p>
        <p>
          One of many examples is Waves, which topped our list back on December
          19th, 2018, at exactly the time its price hit a 6-month high:
        </p>
        <img
          src='https://api-stage.santiment.net/images/sanbase/TrendsHelpPopup/trends.png'
          alt='Waves in trends page'
          className={styles.img}
        />
        <img
          src='https://api-stage.santiment.net/images/sanbase/TrendsHelpPopup/top.png'
          alt='Waves in project page'
          className={styles.img}
        />
        <p>
          Soon after hitting ‘peak hype’, the price of Waves began trending
          downwards, and has failed to recapture that local top since:
        </p>
        <img
          src='https://api-stage.santiment.net/images/sanbase/TrendsHelpPopup/chart.png'
          alt='Waves in project page'
          className={styles.img}
        />

        <p>
          One of our community members shared how he’s already made our list a
          part of his swing trading strategy:
        </p>
        <p>
          <i>
            “There were strong enough signals about LUN from my scanner to begin
            paying attention to Santiment dashboards on the 18th. On the 21st,
            Sanbase metrics offered a positive RR, so I entered there. Then,{' '}
            <b>late on the 22nd, LUN showed up on the Top 10 list</b>, so I
            started to seek an exit. It arrived late on the 23rd, as the crowd
            really started talking about LUN.”
          </i>
        </p>

        <img
          src='https://api-stage.santiment.net/images/sanbase/TrendsHelpPopup/chart-and-arrows.png'
          alt='Waves in project page'
          className={styles.img}
        />
        <p>
          That said, <b>not every hype peak</b> (during an uptrend) = an
          impending price retraction. For example, the recent increase in
          mentions of RCN on crypto social media correlated to (what turned out
          to be) a first leg of a prolonged rally:
        </p>
        <img
          src='https://api-stage.santiment.net/images/sanbase/TrendsHelpPopup/social.png'
          alt='Waves in project page'
          className={styles.img}
        />
        <img
          src='https://api-stage.santiment.net/images/sanbase/TrendsHelpPopup/trend-explore.png'
          alt='Waves in project page'
          className={styles.img}
        />

        <p>
          This is why it’s always a good idea to combine our list with other
          indicators and do your own research to get a better idea of why the
          crowd has suddenly gained interest in a coin.
        </p>
      </div>
    )}
  </Panel>
)

export default SecondQuestion
