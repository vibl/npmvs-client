import React from 'react';
import {connect} from 'react-redux';
import AsyncSelect from 'react-select/lib/Async';
import { components } from 'react-select';
import {equals} from 'ramda';
// import chroma from 'chroma-js'; // TODO: remplacer par le module 'color'?
import {getSuggestions} from '../../logic/selector';
import {selectPackage, deselectPackage} from '../../logic/router-utils';
import {getPackageColors} from "../../logic/derived-state";
import {setFocus} from '../../logic/focus';

const styles = {
  // control: styles => ({ ...styles, backgroundColor: 'white' }),
  // option: (styles, { data, isDisabled, isFocused, isSelected }) => {
  //   const color = chroma(data.color);
  //   return {
  //     ...styles,
  //     backgroundColor: isDisabled
  //       ? null
  //       : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
  //     color: isDisabled
  //       ? '#ccc'
  //       : isSelected
  //         ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
  //         : data.color,
  //     cursor: isDisabled ? 'not-allowed' : 'default',
  //   };
  // },
  multiValue: (styles, state) => {
    const { data, selectProps: {focus, packageColors} } = state;
    const packId = data.value;
    const hasFocus = focus === packId;
    const packColor = packageColors[packId];
    return {
      ...styles,
      backgroundColor: packColor.color,
      border: hasFocus ? `${packColor.colorDarker} solid 2px` : 'none',
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
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
      <div style={{display: 'flex'}}>
        <div style={{width: 300}}>
          {d.label}
        </div>
        <div style={{width: 100}}>
          <div style={{
            backgroundColor: '#eecccc',
            height: 30,
            width: Math.round(d.popularity*100)
          }}/>
        </div>
        <div style={{width: 600}}>
          {d.description}
        </div>
      </div>
    </components.Option>
  );
};
const handleMouseEnter = (evt) => {
  const packId = evt.target.innerText.trim();
  setFocus(packId);
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
        valueElements[i].addEventListener("mouseenter", handleMouseEnter);
      }
  
    }
  }
  render() {
    const {focus, packageColors} = this.props;
    return (
      <AsyncSelect
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