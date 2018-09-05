import React from 'react';
import Display from './Display';

const Link = (props) => {
  const url = Display(props);
  return <a href={url}>{url}</a>;
};
export default Link;