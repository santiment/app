import React from 'react'
import Dialog from '../../components/banners/feature/PopupBanner'

const LoginCTA = ({ isLoginCTAOpened, setIsLoginCTAOpened }) => (
  <Dialog open={isLoginCTAOpened} onClose={() => setIsLoginCTAOpened(false)} noContainer />
)

export default LoginCTA
