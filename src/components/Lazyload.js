import React, { Component } from "react";
import { emptyGif } from "../utils/lazysizes";
import { v1 as uuid } from "uuid";

const sortByKey = (myObject) => {
  return Object.keys(myObject).reduce((accumulator, currentValue) => {
    accumulator[currentValue] = myObject[currentValue];
    return accumulator;
  }, {});
};

export default class Lazyload extends Component {
  render() {
    const { sizes, alt, title } = this.props;

    // Make sure sizes are sorted smallest first
    const sizesSorted = sortByKey(sizes);

    // Pop last item off object
    const lastKey = Object.keys(sizesSorted).pop();
    const mainImage = sizesSorted[lastKey];
    delete sizesSorted[lastKey];

    return (
      <picture>
        {Object.keys(sizesSorted).map((key) => {
          const image = sizesSorted[key];
          return (
            <source
              key={uuid("source")}
              data-srcset={image}
              media={`(max-width: ${key}px)`}
            />
          );
        })}
        <img
          src={emptyGif}
          data-src={mainImage}
          className="lazyload"
          alt={alt}
          data-sizes="auto"
          title={title}
          data-aspectratio={this.props.aspectratio}
        />
      </picture>
    );
  }
}
