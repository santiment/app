import React, { useState } from 'react';
import FirstQuestion from './Questions/FirstQuestion';
import SecondQuestion from './Questions/SecondQuestion';
import ThirdQuestion from './Questions/ThirdQuestion';
import styles from './HelpPopup.module.css';
const QUESTIONS = [1, 2, 3];

const HelpPopupContent = () => {
  const [openedQuestion, changeOpenedQuestion] = useState(null);

  const toggleQuestions = questionNumber => {
    if (questionNumber === openedQuestion) changeOpenedQuestion(null);else changeOpenedQuestion(questionNumber);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("p", null, "Every hour, we calculate the top 10 words with the highest spike in mentions on crypto social media, compared to their previous 2-week average."), /*#__PURE__*/React.createElement("p", null, "This list aims to do 2 things: "), /*#__PURE__*/React.createElement("ol", null, /*#__PURE__*/React.createElement("li", null, "Give you a quick overview of the top ", /*#__PURE__*/React.createElement("b", null, "developing topics"), " in crypto at the moment"), /*#__PURE__*/React.createElement("li", null, "Help you spot ", /*#__PURE__*/React.createElement("b", null, "hype peaks"), " and ", /*#__PURE__*/React.createElement("b", null, "local tops"))), /*#__PURE__*/React.createElement("p", null, "Find out more about how it works and how to use it below:"), /*#__PURE__*/React.createElement(FirstQuestion, {
    isOpen: openedQuestion === QUESTIONS[0],
    onClick: () => toggleQuestions(QUESTIONS[0])
  }), /*#__PURE__*/React.createElement(SecondQuestion, {
    isOpen: openedQuestion === QUESTIONS[1],
    onClick: () => toggleQuestions(QUESTIONS[1])
  }), /*#__PURE__*/React.createElement(ThirdQuestion, {
    isOpen: openedQuestion === QUESTIONS[2],
    onClick: () => toggleQuestions(QUESTIONS[2])
  }));
};

export default HelpPopupContent;