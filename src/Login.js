import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";

import { auth, provider, signInWithPopup } from "./services/firebase";
import { login } from "./features/userSlice";
import "./Login.css";
import { GoogleAuthProvider } from "firebase/auth";

function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoUrl: user.photoURL,
          })
        );
      })
      .catch((error) => {
        /** Handle Errors here. */
        // const errorCode = error.code;
        // const errorMessage = error.message;
        /** The email of the user's account used. */
        // const email = error.customData.email;
        /** The AuthCredential type that was used. */
        // const credential = GoogleAuthProvider.credentialFromError(error);
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://static.dezeen.com/uploads/2020/10/gmail-google-logo-rebrand-workspace-design_dezeen_2364_col_0.jpg"
          alt=""
        />
        <Button variant="contained" color="primary" onClick={signIn}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
