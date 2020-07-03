import React from "react";
import "./AdminPanel.css";
import { Redirect } from "react-router-dom";
import { storage } from "./Firebase";

export default class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      database: [],
      IsAddmoreOpen: false,
      PlusOrTick: "\u002B",
      addPost: [],
      idofButton: "",
      header: " ",
      post: " ",
      loading: ".\xa0\xa0",
      overlay: false,
      redirect: null,
      selectedFile: null,
      progress: 0,
      imgUrl: null,
    };
    this.changeAddmore = this.changeAddmore.bind(this);
  }
  getDatabase() {
    this.setState({ overlay: true });
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.token,
      },
    };
    fetch("http://localhost:9000/database", requestOptions)
      .then((response) => response.json())
      .then((response) => this.jsontoArray(response))
      .then(() => this.forceUpdate())
      .catch((error) => {
        return error;
      });
  }
  componentWillMount() {
    this.setState({ token: localStorage.getItem("token") });
  }
  changeFastOverlay = () => {};
  componentDidMount() {
    this.WaitOverlay.fired = false;
    if (this.state.token !== null) {
      this.getDatabase();
    } else {
      this.setState({ redirect: "/Admin1957264" });
    }
  }
  jsontoArray(response) {
    let array = [];
    for (let key in response) {
      if (response.hasOwnProperty(key)) {
        let item = response[key];
        array.push({
          id: item.id,
          header: item.header,
          post: item.post,
          showMore: false,
        });
      }
    }
    this.setState({ database: array });
    this.setState({ overlay: false });
  }
  changeShowMore(item) {
    if (item.showMore === false) {
      item.showMore = true;
      this.forceUpdate();
    } else {
      item.showMore = false;
      this.forceUpdate();
    }
  }
  removeItemFromList(item) {
    this.changeShowMore(item);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.token,
      },
    };
    fetch("http://localhost:9000/database/remove/" + item.id, requestOptions)
      .then((response) => {
        if (response.affectedRows !== 0) {
          this.removeItemUser(item);
        }
      })
      .catch((error) => {
        return(error);
      });
  }
  removeItemUser(item) {
    let filteredArray = this.state.database.filter(
      (remove) => remove.id !== item.id
    );
    this.setState({ database: filteredArray });
    this.setState({ cancelAnimation: "post" });
  }
  DataTable() {
    return this.state.database.map((item) => (
      <li
        onClick={() => {
          this.changeShowMore(item);
        }}
        key={item.id}
        className="listitem"
      >
        {item.header}
        <header
          onClick={() => {
            this.ImageDelete(item);
            // this.removeItemFromList(item);
          }}
          className="delete-icon"
        >
          {"\u00D7"}
        </header>
        {item.showMore ? <p className="post">{item.post}</p> : ""}
      </li>
    ));
  }
  changeAddmore(addButton) {
    if (addButton === "addButton") {
      if (this.state.IsAddmoreOpen === true) {
        this.AddPostToDatabase();
      }
    }
    if (this.state.IsAddmoreOpen === false) {
      this.setState({ IsAddmoreOpen: true });

      this.setState({ PlusOrTick: this.svgTick() });
    } else if (this.state.IsAddmoreOpen === true) {
      this.setState({ PlusOrTick: "\u002B" });
      this.setState({ IsAddmoreOpen: false });
      // run post here
    }
  }
  svgTick() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="style-svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
      </svg>
    );
  }
  headerHandler = (event) => {
    this.setState({ header: event.target.value });
  };
  postHandler = (event) => {
    this.setState({ post: event.target.value });
  };
  fileSelectedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] }, () => {
      this.fileUploadHandler();
    });
  };
  fileUploadHandler = () => {
    const uploadTask = storage
      .ref("images/" + this.state.selectedFile.name)
      .put(this.state.selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress: progress });
      },
      (error) => {
        return(error);
      },
      () => {
        storage
          .ref("images")
          .child(this.state.selectedFile.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({ imgUrl: url });
          });
      }
    );
  };
  ImageDelete = (item) => {
    fetch("http://localhost:9000/database/headlines/" + item.id)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        var imgUrl = data[0].imgUrl;
        var n = imgUrl.indexOf("/images%2F");
        imgUrl = imgUrl.substring(n - 1);
        imgUrl = imgUrl.replace("/images%2F", "");
        n = imgUrl.indexOf("?alt=media&token=");
        imgUrl = imgUrl.substring(n, 1);
        if (imgUrl !== "") {
          var todelete = storage.ref("images").child(imgUrl);
          todelete
            .delete()
            .then(function () {
              //FILE DELETED
            })
            .catch(function (error) {
              return(error);
            });
        }
      })
      .then(() => this.removeItemFromList(item));
  };

  inputsFunc() {
    if (this.state.IsAddmoreOpen === true) {
      return (
        <div className="inputsAll">
          <input onChange={this.headerHandler} className="inputHeader"></input>
          <textarea
            onChange={this.postHandler}
            className="inputPost"
          ></textarea>
          <input
            id="file"
            className="inputImage"
            type="file"
            onChange={this.fileSelectedHandler}
          />
          <label className="LabelFile" htmlFor="file">
            Upload Image
          </label>
          <progress
            className="progressBar"
            value={this.state.progress}
            max="100"
          />
          <br />
          <div onClick={this.changeAddmore} className="cancelButton">
            {"\u00D7"}
          </div>
        </div>
      );
    }
  }
  AddPostToDatabase() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.token,
      },
      body: JSON.stringify({
        header: this.state.header,
        post: this.state.post,
        imgUrl: this.state.imgUrl,
      }),
    };
    fetch("http://localhost:9000/database/add", requestOptions)
      .then((response) => {
        if (response.ok === true) {
          this.setState({ header: " " });
          this.setState({ post: " " });
          this.setState({ imgUrl: " " });
          this.getDatabase();
        }
      })
      .catch((error) => {
        return(error);
      });
  }
  componentDidUpdate() {}
  WaitOverlayTrue() {
    return (
      <div onLoad={this.WaitOverlay()} className="Loading">
        <p className="Loadingdots">{this.state.loading}</p>
      </div>
    );
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
          string = string.replace("\xa0", ".");
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
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="AdminPanel">
        <div className="frame">
          <div className="table">
            <ul className="list">{this.DataTable()}</ul>
            {this.inputsFunc()}
            <div
              className="buttonAddMore"
              onClick={() => {
                this.changeAddmore("addButton");
              }}
            >
              {this.state.PlusOrTick}
            </div>
          </div>
        </div>
        {this.state.overlay ? this.WaitOverlayTrue() : this.state.idofButton}
      </div>
    );
  }
}
