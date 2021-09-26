// import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialAuthState = React.createContext({
  token: null,
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});

export const AuthContext = initialAuthState;
