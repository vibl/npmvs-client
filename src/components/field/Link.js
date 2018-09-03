import React from 'react';
import Simple from './Simple';

const Link = (props) => {
  const url = Simple(props);
  return <a href={url}>{url}</a>;
};
export default Link;