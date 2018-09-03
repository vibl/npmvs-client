import React from 'react';
import {connect} from 'react-redux';
import AsyncSelect from 'react-select/lib/Async';
import { components } from 'react-select';
import {equals, pickAll} from 'ramda';
import {getSuggestions} from '../logic/select-data';
import {selectPackage, deselectPackage} from '../logic/router-utils';

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
        console.log('Selector action was not processed: ', arg);
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
    }
  }
  
  render() {


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
      />
    );
  }
}
const mapStateToProps = pickAll(['selection']);

export default connect(mapStateToProps)(PackageSelector);