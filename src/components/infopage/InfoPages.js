import React, {Component} from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import styled from 'react-emotion';
import {css} from 'emotion';
import shallowEqual from 'fbjs/lib/shallowEqual'
import {toHtmlClass} from '../../util/utils';
import InfoPage from "./InfoPage";
import {registerPopup} from '../util/popup-display-hide';
const {toArray} = require('../../util/vibl-fp');

const displayedInfoPage = (p) => {
  const {focus, visible} = p;
   return ! focus ? null :
     css`
      display: block;

      .infopage.${toHtmlClass(focus)} {
        visibility: ${visible ? 'visible' : 'hidden' } !important;
      }`;
};

const InfoPagesWrapper = styled.div`
  .infopage {
      visibility: hidden; 
  }
  ${displayedInfoPage}
`;
class InfoPages extends Component {
  shouldComponentUpdate(nextProps) {
    return ( nextProps.visible !== this.props.visible )
    || ( nextProps.visible === true && ! shallowEqual(this.props, nextProps) );
  }
  componentDidMount() {
    registerPopup('InfoPage');
  }
  render() {
    const {infoPages, focus, visible} = this.props;
    return ! infoPages ? null : (
      <InfoPagesWrapper {...{focus, visible}}>
        { toArray(infoPages, (data, packName) => (
          <InfoPage
            key={packName}
            {...{packName, data}}
          />
        ))}
      </InfoPagesWrapper>
    )
  }
}
const mapStateToProps = (state) => ({
  infoPages: state.components && state.components.InfoPages,
  focus: state.ui.focus,
  visible: state.ui.displayHide.InfoPage && state.ui.displayHide.InfoPage.visible,
});
export default connect(mapStateToProps)(InfoPages);