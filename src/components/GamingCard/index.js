import {withRouter} from 'react-router-dom'
import './index.css'
import VideoItemDetails from '../VideoItemDetails'

const GamingCard = props => {
  const {eachList, isDark, saveVideo} = props
  const {thumbnailUrl, title, viewCount, id} = eachList
  const headingColor = isDark ? 'white' : ''

  const onClickGamingCard = () => {
    const {history} = props
    history.push(`/video/${id}`)
  }

  const onClickSave = () => {
    saveVideo(eachList)
  }

  return (
    <li className={`gaming-list ${headingColor}`}>
      <button
        type="button"
        className="gaming-card-button"
        onClick={onClickGamingCard}
      >
        <div className={headingColor}>
          <img
            src={thumbnailUrl}
            alt={title}
            className="gaming-thumbnail-url"
          />
          <p>{title}</p>
          <p>{viewCount} Watching Worldwide</p>
        </div>
      </button>
    </li>
  )
}

export default withRouter(GamingCard)
