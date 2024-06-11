import {Component} from 'react'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import GamingCard from '../GamingCard'
import './index.css'

class Gaming extends Component {
  state = {gamingList: []}

  componentDidMount() {
    this.renderGamingCard()
  }

  renderGamingCard = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        AUTHORIZATION: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        gamingList: updatedData,
      })
      const {gamingList} = this.state
      console.log(gamingList)
    }
  }

  render() {
    const {isDark} = this.props
    const {gamingList} = this.state
    const gamingColor = isDark ? 'white' : ''
    const backColor = !isDark ? 'back-color' : ''
    const backIcon = !isDark ? 'icon-container-color' : ''

    return (
      <div className={`gaming-card-container ${gamingColor}`}>
        <header className={`gaming-header ${backColor}`}>
          <div className="gaming-icon-container">
            <div className={`icon-game-container ${backIcon}`}>
              <SiYoutubegaming className="game-icon" />
            </div>
            <h1>Gaming</h1>
          </div>
        </header>
        <ul className="gaming-list-container">
          {gamingList.map(eachList => (
            <GamingCard eachList={eachList} key={eachList.id} isDark={isDark} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Gaming
