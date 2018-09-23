import React from 'react';
import {connect} from 'react-redux';
import AsyncSelect from 'react-select/lib/Async';
import { components } from 'react-select';
import {equals} from 'ramda';
import {getSuggestions} from '../../logic/get-suggestions';
import {displayInfoPage, hideInfoPageAfterTimeout} from '../infopage/infopage-display-hide';
import {selectPackage, deselectPackage} from '../../logic/router-utils';
import {getPackageColors} from "../../logic/utils";
import {setFocus} from '../../logic/focus';
import {registerBlinkerTarget} from "../generic/Blinker";
import store from "../../logic/store";

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
let blinkerTarget, blinkerIsRegistered;

const setBlinker = (isNewbie) => {
  if( isNewbie && ! blinkerIsRegistered ) {
    const vibrateMs = 200;
    const pauseDuration = 3000;
    blinkerTarget = registerBlinkerTarget({
      selector: '.package-selector > div > div:first-child  > div',
      rule: 'box-shadow: inset 0 0 2px 0 #ffffff, 0 0 2px 0 #ffffff !important',
      cycles: [[vibrateMs, vibrateMs],[vibrateMs, vibrateMs],[pauseDuration,vibrateMs]],
    });
    blinkerIsRegistered = true; // We don't want to register more than once. Waiting for the promise is not an option because many blinkers could be created in the meantime.
    // setTimeout( () => , 1000); // Allow for the component to be rendered before starting the blinker.
  }
};

class PackageSelector extends React.Component {
  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
  }
  componentDidMount() {
    this.updateSelection();
    setBlinker(this.props.isNewbie);
  }
  componentDidUpdate() {
    this.updateSelection();
  }
  handleMouseEnterButton = (evt) => {
    const packId = evt.target.innerText.trim();
    if( packId ) {
      displayInfoPage(packId);
      setFocus(packId);
    }
    store.set({session:{isNewbie: false}});
    if( blinkerTarget ) {
      blinkerTarget.unregister();
      blinkerTarget = null;
    }
  };
  handleMouseLeaveButton = (evt) => {
    hideInfoPageAfterTimeout(500);
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
  focus: state.focus,
  selection: state.selection,
  packageColors: getPackageColors(state.color, state.selection),
  isNewbie: state.session.isNewbie,
});

export default connect(mapStateToProps)(PackageSelector);