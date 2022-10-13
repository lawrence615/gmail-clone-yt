import React from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import List from "./mail/List";
import Mail from "./mail/Mail";
import SendMail from "./components/SendMail";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import "./App.css";


function App() {

  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen)

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
      {sendMessageIsOpen && <SendMail />}
    </div>
  );
}

export default App;
