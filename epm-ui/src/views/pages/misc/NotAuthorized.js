import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import notAuthImg from '@src/assets/images/pages/not-authorized.svg'

import '@styles/base/pages/page-misc.scss'

// ** Configs
import themeConfig from '@configs/themeConfig'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/actions/auth'

const NotAuthorized = () => {
  // ** Store Vars
  const dispatch = useDispatch()

  return (
    <div className='misc-wrapper'>
      <a className='brand-logo' href='/'>
        <span className='brand-logo'>
          <img src={themeConfig.app.appLogoImage} alt='logo' />
        </span>
        <h2 className='brand-text text-primary mb-0 ml-1'>{themeConfig.app.appName}</h2>
      </a>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>You are not authorized! 🔐</h2>
          <p className='mb-2'>
            The Webtrends Marketing Lab website in IIS uses the default IUSR account credentials to access the web pages
            it serves.
          </p>
          <Button tag={Link} to='/login' color='primary' className='btn-sm-block mb-1'
                  onClick={() => dispatch(handleLogout())}>
            Back to login
          </Button>
          <img className='img-fluid' src={notAuthImg} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default NotAuthorized
