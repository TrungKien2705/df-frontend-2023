import './App.css'
import React from "react";
import "./styles/App.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {path} from "./path";
import Book from "./views/Book";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/layout/DefaultLayout";

function App() {
  const route = [
    {
      path:path.HOME,
      element: <DefaultLayout/>,
      children: [
        {
          path: path.HOME,
          element: <Book/>
        },
        {
          path: path.NOTFOUND,
          element: <NotFound/>
        }
      ]
    },
  ]
  return <RouterProvider router={createBrowserRouter(route)} />
}

export default App
