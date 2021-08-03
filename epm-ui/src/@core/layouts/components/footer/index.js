// ** Icons Import
import { Heart } from 'react-feather'

// ** Configs
import themeConfig from '@configs/themeConfig'

const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-left d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '}
        {/*TODO remove the navlinks of pixinvent */}
        <a href='https://1.envato.market/pixinvent_portfolio' target='_blank' rel='noopener noreferrer'>
          {themeConfig.app.appName}
        </a>
        <span className='d-none d-sm-inline-block'>, All rights Reserved</span>
      </span>
      <span className='float-md-right d-none d-md-block'>
        Hand-crafted & Made with
        <Heart size={14} />
      </span>
    </p>
  )
}

export default Footer