import React from 'react';
import {pure} from 'recompose';
import classNames from 'classnames';
import {omit} from 'ramda';
import {toHtmlClass} from '../../../util/utils';

const DataRow = pure( ({label, value, packId, handleMouseEnter, absMin}) => {
  const placeholderValue = value < 0 ? absMin - Math.abs(value) : absMin;
  return (
      <div
        className={classNames('data row', toHtmlClass(packId))}
        onMouseEnter={() => handleMouseEnter(packId)}
      >
        { absMin && <div
          className="negative placeholder"
          value={placeholderValue}
          style={{minWidth: placeholderValue + '%'}}/>}
        <div
          style={{minWidth: Math.abs(value) + '%'}}
          className='bar'
          {...{value}}
        />
        <div className='value'>{label}</div>
      </div>
    )
});
const DivchartView = (props) => {
  const {data, handleMouseEnter, className, absMin} = props;
  return (
      <div className={classNames(className, 'divchart')}>
        <div className='label column'>
          { data.map( ({packId}) =>
            <div
              key={packId}
              className={classNames('label row', toHtmlClass(packId))}
              onMouseEnter={() => handleMouseEnter(packId)}
            >{packId}</div>
          )}
        </div>
        <div className='data column'>
          { data.map( p => <DataRow key={p.packId} {...omit('data', props)} {...p}/> )}
        </div>
      </div>
  )
};
export default pure(DivchartView);

