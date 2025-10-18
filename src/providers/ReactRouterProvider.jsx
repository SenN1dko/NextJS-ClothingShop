import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const ReactRouterProvider = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

export default ReactRouterProvider;
