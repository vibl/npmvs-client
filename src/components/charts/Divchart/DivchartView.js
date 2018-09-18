import React from 'react';
import {pure} from 'recompose';
import styled from 'react-emotion';
import classNames from 'classnames';
import {omit} from 'ramda';
import {toHtmlClass} from '../../../logic/utils';

const widthFromValue = ({value}) => Math.abs(value) + '%';

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
const DataRow = pure( ({label, value, packId, handleMouseEnter, absMin}) => (
    <BarContainer
      className={classNames('data-row', toHtmlClass(packId))}
      onMouseEnter={() => handleMouseEnter(packId)}
    >

      { absMin && <div
        className="negative placeholder"
        style={{minWidth: (value < 0 ? absMin - Math.abs(value) : absMin) + '%'}}/>}
      <Bar className='bar' {...{value}}/>
      <Label className='value'>{label}</Label>
    </BarContainer>
  )
);
const DivchartView = (props) => {
  const {data, handleMouseEnter, className, absMin} = props;
  return (
      <ChartContainer className={classNames(className, 'divchart')}>
        <LabelColumn className='label-column'>
          { data.map( ({packId}) =>
            <FieldLabel
              key={packId}
              className={classNames('label-row', toHtmlClass(packId))}
              onMouseEnter={() => handleMouseEnter(packId)}
            >{packId}</FieldLabel>
          )}
        </LabelColumn>
        <DataColumn>
          { data.map( p => <DataRow key={p.packId} {...omit('data', props)} {...p}/> )}
        </DataColumn>
{/*        <NegativeDataColumn>
          { data.map( ({label, value, packId}) =>
            <BarContainer
              key={packId}
              className={classNames('data-row', toHtmlClass(packId))}
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
              className={classNames('data-row', toHtmlClass(packId))}
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
export default pure(DivchartView);

