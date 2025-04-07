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
  is_car_seats_added: boolean
}

interface User {
  user_role: string[];
  is_driver: boolean
  access_token: string;
  id: string;
  phone_number: string;
  email: string;
  fio: string;
  is_car_seats_added: boolean
}

interface InitialState {
  user: User | null;
  isAuthenticated: boolean;
  isDriver: boolean
  isCarSeatsAdded: boolean
}


// This will be dispatched to update the state after getting the token
const getInitialState = (): InitialState => {
  const storedToken = getCookie("access_token");

  if (storedToken) {
    const decryptedToken = decryptToken(storedToken as string) as JWTPayload | null;

    if (decryptedToken) {
      const { id, phone_number, fio, user_role, email, is_driver, is_car_seats_added } = decryptedToken;

      return {
        user: {
          fio,
          id,
          phone_number,
          access_token: storedToken as string,
          user_role,
          is_driver,
          email,
          is_car_seats_added,
        },
        isAuthenticated: true,
        isDriver: is_driver,
        isCarSeatsAdded: is_car_seats_added
      };
    } else {
      console.error("Decryption failed or returned null");
    }
  }

  return {
    user: null,
    isAuthenticated: false,
    isDriver: false,
    isCarSeatsAdded: false
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
      state.isCarSeatsAdded = false;
      deleteCookie("access_token");
    },
    setUserState: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.isDriver = action.payload.isDriver;
      state.isCarSeatsAdded = action.payload.isCarSeatsAdded;
    },
  },
});

export const { loginSuccess, logout, setUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;
