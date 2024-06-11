import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import './index.css'

class VideoItemDetails extends Component {
  state = {videoData: null, isLiked: false, isDisliked: false}

  componentDidMount() {
    this.fetchVideoDetails()
  }

  fetchVideoDetails = async () => {
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
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
      const video = data.video_details
      const updatedVideoData = {
        id: video.id,
        title: video.title,
        videoUrl: video.video_url,
        description: video.description,
        thumbnailUrl: video.thumbnail_url,
        viewCount: video.view_count,
        publishedAt: video.published_at,
        channel: {
          name: video.channel.name,
          profileImageUrl: video.channel.profile_image_url,
        },
      }
      this.setState({videoData: updatedVideoData})
    }
  }

  onClickLike = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  onClickDislike = () => {
    this.setState(prevState => ({
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }))
  }

  onClickSave = () => {}

  render() {
    const {videoData, isLiked, isDisliked} = this.state

    if (!videoData) {
      return <div>Loading...</div>
    }

    const {
      title,
      videoUrl,
      viewCount,
      publishedAt,
      channel,
      description,
    } = videoData
    const {name, profileImageUrl} = channel
    const date = new Date(publishedAt)
    const year = date.getFullYear()
    const finalYear = 2021 - parseInt(year)
    const likeColor = isLiked ? 'blue' : ''
    const disLikeColor = isDisliked ? 'blue' : ''

    return (
      <div className="video-item-details">
        <div className="video-item-details-container">
          <ReactPlayer url={videoUrl} className="video-player" />
          <p className="video-title">{title}</p>
          <div className="video-item-details-like-container">
            <div className="video-published-date">
              <p>{viewCount} views</p>
              <p className="final-year">{finalYear} years ago</p>
            </div>
            <div className="video-item-like-container">
              <button
                type="button"
                className="video-button"
                onClick={this.onClickLike}
              >
                <div className={`icon-youtube ${likeColor}`}>
                  <AiOutlineLike className="like-icon" />
                  <p className="impression-icon">Like</p>
                </div>
                {}
              </button>
              <button
                type="button"
                className="video-button"
                onClick={this.onClickDislike}
              >
                <div className={`icon-youtube ${disLikeColor}`}>
                  <AiOutlineDislike className="like-icon" />
                  <p className="impression-icon">Dislike</p>
                </div>
                {}
              </button>
              <button
                type="button"
                className="video-button"
                onClick={this.onClickSave}
              >
                <div className="icon-youtube">
                  <MdPlaylistAdd className="like-icon" />
                  <p className="impression-icon">Save</p>
                </div>
                {}
              </button>
            </div>
          </div>
          <hr className="line-break" />
          <div className="channel-details">
            <img src={profileImageUrl} alt={name} className="channel-profile" />
            <div className="batsman-description">
              <p className="">{name}</p>
              <p className="name">{viewCount} subscribers</p>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(VideoItemDetails)
