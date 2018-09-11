import React from 'react';
import {connect} from 'react-redux';
import styled from 'react-emotion';
import ControlPanel from './control/ControlPanel';
import DashBoard from './charts/DashBoard';

const Background = styled.div`
  background-color: hsl(40, 20%, 95%);
`;
const ComparisonPage = ({focus, packages}) => (
    <Background>
      <ControlPanel/>
      { packages.map( packId => (
          <div key={packId} style={ ! focus || focus === packId ? {visibility: 'visible'}: {visibility: 'hidden'}}>
            <DashBoard focus={packId}/>
          </div>
        ))}
    </Background>
);
const mapStateToProps = (state) => ({
  packages: state.selection,
  focus: state.focus,
});
export default connect(mapStateToProps)(ComparisonPage);
