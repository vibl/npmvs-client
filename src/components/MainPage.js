import React, {PureComponent} from 'react';
import ControlPanel from './control/ControlPanel';
import DashBoard from './DashBoard';
import {updateSelectionFromHistory} from '../logic/router-utils';
import InfoPages from "./infopage/InfoPages";
import styled from 'react-emotion';

const ContWrapper = styled.div`
   position: relative; // So that it can be InfoPages context for absolute positioning.
`;
class MainPage extends PureComponent {
  componentDidMount() {
    updateSelectionFromHistory();
  }
  render() {
    return (
      <div>
        <ControlPanel/>
        <ContWrapper>
          <DashBoard/>
          <InfoPages/>
        </ContWrapper>
      </div>
    )
  }
}
export default MainPage;
