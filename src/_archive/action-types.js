const actionsTypes = {
  TRANSFORM: '',
  PATH: '',
};
// DRY: value = key name.
Object.keys(actionsTypes).forEach(prop => actionsTypes[prop] = prop );

export default actionsTypes;
