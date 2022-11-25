import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { GlobalStyle } from './GlobalStyle';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <>
    <GlobalStyle/>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);
