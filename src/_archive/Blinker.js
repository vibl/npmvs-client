import React, {Component} from 'react';
import styled from 'react-emotion';
import mem from 'mem';
import {mapObjIndexed, not, pipe, prop} from 'ramda';
import config from './blink-config';
const {objToArray, transform} = require('../logic/vibl-fp');

let targets = {};

const getTransitionStyle = mem( ({on, valueOn, valueOff}, targetId) => {
  {interval, duration, offStyle, onStyle}

  const {selector, property} = config[targetId];
  return  `
    ${selector} {
      ${property}: ${on ? valueOn : valueOff};
    }
  `
});
const getTransitionStyles = pipe(o=>o.targets, objToArray(getTransitionStyle));

const BlinkerWrapper = styled.div`
  ${getTransitionStyles}
`;

export class Blinker extends Component {
  constructor(props){
    super(props);
    this.state = {
      targets: {},
    }
  }
  set(spec) {
    this.setState(transform(spec));
  }
  setTarget(targetId, spec) {
    this.set({targets:{[targetId]: spec}})
  }
  blink = (targetId) => {
    this.setTarget(targetId, {on: not});
  };
  componentDidMount() {
    mapObjIndexed(
      (target, id) => {
        const timer = setInterval(
          () => this.blink(id),
          target.interval,
        );
        this.setTarget(id, {timer});
      },
      targets);
  }
  render(){
    return (
      <BlinkerWrapper {...this.props} {...this.state}>
        {this.props.children};
      </BlinkerWrapper>
    )
  }

};
export const register = (target) => {
  targets[target.id] = target;
};
