import React from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import styled from 'react-emotion'
import {isEmpty, keys, pickAll} from 'ramda';

const Container = styled.div`
  display: flex;
`;
const Name = styled.div`
  background-color: blue;
`;
const Description = styled.div`
  background-color: green;
`;

const PackItem = ({pack, packId}) => (
  <Container>
    <Name>
      <a href={pack.homepage.value}>{pack.name.value}</a>
    </Name>
    <Description>
      {pack.description.value}
    </Description>
  </Container>
);

const PackList = ({packages}) => (
  ! packages ? null : keys(packages).map( packId =>
    <PackItem key={packId} packId={packId} pack={packages[packId]}/>
  )
);
const mapStateToProps = (state) => ({
   packages: state.packages,
});
export default connect(mapStateToProps)(PackList);