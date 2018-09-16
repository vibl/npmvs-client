import React, {Component} from 'react';
import styled from 'react-emotion';
import mem from 'mem';
import {dissoc, not} from 'ramda';
const {mapToArray, transform} = require('../../logic/vibl-fp');

let singleton = {};

const getStyle = mem(
  ({rule, selector, on}) => on && `${selector} { ${rule}; }`,
  {cacheKey: (target, id) => `${id}_${target.on}`}
);

const BlinkerWrapper = styled.div`
  ${({targets}) => mapToArray(getStyle, targets)}
`;
export class Blinker extends Component {
  constructor(props){
    super(props);
    this.state = {
      targets: {},
    };
    singleton = this;
  }
  set(spec) {
    this.setState(transform(spec));
  }
  blink = (selector) => {
    this.set({targets:{[selector]:{on: not}}});
  };
  register(target) {
    const {selector, rule, interval} = target;
    const id = setInterval(
      () => this.blink(id),
      interval,
    );
    this.blink(id);
    this.set({targets:{[id]: {selector, rule, interval}}});
    return id;
  }
  unregister(id) {
    clearInterval(id);
    this.set({targets:dissoc(id)});
  }
  render(){
    return (
      <BlinkerWrapper {...this.props} {...this.state}>
        {this.props.children}
      </BlinkerWrapper>
    )
  }
}
export const registerBlinkerTarget = (target) => setTimeout( () => singleton.register(target), 1000);
export const unRegisterBlinkerTarget = singleton.unregister;

export default Blinker;