import React from 'react';
import {pure} from 'recompose';
import styled from "react-emotion";
import {css} from 'emotion';
import { injectGlobal } from 'emotion';
import theme from './theme';
import chartStyles from './focusDynamicStyles';
import {getPackageColors} from "../../logic/utils";
import {connect} from "react-redux";

injectGlobal`
  html {
     font-size: 16px;
     line-height: 23px;
     background-color: ${theme.pageBackgroundColor};
  }
`;
const StyledAppContainer = styled.div`
  background-color: #f7f1f1;
  font-family: Roboto;
  ${chartStyles}
`;
const AppStyles = ({focus, selection, colors, children}) => {
  return (
    <StyledAppContainer {...{focus, selection, colors}}>
      {children}
    </StyledAppContainer>
  )
};
const mapStateToProps = (state) => ({
  focus: state.focus,
  selection: state.selection,
  colors: getPackageColors(state.color, state.selection),
});
export default connect(mapStateToProps)(pure(AppStyles));