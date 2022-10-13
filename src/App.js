import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import List from "./mail/List";
import Mail from "./mail/Mail";
import "./App.css";
import SendMail from "./components/SendMail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <List />,
    },
    {
      path: "/mail",
      element: <Mail />,
    },
  ]);

  return (
    <div className="app">
      <Header />
      <div className="app__body">
        <Sidebar />
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </div>
      <SendMail />
    </div>
  );
}

export default App;
