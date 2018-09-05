import React from 'react';
import {connect} from 'react-redux';
import {set} from '../logic/store';
import {getPackages} from './table-data';
import {trim} from 'lib/vibl/ramda';

set('inputValue', 'victory');

const Input = ({inputValue}) => {
  const handleChange = (event) => set('inputValue', event.target.value);
  const onSubmit = () => {
    const inputArray = inputValue.split(',').map(trim);
    getPackages(inputArray);
  };
  return (
   <div>
      <input
        value={inputValue}
        onChange={handleChange}
      />
      <button onClick={onSubmit}>Compare</button>
   </div>
  )
};
const mapStateToProps = (state) => ({
  inputValue: state.inputValue,
});
export default connect(mapStateToProps)(Input);
