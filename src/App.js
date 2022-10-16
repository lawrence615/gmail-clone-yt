import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import List from "./mail/List";
import Mail from "./mail/Mail";
import SendMail from "./components/SendMail";
import { login, logout, selectUser } from "./features/userSlice";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import "./App.css";
import Login from "./Login";
import { auth, onAuthStateChanged } from "./services/firebase";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);

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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoUrl: user.photoURL,
          })
        );
      } else {
        // User is signed out
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <div className="app__body">
            <Sidebar />
            <React.StrictMode>
              <RouterProvider router={router} />
            </React.StrictMode>
          </div>
          {sendMessageIsOpen && <SendMail />}
        </>
      )}
    </div>
  );
}

export default App;
