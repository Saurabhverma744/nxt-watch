import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaFire} from 'react-icons/fa'
import GamingCard from '../GamingCard'
import './index.css'

class SavedVideos extends Component {
  state = {gamingList: []}

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
            <h1>Saved Videos</h1>
          </div>
        </header>
      </div>
    )
  }
}

export default SavedVideos
