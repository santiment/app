import React from 'react'
import HelpPopup from '../../HelpPopup/HelpPopup'

const InsightEditorBottomPublishHelp = () => (
  <HelpPopup>
    <div>
      Insight could be published only if the following requirements are met:
      <ul>
        <li>title contains more than 5 characters;</li>
        <li>text contains more than 5 characters;</li>
      </ul>
    </div>
  </HelpPopup>
)

export default InsightEditorBottomPublishHelp
