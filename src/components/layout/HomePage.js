import React from 'react';
import Button from '@material-ui/core/Button'
import {history} from '../../logic/router';

const goTo = (path) => () => history.push(path);

const HomePage = () => (
  <Button onClick={goTo('compare/victory-vs-recharts-vs-react-vis')}>Compare packages</Button>
);
export default HomePage;

