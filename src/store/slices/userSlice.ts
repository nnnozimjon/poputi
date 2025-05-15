import { createSlice } from "@reduxjs/toolkit";
import { decryptToken } from "../../utils";
import { deleteCookie, getCookie } from "cookies-next";

// Define the JWT payload structure
interface JWTPayload {
  id: string;
  phone_number: string;
  is_driver: boolean;
  street_address: string;
  avatar_image: string;
  fullname: string;
}

interface User {
  is_driver: boolean;
  id: string;
  phone_number: string;
  avatar_image: string;
  street_address: string;
  fullname: string;
}

interface InitialState {
  user: User | null;
  isAuthenticated: boolean;
  isDriver: boolean;
}

// This will be dispatched to update the state after getting the token
const getInitialState = (): InitialState => {
  const storedToken = getCookie("access_token");

  if (storedToken) {
    const decryptedToken = decryptToken(
      storedToken as string
    ) as JWTPayload | null;

    if (decryptedToken) {
      const { id, phone_number, is_driver, avatar_image, fullname, street_address } =
        decryptedToken;

      return {
        user: {
          id,
          phone_number,
          is_driver,
          avatar_image,
          fullname,
          street_address
        },
        isAuthenticated: true,
        isDriver: is_driver,
      };
    } else {
      console.error("Decryption failed or returned null");
    }
  }

  return {
    user: null,
    isAuthenticated: false,
    isDriver: false,
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
      state.isDriver = false;
      deleteCookie("access_token");
    },
    setUserState: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.isDriver = action.payload.isDriver;
    },
  },
});

export const { loginSuccess, logout, setUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;
