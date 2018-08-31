import actionsT from './action-types';

function createAction(prop) {
  return payload => ({
    type: prop,
    payload
  });
}
const actions = Object.assign({}, actionsT);
// Preserves auto-completion in IDE.
Object.keys(actions).forEach( prop => actions[prop] = createAction(prop) );

export default actions;
