import React from 'react';
import { components } from 'react-select';

const MultiValueContainer = (props) => {
  return (
    <div onMouseEnter={()=> {}}>
    <components.MultiValueContainer
      {...props}
    />
    </div>
  );
};
export default MultiValueContainer;