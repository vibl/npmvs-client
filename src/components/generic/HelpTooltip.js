import React, {Component} from 'react';
import {connect} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import store from "../../logic/store";
import {pipe} from 'ramda';

const styles = theme => ({
  lightTooltip: {
    background: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: '0.8rem',
  },
  arrowPopper: {
    '&[x-placement*="bottom"] $arrowArrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.grey[700]} transparent`,
      },
    },
    '&[x-placement*="top"] $arrowArrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${theme.palette.grey[700]} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrowArrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${theme.palette.grey[700]} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrowArrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${theme.palette.grey[700]}`,
      },
    },
  },
  arrowArrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  button: {
    margin: theme.spacing.unit,
  },
});
class HelpTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowRef: null,
    };
    this.setActive(true);
  }

  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  };
  setActive(bool) {
    store.set({session:{helpTooltips:{[this.props.group]: bool}}});
  }
  noMoreHelp = () => {
    this.setActive(false);
  };

  render() {
    const { group, classes, title, helpTooltips, children} = this.props;
    if( ! helpTooltips ) return null;
    const isActive = helpTooltips[group];
    return (
        <Tooltip
          onOpen={this.noMoreHelp}
          {...{open: isActive}}
          title={
            <React.Fragment>
              {title}
              <span className={classes.arrowArrow} ref={this.handleArrowRef} />
            </React.Fragment>
          }
          classes={{ popper: classes.arrowPopper }}
          PopperProps={{
            popperOptions: {
              modifiers: {
                arrow: {
                  enabled: Boolean(this.state.arrowRef),
                  element: this.state.arrowRef,
                }}}}}
        >
          {children}
        </Tooltip>
    );
  }
}
const mapStateToProps = (state) => ({
  helpTooltips: state.session.helpTooltips,
});
export default pipe(
  connect(mapStateToProps),
  withStyles(styles),
)(HelpTooltip);