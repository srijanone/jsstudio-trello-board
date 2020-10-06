import React from "react";
import "./style.css";
import GoogleLogin from "react-google-login";
// import logo from '../../logo.svg';

/**
 * TODO
 * - Don't import logo from srijan site
 */

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    if (true) {
      this.setState({
        isLoggedIn: true,
      });
    }
  }

  loginFaliure = () => {
    alert("Login Falied");
  };

  loginSuccess = (response) => {
    console.log(response);
    localStorage.setItem(
      "google_id_token",
      response.getAuthResponse().id_token
    );
    window.location.href = "http://" + window.location.host + "/configurationform";
  };

  render() {
    const { isLoggedIn } = this.state;
    return (
      <div className="login-form h-100 d-flex flex-column justify-content-center align-items-center">
        <div className="card shadow border-0 bg-white rounded p-5">
          <img
            src={"https://www.srijan.net/hubfs/combined-shape-22.svg"}
            className="card-img-top"
            alt="logo"
          />
          <div className="card-body d-flex flex-column mt-3 align-items-center justify-content-center">
            <small className="text-muted my-1">Please login to continue</small>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
