"use client";

import { createSlice } from '@reduxjs/toolkit';
import { getCookie, setCookie } from 'cookies-next';



// Get initial city value from cookies or set default value

let initialCity = getCookie('city');

if (!initialCity) {
    initialCity = 'Душанбе';
    setCookie('city', initialCity);
}

const initialState = {
    city: initialCity,
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setCity: (state, action) => {
            state.city = action.payload; // Set the city state to the payload value
            setCookie('city', state.city)
        },
    },
});

export const { setCity } = locationSlice.actions;

export const locationReducer = locationSlice.reducer;
