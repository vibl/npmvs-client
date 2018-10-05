import React, {Component} from 'react';
import {connect} from "react-redux";
import {pure} from 'recompose';
import styled from "react-emotion";
import { injectGlobal } from 'emotion';
import shallowEqual from 'fbjs/lib/shallowEqual'
import theme from './theme';
import focusDynamicStyles from './focusDynamicStyles';
import {getPackageColors} from "../../util/utils";

injectGlobal`
  html {
    font-family: Roboto, sans-serif;
    font-size: 16px;
    background-color: ${theme.pageBackgroundColor};
  }
`;
const StyledAppContainer = styled.div`
  background-color: #f7f1f1;
  color: #444;
  ${focusDynamicStyles}
`;
class AppStyles extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.focus && !shallowEqual(this.props, nextProps)
  }
  render() {
    const {focus, selection, colors, children} = this.props;
    return (
      <StyledAppContainer {...{focus, selection, colors}}>
        {children}
      </StyledAppContainer>
    )
  }
};
const mapStateToProps = (state) => ({
  focus: state.ui.focus,
  selection: state.selection,
  colors: getPackageColors(state.color, state.selection),
});
export default connect(mapStateToProps)(pure(AppStyles));