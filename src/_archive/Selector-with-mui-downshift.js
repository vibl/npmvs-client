import React, { Component } from 'react';
import MuiDownshift from 'mui-downshift';
import PropTypes from 'prop-types';
import {getSuggestions} from './table-data';

//const items = starwarsNames.map((label, value) => ({ label, value }));

class Selector extends Component {
  static defaultProps = {
    blurOnSelect: false,
  };

  state = {
    suggestions: [],
  };

  handleStateChange = async changes => {
    const input = changes.inputValue;
    if (typeof input === 'string' && input !== "" ) {
      const suggestions = await getSuggestions(input.toLowerCase());
      // const suggestions = items.filter(item => item.label.toLowerCase().includes(changes.inputValue.toLowerCase()));
      this.setState({ suggestions });
    }
    if (this.input && this.props.blurOnSelect) {
      this.input.blur();
    }
  };

  render() {
    const { suggestions } = this.state;
    return (
      <MuiDownshift
        items={suggestions}
        onStateChange={this.handleStateChange}
        // getListItemKey={rowIndex => suggestions[rowIndex].value}
        // keyMapper={rowIndex => suggestions[rowIndex] && suggestions[rowIndex].label}
        {...this.props}
        inputRef={node => {
          this.input = node;
        }}
      />
    );
  }
}

Selector.propTypes = {
  blurOnSelect: PropTypes.bool,
};

export default Selector;