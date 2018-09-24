import React from 'react';
import {connect} from 'react-redux';
import {createSelectorCreator} from 'reselect';
import {pure} from 'recompose';
import classNames from 'classnames/dedupe';
import MixedTupleMap from 'mixedtuplemap';
import shallowEqual from 'fbjs/lib/shallowEqual'
import memoize from '../lib/memoize-immutable';
import store from './store';
import {keys, zipObj} from 'ramda';
const {gradient, hsl, isBlank} = require('./vibl-fp');

export const mem = memoize;
export const memGC = fn => memoize(fn, {cache: new MixedTupleMap()});

export const getData = mem(
  (extractFn, ...datapoints) => {
    if( datapoints.some(isBlank) ) return null;
    const packIds = keys(datapoints[0]);
    let packData, packId, acc = {};
    for( packId of packIds ) {
      packData = datapoints.map(o => o[packId]);
      if( packData.some(isBlank) ) return null;
      acc[packId] = extractFn(...packData);
    }
    return acc;
  }
);
export const connectState = (component, name, selectorFn) => {
  const mapStateToProps = (state) => {
    let data = state.data[name];
    if( selectorFn) data = getData(selectorFn, data);
    return {
      data,
      selection: state.selection,
      state: state.session.components[name],
      setState: (value) => store.set({session:{components:{[name]: value}}}),
    };
  };
  return connect(mapStateToProps)(component);
};
// Ne marche pas en prendre car les noms sont minifiés !!!
export const connectStatePure = (component, name, selectorFn) => {
  const pureComponent = pure(component);
  return connectState(pureComponent, name, selectorFn);
};
const darken = (lightness) => lightness * 0.6;

export const getPackageColors = mem( (colorObj, selection) => {
  const {hues, hue: hueOffset, saturation, lightness} = colorObj;
  return zipObj(selection, selection.map( (val, i) => {
    const hue = hues[i] + hueOffset;
    const baseColor = hsl(hue, saturation, lightness);
    const colorDarker = hsl(hue, saturation, darken(lightness));
    const lightGradient = gradient(baseColor, hsl(hue, saturation, lightness - 10));
    return {...colorObj, hue, baseColor, colorDarker, lightGradient};
  }));
  }
);
export const toHtmlClass = str => str && str.replace ? str.replace(/[^\w\d\-_]/g, '_') : '';

export const createSelector = createSelectorCreator(mem);

export function monitorShouldComponentUpdateOnlyProps(nextProps, nextState) {
  if (!shallowEqual(this.props, nextProps)) {
    for (const key in this.props) {
      if (nextProps[key] !== this.props[key]) {
        console.log('props changed:',this.constructor.name, key, this.props[key], nextProps[key]);
      }
    }
    console.log('Updating component: ', this.constructor.name);
    return true;
  } else {
    return false;
  }
}
export function monitorShouldComponentUpdateWithState(nextProps, nextState) {
  if (!shallowEqual(this.props, nextProps) || ! shallowEqual(this.state, nextState) ) {
    for (const key in nextProps) {
      if (nextProps[key] !== this.props[key]) {
        console.log('Props changed:', this.constructor.name, key, this.props[key], nextProps[key]);
      }
    }
    for (const key in nextState) {
      if (nextState[key] !== this.state[key]) {
        console.log('Props changed:', this.constructor.name, key, this.state[key], nextState[key]);
      }
    }
    console.log('Updating component:', this.constructor.name);
    return true;
  } else {
    return false;
  }
}
export const cn = (...args) => {
  const clean = args.map(toHtmlClass);
  return classNames(...clean);
};
export const getFieldsFromSpecs = (specs) => {
  let acc = {};
  for(const path in specs) {
    acc = {...acc, ...specs[path]};
  }
  return acc;
};
export const isReactComponent = (obj) => React.Component.isPrototypeOf(obj);
