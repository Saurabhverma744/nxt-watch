import {withRouter} from 'react-router-dom'
import './index.css'

const HomeCard = props => {
  const {eachVideo, isDark, history} = props
  const {thumbnailUrl, title, viewCount, channel, id} = eachVideo
  const {name, profileImageUrl} = channel
  const paraText = isDark ? 'black-text' : ''
  const countText = isDark ? 'count-text' : ''

  const onClickCard = () => {
    history.push(`/video/${id}`)
  }

  return (
    <li className="card-list">
      <button type="button" className="home-card-button" onClick={onClickCard}>
        <img src={thumbnailUrl} alt={`video ${id}`} className="thumbnail" />
        <div className="profile-item-container">
          <img src={profileImageUrl} alt={name} className="profile-image-url" />
          <div className="home-card-text-container">
            <p className={paraText}>{title}</p>
            <p className={countText}>{name}</p>
            <div className="count">
              <p className={countText}>{viewCount} views</p>
              <p className={countText}>1 year ago</p>
            </div>
          </div>
        </div>
      </button>
    </li>
  )
}

export default withRouter(HomeCard)
