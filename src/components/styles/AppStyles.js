import React, {Component} from 'react';
import {connect} from "react-redux";
import {pure} from 'recompose';
import styled from "react-emotion";
import { injectGlobal } from 'emotion';
import shallowEqual from 'fbjs/lib/shallowEqual'
import theme from './theme';
import chartStyles from './focusDynamicStyles';
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
  ${chartStyles}
`;
class AppStyles extends Component {
  shouldComponentUpdate(nextProps) {
    return ! this.props.displayPackId && !shallowEqual(this.props, nextProps)
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
  displayPackId: state.ui.displayPackId,
  focus: state.focus,
  selection: state.selection,
  colors: getPackageColors(state.color, state.selection),
});
export default connect(mapStateToProps)(pure(AppStyles));