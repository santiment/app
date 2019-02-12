import React from 'react'
import HelpPopup from './../../components/HelpPopup/HelpPopup'
import './../../components/HelpPopup/HelpPopupProjectsContent.css'

const HelpPopupTrends = () => (
  <HelpPopup>
    <div className='HelpPopupProjectsContent'>
      <p>Specify your search results with these modifiers:</p>
      <ul
        style={{
          listStyleType: 'disc',
          marginLeft: '17px'
        }}
        className='HelpPopupProjectsContent__list'
      >
        <li className='HelpPopupProjectsContent__item'>
          <code>btc moon</code> will search for the exact phrase
        </li>
        <li className='HelpPopupProjectsContent__item'>
          <code>btc AND moon</code> will search for comments including both
          ‘btc’ and ‘moon’
        </li>
        <li className='HelpPopupProjectsContent__item'>
          <code>btc OR moon</code> will search for comments including either
          ‘btc’ or ‘moon’
        </li>
        <li className='HelpPopupProjectsContent__item'>
          You can also combine modifiers by using brackets:{' '}
          <pre>
            <code>(btc OR bitcoin) AND moon</code>
          </pre>
        </li>
      </ul>
    </div>
  </HelpPopup>
)

export default HelpPopupTrends
