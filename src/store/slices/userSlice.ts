import { createSlice } from "@reduxjs/toolkit";
import { decryptToken } from "../../utils";
import { deleteCookie, getCookie } from "cookies-next";

// Define the JWT payload structure
interface JWTPayload {
  id: string;
  phone_number: string;
  fio: string;
  user_role: string[];
  is_driver: boolean
  email: string;
}

interface User {
  user_role: string[];
  is_driver: boolean
  access_token: string;
  id: string;
  phone_number: string;
  email: string;
  fio: string;
}

interface InitialState {
  user: User | null;
  isAuthenticated: boolean;
  isDriver: boolean
}


// This will be dispatched to update the state after getting the token
const getInitialState = (): InitialState => {
  const storedToken = getCookie("access_token");

  if (storedToken) {
    const decryptedToken = decryptToken(storedToken as string) as JWTPayload | null;

    if (decryptedToken) {
      const { id, phone_number, fio, user_role, email, is_driver } = decryptedToken;

      return {
        user: {
          fio,
          id,
          phone_number,
          access_token: storedToken as string,
          user_role,
          is_driver,
          email,
        },
        isAuthenticated: true,
        isDriver: is_driver
      };
    } else {
      console.error("Decryption failed or returned null");
    }
  }

  return {
    user: null,
    isAuthenticated: false,
    isDriver: false
  };
};

const initialState = getInitialState();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      deleteCookie("access_token");
    },
    setUserState: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

export const { loginSuccess, logout, setUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;
