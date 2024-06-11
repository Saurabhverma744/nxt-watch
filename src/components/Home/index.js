import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaHome, FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import {ImCross} from 'react-icons/im'
import {IoIosSearch} from 'react-icons/io'
import HomeCard from '../HomeCard'
import Header from '../Header'
import Trending from '../Trending'
import Gaming from '../Gaming'
import SavedVideos from '../SavedVideos'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    isDark: true,
    activeIcon: 'home',
    searchInput: '',
    isShow: true,
    videosList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.renderComponents()
  }

  renderNav = () => {
    const {isDark, activeIcon} = this.state
    const darkColor = isDark ? 'dark-color' : 'light-color'
    const listColor = isDark ? 'bac-blue' : 'bac-red'
    const footer = isDark ? 'white' : ''

    return (
      <div className="home-list-container">
        <ul className="ul-list-container">
          <li
            className={`nxt-watch-list ${
              activeIcon === 'home' ? listColor : ''
            }`}
          >
            <button
              className="home-list-button"
              type="button"
              onClick={() => this.onClickIcon('home')}
            >
              <FaHome
                className={`${darkColor} ${activeIcon === 'home' ? 'red' : ''}`}
              />
              <p className={darkColor}>Home</p>
            </button>
          </li>
          <li
            className={`nxt-watch-list ${
              activeIcon === 'trending' ? listColor : ''
            }`}
          >
            <button
              className="home-list-button"
              type="button"
              onClick={() => this.onClickIcon('trending')}
            >
              <FaFire
                className={`${darkColor} ${
                  activeIcon === 'trending' ? 'red' : ''
                }`}
              />
              <p className={darkColor}>Trending</p>
            </button>
          </li>
          <li
            className={`nxt-watch-list ${
              activeIcon === 'game' ? listColor : ''
            }`}
          >
            <button
              className="home-list-button"
              type="button"
              onClick={() => this.onClickIcon('game')}
            >
              <SiYoutubegaming
                className={`${darkColor} ${activeIcon === 'game' ? 'red' : ''}`}
              />
              <p className={darkColor}>Gaming</p>
            </button>
          </li>
          <li
            className={`nxt-watch-list ${
              activeIcon === 'save' ? listColor : ''
            }`}
          >
            <button
              className="home-list-button"
              type="button"
              onClick={() => this.onClickIcon('save')}
            >
              <MdPlaylistAdd
                className={`${darkColor} ${activeIcon === 'save' ? 'red' : ''}`}
              />
              <p className={darkColor}>Saved videos</p>
            </button>
          </li>
        </ul>
        <div className={`footer-container ${footer}`}>
          <p>CONTACT US</p>
          <div className="footer-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
              className="footer-logo"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
              alt="twitter logo"
              className="footer-logo"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
              className="footer-logo"
            />
          </div>
          <div className="recommendation-container">
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </div>
      </div>
    )
  }

  renderCard = () => {
    const {isShow} = this.state
    const hideCard = isShow ? '' : 'hide'

    return (
      <div className={`nxt-cut-card-container ${hideCard}`}>
        <div className="nxt-cut-card">
          <div className="cut-icon-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="logo"
              className="nxt-logo"
            />
            <button
              type="button"
              className="cut-button"
              onClick={this.onClickCross}
            >
              <ImCross />
              {}
            </button>
          </div>
          <p>Buy Nxt Watch Premium prepaid plans with</p>
          <p>UPI</p>
          <button type="button" className="get-button">
            GET IT NOW
          </button>
        </div>
      </div>
    )
  }

  renderSearch = () => {
    const {isDark, searchInput} = this.state

    const darkProp = isDark ? '' : 'light-search'
    const darkProps = isDark ? '' : 'light-searches'
    const darkIcon = isDark ? '' : 'lightIcon'

    return (
      <div className={`input-container ${darkProp}`}>
        <input
          type="search"
          className={`search-input ${darkProps}`}
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          className="search-icon-button"
          onClick={this.onClickIconButton}
        >
          <IoIosSearch className={`search-icon ${darkIcon}`} />
          {}
        </button>
      </div>
    )
  }

  renderComponents = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const option = {
      method: 'GET',
      headers: {
        AUTHORIZATION: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, option)
    const data = await response.json()

    if (response.ok) {
      const updatedVideoList = data.videos.map(video => ({
        id: video.id,
        thumbnailUrl: video.thumbnail_url,
        publishedAt: video.published_at,
        title: video.title,
        viewCount: video.view_count,
        channel: {
          name: video.channel.name,
          profileImageUrl: video.channel.profile_image_url,
        },
      }))
      this.setState({
        videosList: updatedVideoList,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFoundView = () => {
    const {videosList, isDark} = this.state

    return (
      <ul className="unordered-card-container ">
        {videosList.map(eachVideo => (
          <HomeCard eachVideo={eachVideo} key={eachVideo.id} isDark={isDark} />
        ))}
      </ul>
    )
  }

  renderHomeValue = () => {
    const {videosList} = this.state

    return (
      <div>
        {this.renderSearch()}
        {videosList.length !== 0
          ? this.renderFoundView()
          : this.renderNoItemFoundView()}
      </div>
    )
  }

  renderSuccessView = () => {
    const {activeIcon, isDark} = this.state

    switch (activeIcon) {
      case 'home':
        return this.renderHomeValue()
      case 'trending':
        return <Trending isDark={isDark} />
      case 'game':
        return <Gaming isDark={isDark} />
      case 'save':
        return <SavedVideos isDark={isDark} />
      default:
        return null
    }
  }

  renderFailureView = () => {
    const {isDark} = this.state
    const failureText = isDark ? 'failure-text' : ''
    const failureImage = isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

    return (
      <div className={`failure-image-container-1 ${failureText}`}>
        <img
          src={failureImage}
          className="failure-watch-image"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We are having some trouble to complete you request.</p>
        <p>Please try again</p>
        <button type="button" className="retry-button">
          Retry
        </button>
      </div>
    )
  }

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderNoItemFoundView = () => {
    const {isDark} = this.state
    const failureText = isDark ? 'failure-text' : ''

    return (
      <div className={`failure-image-container-1 ${failureText}`}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
          className="failure-watch-image"
          alt="not found"
        />
        <h1>No search result found</h1>
        <p>Try different key words or remove search filter </p>

        <button
          type="button"
          className="retry-button"
          onClick={this.onClickRetryNotFound}
        >
          Retry
        </button>
      </div>
    )
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickIconButton = () => {
    console.log('Icon Clicked')
    const {searchInput, videosList} = this.state
    const filteredResult = videosList.filter(eachVideo =>
      eachVideo.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    console.log(filteredResult)
    this.setState({
      videosList: filteredResult,
    })
  }

  onClickThemeBtn = isDark => {
    this.setState({
      isDark,
    })
  }

  onClickCross = () => {
    this.setState({
      isShow: false,
    })
  }

  onClickRetryNotFound = () => {
    this.setState(
      {
        searchInput: '',
      },
      this.renderComponents,
    )
  }

  onClickIcon = icon => {
    this.setState(
      {
        activeIcon: icon,
      },
      () => {
        if (icon === 'home') {
          this.renderComponents()
        } else {
          this.setState({apiStatus: apiStatusConstants.success})
        }
      },
    )
  }

  render() {
    const {isDark} = this.state
    const darkBack = isDark ? 'dark' : 'light'
    const backDark = isDark ? 'back-dark' : 'back-light'

    return (
      <div className={darkBack}>
        <Header isDark={isDark} onClickThemeBtn={this.onClickThemeBtn} />
        <div className="renderCard">
          {this.renderNav()}
          <div className={`card-and-search-container ${backDark}`}>
            {this.renderCard()}
            {this.renderView()}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
