import React from 'react';
import {connect} from 'react-redux';
import { components } from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import {getSuggestions} from '../../../logic/get-suggestions';
import {displayInfoPage, hideInfoPageAfterTimeout} from '../../infopage/infopage-display-hide';
import {selectPackage, deselectPackage} from '../../../logic/router-utils';
import {setFocus} from '../../../logic/focus';
import {disableBlinkerTarget, registerBlinkerTarget} from "../../utils/Blinker";
import styled from 'react-emotion';
import selectorStyles from './selector-styles';
import Option from './Option';
import MultiValueContainer from './MultiValueContainer';
const StyledAsyncSelect = styled(AsyncSelect)`${selectorStyles}`;

const ValueContainer = (props) => {
  return (
      <components.ValueContainer
        {...props}
      />
  );
};
export default MultiValueContainer;

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
    const vibrateMs = 200;
    const pauseDuration = 4000;
    registerBlinkerTarget('SelectorButtons',
      {
        selector: '.package-selector > div > div:first-child  > div',
        rule: 'box-shadow: inset 0 0 2px 0 #ffffff, 0 0 2px 0 #ffffff !important',
        cycles: [[vibrateMs, vibrateMs],[vibrateMs, vibrateMs],[pauseDuration,vibrateMs]],
      });
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
    disableBlinkerTarget('SelectorButtons');
  };
  handleMouseLeave = (evt) => {
  };
  updateSelection() {
    const {selection} = this.props;
    const refSelect = this.selectRef.current;
    // if( refSelect ) {
    //   const selectInstance = refSelect.select.select;
    //   const instanceSelection = selectInstance.state.selectValue.map(o => o.value);
    //   if( ! equals(selection, instanceSelection) ) {
    //     const options = selection.map( packName => ({label: packName, value: packName}));
    //     selectInstance.setValue(options);
    //   }
    //   const valueElements = selectInstance.controlRef.children[0].children;
    //   for (let i = 0; i < valueElements.length; i++) { // Loop needed because this is an HTMLCollection, not an array.
    //     valueElements[i].addEventListener("mouseenter", this.handleMouseEnterButton);
    //     valueElements[i].addEventListener("mouseleave", this.handleMouseLeave);
    //   }
    // }
  }
  render() {
    return (
      <StyledAsyncSelect
        // menuIsOpen={true}
        ref={this.selectRef}
        isMulti
        cacheOptions
        defaultOptions
        openMenuOnClick={false}
        maxMenuHeight={600}
        loadOptions={getSuggestions}
        components={{Option, MultiValueContainer, ValueContainer}}
        className="package-selector"
        classNamePrefix="package-selector"
        {...{onChange}}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  selection: state.selection,
});

export default connect(mapStateToProps)(PackageSelector);