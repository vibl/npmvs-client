import React, { Component } from 'react';
import { SearchBox } from 'react-instantsearch-dom';
import StyledWrapper from './search-box-styles';
import measureInputContentWidth from '../util/measureInputContentWidth';

class WrappedSearchBox extends Component {
  state = {
    active: false,
    width: null,
  };
  handleFocus = () =>
    this.setState({
      active: true,
    });

  handleBlur = () =>
    this.setState({
      active: false,
    });
  measureWidth(inputEl) {
    const width = measureInputContentWidth(inputEl);
    if( this.state.width !== width ) this.setState({width});
  }

  handleChange = (event) => {
    this.measureWidth(event.target);
    // const inputEl = event.target;
    // const value = inputEl.value;
    //
    // const inputStyle = getComputedStyle(inputEl);
    //
    // let wrapperDiv = document.createElement("div");
    // wrapperDiv.style.position = "absolute";
    // wrapperDiv.innerHTML = html(
    //   inputStyle['font-size'],
    //   inputStyle['font-family'].replace(/\"/g, "'")
    // this.hiddenSizerRef.tex
    // const width = Math.max((value.length / 2.68 + 1), 12) + 'rem';
    // this.setState({width});
  };
  render() {
    return (
      <StyledWrapper {...{width: this.state.width}} className={this.state.active ? 'active' : ''}>
          <SearchBox
              reset={null}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              {...this.props}
              onChange={this.handleChange}
            />
      </StyledWrapper>
    );
  }
}
export default WrappedSearchBox;
