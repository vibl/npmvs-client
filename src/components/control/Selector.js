import React from 'react';
import {connect} from 'react-redux';
import AsyncSelect from 'react-select/lib/Async';
import { components } from 'react-select';
import {equals} from 'ramda';
// import chroma from 'chroma-js'; // TODO: remplacer par le module 'color'?
import {displayInfoPage, hideInfoPage, getSuggestions} from '../../logic/selector';
import {selectPackage, deselectPackage} from '../../logic/router-utils';
import {getPackageColors} from "../../logic/utils";

const styles = {
  control: styles => ({
    ...styles,
    border: '1px solid #880022',
    background: '#f7f1f1',
   }),
  menu: (base, {isFocused}) => ({
    ...base,
    zIndex: 3000,
  }),
  menuList:  (base, {isFocused}) => ({
    ...base,
    zIndex: 3000,
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
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
    const packId = data.value;
    const hasFocus = focus === packId;
    const packColor = packageColors[packId];
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
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    fontSize: '0.9rem',
  }),
  multiValueRemove: (styles, { data }) => ({
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

const Option = (props) => {
  const d = props.data;
  return (
    <components.Option {...props}>
      <div style={{
        display: 'flex',
        color: '#880022',
        fontSize: '16px',
      }}>
        <div style={{width: 300}}>
          {d.label}
        </div>
        <div style={{width: 100, paddingRight: 20,}}>
          <div style={{
            backgroundColor: '#880022',
            boxShadow: '0 0 2px #880022',
            height: 15,
            width: Math.round(d.popularity*100)
          }}/>
        </div>
        <div style={{width: 600, paddingLeft: 20}}>
          {d.description}
        </div>
      </div>
    </components.Option>
  );
};
class PackageSelector extends React.Component {
  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
  }
  componentDidMount() {
    this.updateSelection();
  }
  componentDidUpdate() {
    this.updateSelection();
  }
  handleMouseEnter = (evt) => {
    clearTimeout(this.mouseLeaveTimeout);
    const packId = evt.target.innerText.trim();
    if( packId ) {
      displayInfoPage(packId);
      // setFocus(packId);
    }
  };
  handleMouseLeave = (evt) => {
    this.mouseLeaveTimeout = setTimeout(hideInfoPage, 100);
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
        valueElements[i].addEventListener("mouseenter", this.handleMouseEnter);
        valueElements[i].addEventListener("mouseleave", this.handleMouseLeave);
      }
  
    }
  }
  render() {
    const {focus, packageColors} = this.props;
    return (
      <AsyncSelect
        // menuIsOpen={true}
        ref={this.selectRef}
        isMulti
        cacheOptions
        defaultOptions
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
  focus: state.focus,
  selection: state.selection,
  packageColors: getPackageColors(state.color, state.selection),
});

export default connect(mapStateToProps)(PackageSelector);