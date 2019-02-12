import React from 'react'
import HelpPopup from './../../components/HelpPopup/HelpPopup'
import './../../components/HelpPopup/HelpPopupProjectsContent.css'

const HelpPopupWordCloud = ({ className }) => (
  <HelpPopup className={className}>
    <div className='HelpPopupProjectsContent'>
      <p>
        These words are often used alongside the main keyword on crypto social
        media. Larger words are found more frequently in comments that also
        include the main keyword.
      </p>
    </div>
  </HelpPopup>
)

export default HelpPopupWordCloud
