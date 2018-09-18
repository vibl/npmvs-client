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
const Divchart = ({data, packages, handleMouseEnter, className, positiveStyle, negativeStyle}) => {
  return (
      <ChartContainer className={classNames(className, 'divchart')}>
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
                className='bar'
                {...{value}}
                style={value >= 0 ? positiveStyle : negativeStyle}/>
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

