import React from 'react';
import styled from 'react-emotion';
import {map, pipe, values} from 'ramda';
import Display from './Display';
import {pipeFn} from '../../logic/field-fns';
const {log, listMax} = require('../../logic/vibl-fp');

const cellHeight = 50;

const Content = styled.div`

`;
const FlexBox = styled.div`
    display: flex;
    flex-direction: column-reverse;
    height: ${cellHeight}px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
`;

const Container = styled.div`
    height: ${cellHeight}px;
    position: relative;
`;
const Bar = styled.div`
    background-color: Moccasin;
    width: 100%;
    height: ${ ({proportion}) => ((proportion || 1) * cellHeight).toString() }px;
`;
const SimpleBar = (props) => {
  const {pack, field} = props;
  const {extractFn, displayFn} = field.meta;
  const compute = fn[extractFn];
  const computed = compute(field.data[pack]);
  const content = fn[displayFn](computed);
  const max = pipe(values, map(compute), listMax)(field.data);
  const proportion = max !== 0 ? computed / max : computed;
  return (
    <Container>
      <Content>
        {content}
      </Content>
      <FlexBox>
        <Bar proportion={proportion}/>
      </FlexBox>
    </Container>
  );
};

export default SimpleBar;