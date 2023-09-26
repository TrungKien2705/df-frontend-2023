import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/App.css';
import reportWebVitals from './reportWebVitals';
import route from "./route.jsx";
import {RouterProvider} from "react-router-dom";
import { ThemeProvider } from './hook/useTheme';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ThemeProvider>
          <RouterProvider router={route}/>
      </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
