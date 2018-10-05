import React from 'react';
import {connect} from 'react-redux';
import AsyncSelect from 'react-select/lib/Async';
import { components } from 'react-select';
import {equals} from 'ramda';
import {getSuggestions} from './get-suggestions';
import {display, hideAfterTimeout} from '../util/popup-display-hide';
import {selectPackage, deselectPackage} from '../../logic/router';
import {getPackageColors} from "../../util/utils";
import {setFocus} from '../../logic/focus';
import {disableBlinkerTarget, registerBlinkerTarget} from "../util/Blinker";

const styles = {
  control: styles => ({
    ...styles,
    border: '1px solid #880022',
    background: '#f7f1f1',
   }),
  menu: (base) => ({
    ...base,
    zIndex: 3000,
  }),
  menuList:  (base) => ({
    ...base,
    zIndex: 3000,
  }),
  option: (styles, { data, isDisabled, isFocused}) => {
    return {
      ...styles,
        // ? null
        // : isSelected ? 'white' : isFocused ? '#880022' : null,
      color: '#880022',
        // ? '#ccc'
        // : isSelected
        //   ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
        //   : data.color,
      background: isFocused ? '#FEE' : 'white',
      cursor: isDisabled ? 'not-allowed' : 'default',
      zIndex: 3000,
    };
  },
  multiValue: (styles, state) => {
    const { data, selectProps: {focus, packageColors} } = state;
    const packName = data.value;
    const hasFocus = focus === packName;
    const packColor = packageColors[packName];
    if( !packColor ) return null;
    const {lightGradient, colorDarker, baseColor} = packColor;
    return {
      ...styles,
      background: lightGradient,
      boxShadow: hasFocus
        ? `0 0 3px 3px ${colorDarker},inset -1px -1px 1px 0px ${colorDarker}`
        : `0 0 2px 0 ${baseColor}`,
      border:  hasFocus ? `1px solid ${baseColor}` : '0'
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    fontSize: '0.9rem',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    ':hover': {
      color: 'white',
    },
  }),
};

const onChange = (value, arg) => {
  // console.log('onChange:', arg);
  switch(arg.action) {
    case "select-option":
      selectPackage(arg.option.value);
      break;
    case "remove-value":
      deselectPackage(arg.removedValue.value);
      break;
    default:
  }
};


class PackageSelector extends React.Component {
  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
  }
  componentDidMount() {
    this.updateSelection();
    registerBlinkerTarget({
      id: 'SelectorButtons',
      selector: '.package-selector > div > div:first-child  > div',
      rule: 'box-shadow: inset 0 0 2px 0 #ffffff, 0 0 2px 0 #ffffff !important',
      pattern: '3x200+4000',
    });
  }
  componentDidUpdate() {
    this.updateSelection();
  }
  handleMouseEnterButton = (evt) => {
    const packName = evt.target.innerText.trim();
    if( packName ) {
      display('InfoPage', packName);
      setFocus(packName);
    }
    disableBlinkerTarget('SelectorButtons');
  };
  handleMouseLeaveButton = () => {
    hideAfterTimeout('InfoPage', 500);
  };
  updateSelection() {
    const {selection} = this.props;
    const refSelect = this.selectRef.current;
    if( refSelect ) {
      const selectInstance = refSelect.select.select;
      const instanceSelection = selectInstance.state.selectValue.map(o => o.value);
      if( ! equals(selection, instanceSelection) ) {
        const options = selection.map( packName => ({label: packName, value: packName}));
        selectInstance.setValue(options);
      }
      //   .map( pack => ({label: pack, value: pack}))
      // options.forEach( option => refSelect.select.select.selectOption(option) );
      const valueElements = selectInstance.controlRef.children[0].children;
      for (let i = 0; i < valueElements.length; i++) { // Loop needed because this is an HTMLCollection, not an array.
        valueElements[i].addEventListener("mouseenter", this.handleMouseEnterButton);
        valueElements[i].addEventListener("mouseleave", this.handleMouseLeaveButton);
      }
    }
  }
  render() {
    const {focus, packageColors} = this.props;
    return (
      <AsyncSelect
        className="package-selector"
        // menuIsOpen={true}
        ref={this.selectRef}
        isMulti
        cacheOptions
        defaultOptions
        openMenuOnClick={false}
        maxMenuHeight={600}
        onChange={onChange}
        loadOptions={getSuggestions}
        components={{ Option }}
        styles={styles}
        {...{focus, packageColors}}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  focus: state.ui.focus,
  selection: state.selection,
  packageColors: getPackageColors(state.color, state.selection),
});

export default connect(mapStateToProps)(PackageSelector);