import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'react-emotion';
import store from '../../data/store';
import {mem} from '../../util/utils';
import {append, dissoc, not} from 'ramda';
const {sleep} = require('../../util/vibl-utils');
const {isBlank, transform} = require('../../util/vibl-fp');

const patterns = {
  '3x200+4000' : [[200, 200],[200, 200],[4000,200]],
};
const getStyle = mem(
  ({rule, selector, on}) => on && `${selector} { ${rule}; }`
  );
const BlinkerWrapper = styled.div`
  ${({targetsState, targetsProps}) => {
    if( isBlank(targetsState)) return null;
    let acc = [];
    for(let id in targetsState) {
      const style = getStyle({...targetsProps[id],...targetsState[id]});
      acc.push(style);      
    }
    return acc;
}}
`;
const storeTarget = (target) =>  store.set({[`session.user.blinkers.${target.id}`]: target});

const transTarget = (id, transformation) =>store.set({[`session.user.blinkers.${id}`]:transformation});

const getTarget = (id) => store.get().session.user.blinkers && store.get().session.user.blinkers[id];

const isDisabled = (id) => {
  const target = getTarget(id);
  return target !== undefined && target.disabled;
};
export const disableBlinkerTarget = (id) => {
  transTarget(id, {disabled: true});
};
export const registerBlinkerTarget = (target) => {
  if( isDisabled(target.id) ) return;
  // User can use a predefined pattern or set a custom one.
  if( typeof target.pattern === 'string' ) target.pattern = patterns[target.pattern];
  // User can chose an id, or the selector will be use as an id.
  if( ! target.id ) target.id = target.selector;
  storeTarget(target);
};
export const registerBlinkerTargets = (configs) => configs.forEach(registerBlinkerTarget);

export class Blinker extends Component {
  state = {
    targets: {},
  };
  transState = (transformation) => {
    this.setState(transform(transformation));
  };
  // setTarget = (id, prop, value) => this.setState({targets:{[id]:{[prop]: value}}});
  //
  // switch = (id, on) => this.setTarget(id, 'on', on);
  loop = (id) => {
    const {pattern} = this.props.targets[id];
    const current = this.state.targets[id] ? this.state.targets[id].next : {step: 0, on: 0};
    const interval = pattern[current.step][current.on];
    // The cursor traverses the pattern nested arrays with depth first. Each step has two intervals,
    // corresponding to 'on:0' and 'on:1'
    const step = ! current.on ? current.step : current.step + 1 < pattern.length ? current.step + 1 : 0;
    const next = {step, on: 1 - current.on};
    const timeout = setTimeout(() => this.loop(id), interval);
    this.transState({targets:{[id]:{
      on: Boolean(current.on),
      next,
      timeout,
    }}});
  };
  stopTarget(id) {
    const target = this.state.targets[id];
    if( ! target ) return;
    clearTimeout(target.timeout);
    target.on = false;
  };
  manageTargets() {
    const {targets} = this.props;
    if( ! targets ) return;
    for( let id in targets ) {
      const target = targets[id];
      if( target.disabled ) {
        this.stopTarget(id);
      } else {
        if( ! this.state.targets[id]) {
          this.loop(id);
        }
      }
    }
  }
  render(){
    this.manageTargets();
    return (
      <BlinkerWrapper {...{targetsProps: this.props.targets, targetsState: this.state.targets}}>
        {this.props.children}
      </BlinkerWrapper>
    )
  }
}
const mapStateToProps = (state) => ({
  targets: state.session.user.blinkers,
});
export default connect(mapStateToProps)(Blinker);
