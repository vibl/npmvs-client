import React, {Component} from 'react';
import {connect} from 'react-redux';
import {css} from 'emotion';
import classNames from 'classnames';
import store from '../../data/store';
import {append, dissoc, not, without} from 'ramda';
import {shallowEqualExplain} from 'shallow-equal-explain';

const {isBlank, transform} = require('../../util/vibl-fp');

const patterns = {
  '3x200+4000' : [[200, 200],[200, 200],[4000,200]],
};
const storeTarget = (target) =>  store.set({[`userprefs:blinkers:${target.id}`]: target});

const setTarget = (id, transformation) => store.set({[`userprefs:blinkers:${id}`]:transformation});

const getTarget = (id) => store.get().userprefs.blinkers && store.get().userprefs.blinkers[id];

const isDisabled = (id) => {
  const target = getTarget(id);
  return target !== undefined && target.disabled;
};
export const disableBlinkerTarget = (id) => {
  setTarget(id, {disabled: true});
};
export const registerBlinkerTarget = (target) => {
  if( isDisabled(target.id) ) return;
  // User can use a predefined pattern or set a custom one.
  if( typeof target.pattern === 'string' ) target.pattern = patterns[target.pattern];
  storeTarget(target);
};
export const registerBlinkerTargets = (configs) => configs.forEach(registerBlinkerTarget);

export class Blinker extends Component {
  state = {
    targets: {},
    blinking: [],
  };
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.targets !== this.props.targets
      || nextState.blinking !== this.state.blinking
      || nextProps.children !== this.props.children;
  }
  // componentDidUpdate(prevProps) {
  //   const currentProps = this.props;
  //   const shallowEqualExplanation = shallowEqualExplain(
  //     prevProps,
  //     currentProps,
  //   );
  //   console.log({ prevProps, currentProps, shallowEqualExplanation });
  // }
  transState = (transformation) => {
    this.setState(transform(transformation));
  };
  loop = (id) => {
    const {pattern} = this.props.targets[id];
    const target = this.state.targets[id];
    const current = target.next;
    const interval = pattern[current.step][current.on];
    // The cursor traverses the pattern nested arrays with depth first. Each step has two intervals,
    // corresponding to 'on:0' and 'on:1'
    const step = ! current.on ? current.step : current.step + 1 < pattern.length ? current.step + 1 : 0;
    const next = {step, on: 1 - current.on};
    const timeout = setTimeout(() => this.loop(id), interval);
    this.transState({
      targets:{
        [id]: {
          on: Boolean(current.on),
          next,
          timeout,
        }
      },
      blinking: current.on ? append(target.className) : without([target.className]),
    });
  };
  startTarget(id) {
    if( this.state.targets[id] ) return;
    const cssRules = getTarget(id).css;
    const className = css(cssRules);
    const target = {
      className,
      next: {
        step: 0,
        on: 0
      }
    };
    this.transState({targets:{[id]: target}});
    // Allow for the state to be updated.
    setTimeout(() => this.loop(id), 100);
  }
  stopTarget(id) {
    const target = this.state.targets[id];
    if( ! target ) return;
    clearTimeout(target.timeout);
    target.on = false;
  };
  componentDidUpdate() {
    const {targets} = this.props;
    if( ! targets ) return;
    for( let id in targets ) {
      const target = targets[id];
      if( target.disabled ) {
        this.stopTarget(id);
      } else {
        this.startTarget(id);
      }
    }
  }
  render(){
    const blinkingTargetsClassNames = classNames(this.state.blinking);
     return (
      <div id='blinker' className={blinkingTargetsClassNames}>
        {this.props.children}
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  targets: state.userprefs.blinkers,
});
export default connect(mapStateToProps)(Blinker);
