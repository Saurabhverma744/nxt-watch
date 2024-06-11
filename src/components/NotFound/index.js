import './index.css'

const NotFound = props => {
  const {isDark} = props
  const backImage = isDark
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

  return (
    <div className="not-found-container">
      <img src={backImage} alt="not found" className="not-found-image" />
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found.</p>
    </div>
  )
}

export default NotFound
