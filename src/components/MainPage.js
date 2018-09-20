import React, {PureComponent} from 'react';
import ControlPanel from './control/ControlPanel';
import DashBoard from './DashBoard';
import {updateSelectionFromHistory} from '../logic/router-utils';
import InfoPages from "./infopage/InfoPages";

class MainPage extends PureComponent {
  componentDidMount() {
    updateSelectionFromHistory();
  }
  render() {
    return (
      <div>
        <ControlPanel/>
        <DashBoard/>
        {/*<InfoPages/>*/}
      </div>
    )
  }
}
export default MainPage;
