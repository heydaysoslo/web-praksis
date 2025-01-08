import React, { Component } from "react";
import { loggedIn } from "../utils/wp";
import cc from "classcat";

export default class EditPostLink extends Component {
  state = {
    loggedIn: false,
  };
  componentDidMount = () => {
    loggedIn()
      .then((res) => {
        if (res?.logged_in) {
          this.setState({
            loggedIn: true,
          });
        }
      })
      .catch();
  };

  render() {
    const { loggedIn } = this.state;
    const { edit_post_link } = this.props.post;
    if (!loggedIn || !edit_post_link) {
      return null;
    }
    return (
      <div
        className={cc({
          [this.props.className]: true,
          EditPostLink: true,
        })}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="EditPostLink__link"
          href={edit_post_link}
        >
          Rediger
        </a>
      </div>
    );
  }
}
