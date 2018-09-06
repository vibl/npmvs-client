import React from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import styled from 'react-emotion'
import mem from 'mem';
import {isEmpty, keys, pickAll} from 'ramda';

const Container = styled.div`
    display: flex;
    background-color: ${ ({hue, saturation, lightness}) => `hsl(${hue},${saturation}%,${lightness}%)`};
`;
const Name = styled.div`

`;
const Description = styled.div`
`;

const PackageItem = ({pack, packId, color}) => {
  
  return (
    <Container {...color}>
      <Name>
        <a href={pack.homepage.value}>{pack.name.value}</a>
      </Name>
      <Description>
        {pack.description.value}
      </Description>
    </Container>
  );
};
const getColors = mem( (color, selection) =>
  selection.map( (val, i) => ({
      ...color,
      hue: color.hues[i] + color.hueOffset,
    })
  )
);

const PackageList = ({packages, color, selection}) => {
  const colors = getColors(color, selection);
  return (
    selection.map( (packId, i) => {
      const pack = packages[packId];
      return pack && <PackageItem key={packId} packId={packId} pack={pack} color={colors[i]}/>
    }
    )
  );
};
const mapStateToProps = (state) => ({
  selection: state.selection,
  packages: state.packages,
  color: state.color,
});
export default connect(mapStateToProps)(PackageList);