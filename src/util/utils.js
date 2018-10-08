import React from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import classNames from 'classnames/dedupe';
import MixedTupleMap from 'mixedtuplemap';
import shallowEqual from 'fbjs/lib/shallowEqual'
import Color from 'color';
import memoize from './memoize-immutable';
import store from '../data/store';
import {keys, zipObj} from 'ramda';
const {gradient, hsl, isBlank} = require('./vibl-fp');

export const mem = memoize;
export const memGC = fn => memoize(fn, {cache: new MixedTupleMap()});

export const getComponentData = mem(
  (extractFn, ...datapoints) => {
    if( datapoints.some(isBlank) ) return null;
    const packIds = keys(datapoints[0]);
    let packData, packName, acc = {};
    for( packName of packIds ) {
      packData = datapoints.map(o => o[packName]);
      if( packData.some(isBlank) ) return null;
      acc[packName] = extractFn(...packData);
    }
    return acc;
  }
);
export const connectState = (component, selectorFn) => {
  const mapStateToProps = (state, props) => {
    const id = props.chartId;
    let data = state.components[id];
    if( selectorFn) data = getComponentData(selectorFn, data);
    return {
      data,
      selection: state.selection,
      state: state.session.components[id],
      setState: (value) => store.set({session:{components:{[id]: value}}}),
    };
  };
  return connect(mapStateToProps)(component);
};
// Ne marche pas en prendre car les noms sont minifiés !!!
export const connectStatePure = (component, selectorFn) => {
  const pureComponent = pure(component);
  return connectState(pureComponent, selectorFn);
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
export const linearGradient = (color, lighten1 = 0, lighten2 = 0) => {
  color = typeof color === 'string' ? Color(color) : color;
  const color1 = color.lighten(lighten1).hsl().string();
  const color2 = color.lighten(lighten2).hsl().string();
  return `linear-gradient(${color1},${color2})`;
};
export const toHtmlClass = str => str && str.replace ? str.replace(/[^\w\d\-_]/g, '_') : '';

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
  let fieldsIndex = {}, fieldsList = [];
  for(let path in specs) {
    for(let field of specs[path]) {
      fieldsIndex[field.id] = field;
      fieldsList.push(field.id);
    }
  }
  return {fieldsList, fieldsIndex};
};
export const isReactComponent = (obj) => React.Component.isPrototypeOf(obj);

