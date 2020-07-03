import React from "react";
import "./Post.css";
import { Redirect } from "react-router-dom";

export default class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      postNum: null,
      redirect: null,
      post: "",
      header: "",
      imgUrl: "",
      readytorender: false,
    };
    this.scrapeUrl = this.scrapeUrl.bind(this);
  }
  scrapeUrl() {
    let url = window.location.pathname.toString();
    url = url.replace("/Post/", " ");
    url = url.replace(" ", "");
    this.setState({ postNum: url }, () => this.fetchPost());
  }
  fetchPost() {
    fetch(
      "http://localhost:9000/database/headlines/" +
        this.state.postNum.toString()
    )
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        if (data.length !== 0) {
          this.setState({ header: data[0].header });
          this.setState({ post: data[0].post });
          this.setState({ imgUrl: data[0].imgUrl });
          this.setState({ mounted: true });
          this.setState({ readytorender: true });
        } else {
          this.setState({ readytorender: true });
          this.setState({ redirect: "/Error" });
          return;
        }
      })

      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  }
  componentDidMount() {
    document.title = "Post";
    this.scrapeUrl();
  }
  render() {
    if (this.state.readytorender === false) {
      return true;
    }
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="Post">
        <div className="back_101img">
          <div className="blog-post__header">
            <h1 className="blog-post__title_Full">{this.state.header}</h1>
            <div className="blog-post__meta">
              <div className="blog-post__datePost">
                June 05, 2020
                <div
                  onClick={() => {
                    setTimeout(() => {
                      window.history.back();
                    }, 50);
                  }}
                  className="return-back"
                >
                  {" "}
                  Go Back
                </div>
              </div>
            </div>
            <div className="wrapper">
              <article className="blog-post">
                <div className="blog-post__content_Full">
                  {this.state.imgUrl.length > 0 ? (
                    <img
                      src={this.state.imgUrl}
                      alt="banner"
                      className="bannerimg"
                    />
                  ) : null}
                  <p>{this.state.post}</p>
                </div>
              </article>
            </div>
            <div className="emptySpace"></div>
          </div>
        </div>
      </div>
    );
  }
}
