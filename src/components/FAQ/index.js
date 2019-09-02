import React from 'react'
import styles from './index.module.scss'

const onQuestionClick = ({ currentTarget }) => {
  currentTarget.classList.toggle('opened')
}

const questions = [
  {
    question: 'How can I easily explore the API and all endpoints it offers?',
    answer: (
      <>
        <p className={styles.text}>
          You can try our API through a web explorer! Find out more{' '}
          <a
            href='https://help.santiment.net/santiment-getting-started/sanbase-api/using-the-sanbase-api-explorer'
            rel='noopener noreferrer'
            target='_blank'
          >
            here
          </a>
          .
        </p>
      </>
    )
  },
  {
    question: 'How far back is the data available?',
    answer: (
      <>
        <p className={styles.text}>
          For our on-chain metrics - all the way back. This means all BTC
          metrics are available for as far back as the BTC blockchain existed;
          same goes for Ethereum and other chains that we track at the moment
          and will track in the future.
        </p>
        <p className={styles.text}>
          For our social metrics, it will obviously differ based on the age of a
          particular social channel, but we have more than enough data for most
          machine learning applications.
        </p>
        <p className={styles.text}>
          For our development activity metrics, the data goes back to the first
          git commit/event executed in a project’s public Github repo.
        </p>
        <p className={styles.text}>
          Feel free to ask{' '}
          <a
            href='https://santiment.net/discord'
            rel='noopener noreferrer'
            target='_blank'
          >
            on our Discord
          </a>{' '}
          for more details.
        </p>
      </>
    )
  },
  {
    question: 'What is a ‘slug’ - and where can I find a list of them?',
    answer: (
      <>
        <p className={styles.text}>
          ‘slug’ is a parameter that most API endpoints share; it acts as a
          unique identifier for a project or asset. Check out this query to find
          all available slugs{' '}
          <a
            href='https://api.santiment.net/graphiql?variables=%7B%7D&query=query%7BallProjects%20%7B%0A%20%20slug%0A%7D%7D'
            rel='noopener noreferrer'
            target='_blank'
          >
            here
          </a>
          .
        </p>
      </>
    )
  }
]

export default () => (
  <section className={styles.wrapper}>
    <h2>Frequently asked questions</h2>
    <ul className={styles.questions}>
      {questions.map(({ question, answer }) => (
        <li
          className={styles.question}
          onClick={onQuestionClick}
          key={question}
        >
          <div className={styles.question__top}>
            <h3 className={styles.question__text}>{question}</h3>
            <svg
              width='15'
              height='8'
              viewBox='0 0 15 8'
              className={styles.question__arrow}
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M14.313 0.754539C14.5867 1.06549 14.5564 1.5394 14.2455 1.81304L7.99546 7.31304C7.71218 7.56233 7.2878 7.56233 7.00452 7.31304L0.754519 1.81304C0.443563 1.5394 0.413314 1.06549 0.686955 0.754538C0.960596 0.443582 1.43451 0.413333 1.74546 0.686974L7.49999 5.75096L13.2545 0.686974C13.5655 0.413333 14.0394 0.443583 14.313 0.754539Z'
              />
            </svg>
          </div>
          <div className={styles.question__answer}>{answer}</div>
        </li>
      ))}
    </ul>
  </section>
)
