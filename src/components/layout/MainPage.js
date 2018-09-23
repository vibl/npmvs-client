import React, {PureComponent} from 'react';
import AppBar from '../toolbar/AppBar';
import DashBoard from './DashBoard';
import {updateSelectionFromHistory} from '../../logic/router-utils';
import InfoPages from "../infopage/InfoPages";
import styled from 'react-emotion';
import {localizInit} from "../../logic/localiz";
import Footer from "./Footer";

const ContWrapper = styled.div`
   position: relative; // So that it can be InfoPages context for absolute positioning.
`;
class MainPage extends PureComponent {
  componentDidMount() {
    updateSelectionFromHistory();
    localizInit(this); // We need it here so that the store as been retrieved by reat-persist.
  }
  render() {
    return (
      <div>
        <AppBar/>
        <ContWrapper>
          <DashBoard/>
          <InfoPages/>
        </ContWrapper>
      <Footer/>
      </div>
    )
  }
}
export default MainPage;