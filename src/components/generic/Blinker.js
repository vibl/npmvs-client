import React, {Component} from 'react';
import styled from 'react-emotion';
import {mem} from '../../logic/utils';
import {dissoc, not} from 'ramda';
const {sleep} = require('../../logic/vibl-utils');
const {isBlank, mapToArray, transform} = require('../../logic/vibl-fp');

let thisBlinker = {};

const getStyle = mem(
  ({target: {rule, selector}, on}) => on && `${selector} { ${rule}; }`,
  {cacheKey: (target, id) => `${id}_${target.on}`}
);
const BlinkerWrapper = styled.div`
  ${({targets}) => {
    if( isBlank(targets)) return null;
    return mapToArray(getStyle, targets)
}}
`;
class Target {
  constructor(config) {
    Object.assign(this, config);
    this.id = new Date() + Math.random();
    this.next = {step: 0, on: 0};
    this.getBlinkerInstance();
    return this;
  }
  toggle(on = not) { // 'on' can be set to true or false. By default, it toogles the existing value.
    thisBlinker.set({targets:{[this.id]:{on}}});
  }
  // cycles are in the form: [[ms, ms], [ms, ms],...] where ms is the the timeout in ms after toggling
  // off (1st element of the sub-arrays, or 'on' (2nd element of the sub-arrays).
  loop = () => {
    const {cycles, next: current} = this;
    this.toggle(Boolean(current.on));
    const interval = cycles[current.step][current.on];
    // The cursor traverses the cycles nested arrays with depth first. Each step has two intervals:
    // 'on:0' and 'on:1'
    const step = ! current.on ? current.step : current.step + 1 < cycles.length ? current.step + 1 : 0;
    this.next = {step, on: 1 - current.on};
    this.timeout = setTimeout(this.loop, interval);
  };
  stop() {
    clearTimeout(this.timeout);
  }
  async getBlinkerInstance() {
    while( ! thisBlinker ) {
      await sleep(100); // Allow for some time for a Blinker to be instantiated.

    }
    this.blinker = thisBlinker;
    this.blinker.set({targets:{[this.id]:{target:this, on: true}}});
    this.loop();
  }
  unregister() {
    this.stop();
    this.blinker.set({targets:dissoc(this.id)});
  }
}
export class Blinker extends Component {
  constructor(props){
    super(props);
    this.state = {
      targets: {},
    };
    thisBlinker = this;
  }
  set(spec) {
    this.setState(transform(spec));
  }
  render(){
    return (
      <BlinkerWrapper {...this.props} {...this.state}>
        {this.props.children}
      </BlinkerWrapper>
    )
  }
}
export const registerBlinkerTarget = (config) => new Target(config);

export const unregisterBlinkerTarget = id => thisBlinker.unregister(id);

export default Blinker;