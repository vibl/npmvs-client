import React from 'react';
import { components } from 'react-select';


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
export default Option;