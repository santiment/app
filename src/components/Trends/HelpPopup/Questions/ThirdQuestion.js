import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Panel from '@santiment-network/ui/Panel/Panel'
import Icon from '@santiment-network/ui/Icon'
import styles from '../HelpPopup.module.scss'

const ThirdQuestion = ({ isOpen, onClick }) => (
  <Panel padding className={styles.block} onClick={onClick}>
    <div className={styles.header}>
      <h4 className={styles.headingSmall}>What do all the columns mean?</h4>
      <Icon
        type='arrow-right-big'
        className={cx(styles.arrow, isOpen && styles.openedArrow)}
      />
    </div>
    {isOpen && (
      <div className={styles.content}>
        <p>
          Other than the actual words, our list has 5 columns that help bring
          more context to the results:
        </p>
        <div className={styles.blockItem}>
          <p>
            <b>Hype Score</b> - this is the main criteria for ranking the words
            on our list. The Hype Score is based on a sophisticated formula
            (developed by Santiment) that analyzes all social media messages,
            and then - using a dozen parameters - ranks the words by the{' '}
            <b>likelihood of sustained chatter.</b>
          </p>
          <p>
            The bigger the Hype Score, the more likely it is that a particular
            word/topic will continue to be discussed in the near future, whereas
            a lower Hype Score means that although a word/topic is very popular
            in crypto at the moment, it’s already slowly losing the crowd’s
            attention.
          </p>
          <p>
            While Social Volume shows the absolute number of social mentions for
            each word, the Hype Score is much more complex and actually tries to
            predict which of the top 10 words are more likely to continue to be
            talked about on crypto social media, and which are starting to
            fizzle out.
          </p>
        </div>
        <div className={styles.blockItem}>
          <b>Social Volume</b> - shows the total amount of mentions of a
          word/topic on crypto social media today. The (green or red) number
          next to it shows how many (more or less) social media mentions the
          word has had today compared to yesterday.
        </div>
        <div className={styles.blockItem}>
          <Icon type='connection-big' className={styles.icon} /> - shows if some
          words on our list are related, i.e. trending for the same reason.
          Hovering over the Link icon will highlight all the related words on
          the list.
          <p>
            The words are linked together whenever someone writes a Community
            Insight about them. Anyone can do it - here’s how:
          </p>
          <ol>
            <li>
              On the main{' '}
              <Link to={'/labs/trends'} className={styles.link}>
                Trends
              </Link>{' '}
              page, tick the words on the list that you believe are trending for
              the same reason
            </li>
            <li>
              Once you’ve selected the related words, click “+ Add Insight”
              found right below the list.
            </li>
            <li>
              Write an Insight explaining why those words are trending together
            </li>
            <li>
              Once you publish your insight, those words will be publicly
              interlinked on our list, and hovering over the Link symbol will
              highlight the related words for everyone
            </li>
          </ol>
        </div>
        <div className={styles.blockItem}>
          <p>
            <Icon className={styles.icon} type='insight' /> - shows if there are
            any Community Insights written about a particular trending word.
          </p>
          <p>
            Whenever someone selects one or more words on the list and writes an
            Insight about them (see above), the Paper icon will display a number
            in the top right corner. That number indicates how many Insights
            have been written in connection to that term.
          </p>
        </div>
        <div className={styles.blockItem}>
          <p>
            <Icon className={styles.icon} type='cloud-big' /> - clicking the
            Cloud icon opens the social Word Cloud for a selected word, which
            gives you additional information about why it’s trending.
          </p>
          <p>
            The cloud highlights terms that are often used alongside the
            selected word on crypto social media (in the past 3 days). Larger
            terms in the cloud are found more frequently in connection to the
            selected word.
          </p>
        </div>
      </div>
    )}
  </Panel>
)

export default ThirdQuestion
