import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    isLight: true,
    isClicked: false,
    username: '',
    password: '',
    showErrorMsg: '',
    isError: false,
  }

  onClickCheckbox = () => {
    this.setState(prevState => ({
      isClicked: !prevState.isClicked,
    }))
  }

  onSubmitFailureView = msg => {
    this.setState({
      isError: true,
      showErrorMsg: msg,
    })
  }

  onSubmitSuccessView = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitForm = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSubmitSuccessView(data.jwt_token)
    }

    if (response.status === 400) {
      this.onSubmitFailureView(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const {isLight, isClicked, isError, showErrorMsg} = this.state

    const loginImage = isLight
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

    const backColor = isLight ? 'light' : 'Dark'
    const inputType = isClicked ? 'text' : 'password'
    const mode = isLight ? '' : 'darkest'

    return (
      <div className={`main-container ${backColor}`}>
        <div className={`login-container ${backColor}`}>
          <div className="login-image-container">
            <img src={loginImage} alt="logo" className="login-image" />
          </div>
          <form className={`form ${mode}`} onSubmit={this.onSubmitForm}>
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="username"
              id="username"
              className={`login-input ${backColor}`}
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              type={inputType}
              placeholder="password"
              id="password"
              className={`login-input ${backColor}`}
              onChange={this.onChangePassword}
            />
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="checkbox"
                onClick={this.onClickCheckbox}
              />
              <label htmlFor="checkbox" className="label">
                Show Password
              </label>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {isError && <p className="error-msg">*{showErrorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
