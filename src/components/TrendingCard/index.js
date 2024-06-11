import {withRouter} from 'react-router-dom'
import './index.css'

const TrendingCard = props => {
  const {eachList, isDark, history} = props
  const {thumbnailUrl, title, viewCount, channel, id} = eachList
  const {name} = channel
  const headingColor = isDark ? 'white' : ''

  const onClickCard = () => {
    history.push(`/video/${id}`)
  }

  return (
    <li className={`trending-list ${headingColor}`}>
      <button
        type="button"
        className="trending-card-button"
        onClick={onClickCard}
      >
        <div className={`trending-text-card ${headingColor}`}>
          <img
            src={thumbnailUrl}
            alt={title}
            className="trending-thumbnail-url"
          />
          <div className="view-count-container">
            <p className="trending-title">{title}</p>
            <p className="name">{name}</p>
            <div className="published-at">
              <p className="view-counts">{viewCount} views</p>
              <p>1 year ago</p>
            </div>
          </div>
        </div>
      </button>
    </li>
  )
}

export default withRouter(TrendingCard)
