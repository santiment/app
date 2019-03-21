import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => (
  <div className='sanbase-footer'>
    <div className='sanbase-footer__links'>
      <Link to={'/roadmap'}>Roadmap</Link>
      <a href='mailto:info@santiment.net'>Contact</a>
      <Link to={'/privacy-policy'}>Privacy</Link>
      <a href='https://docs.google.com/forms/d/e/1FAIpQLSeFuCxjJjId98u1Bp3qpXCq2A9YAQ02OEdhOgiM9Hr-rMDxhQ/viewform'>
        Request Token
      </a>
    </div>
    <div>|&nbsp;&nbsp;&nbsp;ver. {process.env.REACT_APP_VERSION}</div>
  </div>
)

export default Footer
