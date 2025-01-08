import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getTags } from "../utils/wp";
import cc from "classcat";

class TagCloud extends Component {
  state = {
    loading: true,
    tags: [],
  };

  componentDidMount() {
    getTags().then((tags) => {
      this.setState({ tags, loading: false });
    });
  }

  render() {
    const { loading, tags } = this.state;
    if (loading) {
      return null;
    }
    return (
      <div
        className={cc({
          TagCloud: true,
          [this.props.className]: this.props.className,
        })}
      >
        {this.props.children}
        <nav className="TagCloud__nav">
          <ul className="TagCloud__list">
            {tags &&
              tags.map((tag) => {
                return (
                  <li key={`tag-${tag.id}`} className="TagCloud__item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "TagCloud__link--active" : "TagCloud__link"
                      }
                      key={"tag-" + tag.id}
                      to={tag.link}
                    >
                      {tag.name}
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </nav>
      </div>
    );
  }
}

export default TagCloud;
