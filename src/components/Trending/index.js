import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaFire} from 'react-icons/fa'
import TrendingCard from '../TrendingCard'
import './index.css'

class Trending extends Component {
  state = {gamingList: []}

  componentDidMount() {
    this.renderGamingCard()
  }

  renderGamingCard = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        AUTHORIZATION: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
        channel: {
          name: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
        },
      }))
      this.setState({
        gamingList: updatedData,
      })
      const {gamingList} = this.state
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
              <FaFire className="game-icon" />
            </div>
            <h1>Trending</h1>
          </div>
        </header>
        <ul className="gaming-list-container">
          {gamingList.map(eachList => (
            <TrendingCard
              eachList={eachList}
              key={eachList.id}
              isDark={isDark}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Trending
