import React from 'react'
import HelpPopup from './../../components/HelpPopup/HelpPopup'
import './../../components/HelpPopup/HelpPopupProjectsContent.css'

const HelpPopupWordCloud = ({ className }) => (
  <HelpPopup className={className}>
    <div className='HelpPopupProjectsContent'>
      <p>
        This is created by displaying other words which are often used in
        combination with your search term; bigger words were mentioned more
        often. The word clouds uses the combined messages of all above data
        sources.
      </p>
    </div>
  </HelpPopup>
)

export default HelpPopupWordCloud
