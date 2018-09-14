import {keys, values} from 'ramda';

export const fieldComponents = {};

export const register = (obj) => {
  const name = keys(obj)[0];
  const component = values(obj)[0];
  return fieldComponents[name] = component;
};

export const removeFromRegister = (name) => delete fieldComponents[name];
