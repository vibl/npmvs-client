import React from 'react';
import {pure} from 'recompose';
import styled from 'react-emotion';
import classNames from 'classnames';
const {switchValue} = require('../../../logic/vibl-fp');
const widthFromValue = ({value}) => value + '%';

const Bar = styled.div`
    min-width: ${widthFromValue};
    height: 100%;
`;
const Label = styled.div`
    text-align: left;
`;
const BarContainer = styled.div`
    flex: 2;
    margin-right: 1.8rem;
    display: flex;
    align-items: center;
`;

const FieldLabel = styled.div`
    flex: 1;
    text-align: right;
`;
const ChartContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
`;
const LabelColumn = styled.div`
    display: flex;
    flex-direction: column-reverse;
    align-items: stretch;
`;
const DataColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  align-items: stretch;
`;
const getMax = data => Math.max(...data.map( o => o.value ));

const Divchart = ({data, packages, handleMouseEnter}) => {
  data = data.map( d => ({
    ...d,
    label: switchValue([
      [Infinity, '(Not enough data: too recent)'],
      [undefined, null, isNaN, '(No data collected)'],
      d.label], d.value),
    value: switchValue([
      [Infinity, undefined, null, isNaN, 0],
    ], d.value),
  }));
  if( data.some( ({value}) => value > 100 ) ) {
    let max = getMax(data) ;
    data = data.map( (line) => ({...line, value: line.value/max * 100}));
  }
  if( data.some( ({value}) => value < 0 ) ) {
    const values = data.map( o => o.value );
    const maxi = Math.max(...values);
    const mini = Math.min(...values);
    const negMaxi = - mini;
    const span = maxi - mini;
    data = data.map( (line) => ({...line, value: line.value/span * 100}));
    const positiveStyle = {left: negMaxi};
    const negativeStyle = {right: maxi};
  }
  return (
      <ChartContainer className='divchart'>
        <LabelColumn className='label-column'>
          { data.map( ({packId}) =>
            <FieldLabel
              key={packId}
              className={classNames('label-row', packId)}
              onMouseEnter={() => handleMouseEnter(packId)}
            >{packId}</FieldLabel>
          )}
        </LabelColumn>
        <DataColumn>
          { data.map( ({label, value, packId}) => (
            <BarContainer
              key={packId}
              className={classNames('data-row', packId)}
              onMouseEnter={() => handleMouseEnter(packId)}
            >
              <Bar
                className='bar' {...{value}}
                style={{left: value >= 0 ? 'block' : 'none'}}/>
              <Label className='value'>{label}</Label>
            </BarContainer>
            )
          )}
        </DataColumn>
{/*        <NegativeDataColumn>
          { data.map( ({label, value, packId}) =>
            <BarContainer
              key={packId}
              className={classNames('data-row', packId)}
              onMouseEnter={() => handleMouseEnter(packId)}
            >
              <Bar
                className='bar' {...{value}}
                style={{display: value < 0 ? 'block' : 'none'}}/>
            </BarContainer>
          )}
        </NegativeDataColumn>
        <PositiveDataColumn>
          { data.map( ({label, value, packId}) =>
            <BarContainer
              key={packId}
              className={classNames('data-row', packId)}
              onMouseEnter={() => handleMouseEnter(packId)}
            >
              <Bar
                className='bar' {...{value}}
                style={{display: value >= 0 ? 'block' : 'none'}}/>
               <Label className='value'>{label}</Label>
            </BarContainer>
          )}
        </PositiveDataColumn>*/}
      </ChartContainer>
  )
};
export default pure(Divchart);

