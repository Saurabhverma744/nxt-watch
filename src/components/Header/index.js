import {FiSun} from 'react-icons/fi'
import {FaMoon} from 'react-icons/fa'
import './index.css'

const Header = props => {
  const {isDark, onClickThemeBtn} = props

  const onClickThemeButton = () => {
    onClickThemeBtn(!isDark)
  }

  const logoImage = isDark
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

  const logout = isDark ? 'log' : ''
  const theme = !isDark ? (
    <FaMoon className="theme-icon" />
  ) : (
    <FiSun className="sun-icon" />
  )

  return (
    <nav className="navbar">
      <div className="header-logo-container">
        <img src={logoImage} alt="logo" className="header-logo-image" />
      </div>
      <div className="header-icon-container">
        <button
          className="theme-button-container"
          type="button"
          onClick={onClickThemeButton}
        >
          {theme}
        </button>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
          className="profile-logo"
        />
        <button type="button" className={`Logout-button ${logout}`}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Header
