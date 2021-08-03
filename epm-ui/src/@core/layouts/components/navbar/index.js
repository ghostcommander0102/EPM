// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import NavbarMenuToggle from './NavbarMenuToggle'
// import NavbarBookmarks from './NavbarBookmarks'
import NavbarUser from './NavbarUser'

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <NavbarMenuToggle setMenuVisibility={setMenuVisibility} />
        {/*<NavbarBookmarks setMenuVisibility={setMenuVisibility} />*/}
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
