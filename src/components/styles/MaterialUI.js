import React, { Component } from 'react';
import { createGenerateClassName, jssPreset, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import theme from "./theme";

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: document.getElementById('jss-insertion-point'),
});

const MaterialUI = ({children}) => (
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      {children}
    </MuiThemeProvider>
  </JssProvider>
);
export default MaterialUI;
