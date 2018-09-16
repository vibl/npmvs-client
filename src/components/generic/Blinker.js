import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'react-emotion';
import mem from 'mem';
import {forEachObjIndexed, not, pipe, prop} from 'ramda';
import store from '../../logic/store';
const {transform} = require('../../logic/vibl-fp');

const getTriggeredStyles = ({targets}) => {
  let acc = [];
  for(const selector in targets) {
    const {rule, on} = targets[selector];
    const style = ! on ? null : `${selector} { ${rule}; }`;
    acc.push(style);
  }
  return acc;
};
const BlinkerWrapper = styled.div`
  ${getTriggeredStyles}
`;
export class Blinker extends Component {
  constructor(props){
    super(props);
    this.state = {
      targets: {},
    };
    store.set({blinker: []});
  }
  set(spec) {
    this.setState(transform(spec));
  }
  blink = (selector) => {
    this.set({targets:{[selector]:{on: not}}});
  };
  setTrigger(selector, target) {
    const timer = setInterval(
      () => this.blink(selector),
      target.interval,
    );
    this.set({targets:{[selector]: {timer, ...target}}})
  }
  registerTargets(targets) {
    forEachObjIndexed(
      (target, selector) => {
        if( ! this.state.targets[selector] ) {
          this.setTrigger(selector, target);
        }
      },
      targets);
  }
  render(){
    this.registerTargets(store.get().blinker);
    return (
      <BlinkerWrapper {...this.props} {...this.state}>
        {this.props.children}
      </BlinkerWrapper>
    )
  }
}
const mapStateToProps = (state) => ({
  targets: state.blinker,
});
export default connect(mapStateToProps)(Blinker);