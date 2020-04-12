import React, { useState } from 'react'
import FirstQuestion from './Questions/FirstQuestion'
import SecondQuestion from './Questions/SecondQuestion'
import ThirdQuestion from './Questions/ThirdQuestion'
import styles from './HelpPopup.module.scss'

const QUESTIONS = [1, 2, 3]

const HelpPopupContent = () => {
  const [openedQuestion, changeOpenedQuestion] = useState(null)
  const toggleQuestions = questionNumber => {
    if (questionNumber === openedQuestion) changeOpenedQuestion(null)
    else changeOpenedQuestion(questionNumber)
  }
  return (
    <div className={styles.wrapper}>
      <p>
        Every hour, we calculate the top 10 words with the highest spike in
        mentions on crypto social media, compared to their previous 2-week
        average.
      </p>
      <p>This list aims to do 2 things: </p>
      <ol>
        <li>
          Give you a quick overview of the top <b>developing topics</b> in
          crypto at the moment
        </li>
        <li>
          Help you spot <b>hype peaks</b> and <b>local tops</b>
        </li>
      </ol>
      <p>Find out more about how it works and how to use it below:</p>
      <FirstQuestion
        isOpen={openedQuestion === QUESTIONS[0]}
        onClick={() => toggleQuestions(QUESTIONS[0])}
      />
      <SecondQuestion
        isOpen={openedQuestion === QUESTIONS[1]}
        onClick={() => toggleQuestions(QUESTIONS[1])}
      />
      <ThirdQuestion
        isOpen={openedQuestion === QUESTIONS[2]}
        onClick={() => toggleQuestions(QUESTIONS[2])}
      />
    </div>
  )
}

export default HelpPopupContent
