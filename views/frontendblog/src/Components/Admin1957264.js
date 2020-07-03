import React from "react";
import "./Admin1957264.css";
import { Redirect } from "react-router-dom";

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      redirect: null,
      token: null,
      loading: ".\xa0\xa0",
      overlay: false,
    };
    this.sendPassword = this.sendPassword.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
  }
  handleUsername(event) {
    this.setState({ Username: event.target.value });
  }
  handlePassword(event) {
    this.setState({ Password: event.target.value });
  }

  sendPassword(event) {
    event.preventDefault();
    this.setState({ overlay: true });
    fetch("http://localhost:9000/database/login", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.Username,
        password: this.state.Password,
      }),
    })
      .then((res) => res.json())
      .then((res) => this.checkifCorrect(res))
      .then(() => this.setState({ redirect: "/AdminPanel" }))
      .catch((error) => {});
  }
  checkifCorrect(res) {
    if (res.token !== null) {
      this.setState({ overlay: false }, () => this.authenticateNredirect(res));
    } else {
      this.setState({ overlay: false }, () => this.forceUpdate());
    }
  }
  authenticateNredirect(res) {
    this.setState({ token: res.token });
    localStorage.setItem("token", res.token);
  }
  componentDidMount() {
    this.WaitOverlay.fired = false;
    if (localStorage.getItem("token") !== null) {
      this.setState({ redirect: "/AdminPanel" });
    }
  }
  componentWillUnmount() {
    this.setState({ maxwaiting: 0 });
  }
  WaitOverlay() {
    if (this.WaitOverlay.fired) return;
    this.WaitOverlay.fired = true;
    setInterval(() => {
      if (this.state.loading !== "...") {
        if (this.state.overlay === false) {
          return;
        } else {
          var string = this.state.loading;
          string =string.replace("\xa0", ".");
          this.setState({ loading: string });
        }
      } else {
        if (this.state.overlay === false) {
          return;
        } else {
          string = ".\xa0\xa0";
          this.setState({ loading: string });
        }
      }
    }, 200);
  }
  WaitOverlayTrue() {
    if (this.state.overlay === true) {
      return (
        <div onLoad={this.WaitOverlay()} className="Loading">
          {this.state.loading}
        </div>
      );
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="container-login">
        <form className="allform" onSubmit={this.sendPassword}>
          <div className="userForm">
            <label htmlFor="Username">Username</label>
            <input
              type="text"
              value={this.state.Username}
              onChange={this.handleUsername}
              placeholder="Enter username"
            />
          </div>
          <div className="passwordForm">
            <label htmlFor="InputPassword">Password</label>
            <input
              type="password"
              value={this.state.Password}
              onChange={this.handlePassword}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn-login">
            Log In
          </button>
        </form>
        {this.state.overlay ? this.WaitOverlayTrue() : this.state.username}
      </div>
    );
  }
}
