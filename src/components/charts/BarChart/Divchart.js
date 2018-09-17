import React from 'react';
import {pure} from 'recompose';
import styled from 'react-emotion';
import classNames from 'classnames';

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
    display: flex;
    align-items: center;
    margin-right: 1.8rem;
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
const Dichart = ({data, packages, handleMouseEnter, hasNegativeValues}) => {
  if( data.some( ({value}) => value > 100 ) ) {
    const maxi = Math.max(...data.map( o => o.value ));
    data = data.map( (line) => ({...line, value: line.value/maxi * 100}));
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
          { data.map( ({label, value, packId}) =>
            <BarContainer
              key={packId}
              className={classNames('data-row', packId)}
              onMouseEnter={() => handleMouseEnter(packId)}
            >
              <Bar className='bar' {...{value}}/>
              <Label className='value'>{label}</Label>
            </BarContainer>
          )}
        </DataColumn>
      </ChartContainer>
  )
};
export default pure(Dichart);

