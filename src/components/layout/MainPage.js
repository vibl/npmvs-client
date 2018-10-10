import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import AppBar from '../appbar/AppBar';
import DashBoard from './DashBoard';
import {updateSelectionFromHistory} from '../../logic/router';
import InfoPages from "../infopage/InfoPages";
import styled from 'react-emotion';
import {localizInit} from "../../util/localiz";
import Footer from "./Footer";

const StyledWrapper = styled.div`
   position: relative; // So that it can be InfoPages context for absolute positioning.
   text-align: center;
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
        <StyledWrapper>
          <DashBoard/>
          <InfoPages/>
        </StyledWrapper>
      <Footer/>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  userHasSeenAppMenu: state.userprefs.hasSeenAppMenu,
});
export default connect(mapStateToProps)(MainPage);
