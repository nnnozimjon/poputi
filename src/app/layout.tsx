"use client";

import "@mantine/dates/styles.css";
import "@mantine/core/styles.css";
import '@mantine/carousel/styles.css';
import "./globals.css";

import { MantineProvider } from "@mantine/core";
import { AppHeader } from "@/components/app-header/app-header";
import { AppFooter } from "@/components/app-footer/app-footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/store/store";
import animeCar from "./anime.gif";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate
            loading={
              <div className="w-screen h-screen flex items-center justify-center">
                <img src={animeCar.src} alt="loading" />
              </div>
            }
            persistor={persistor}
          >
            <MantineProvider>
              <QueryClientProvider client={queryClient}>
                <AppHeader />
                <div className="pt-16">{children}</div>
                <AppFooter />
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  newestOnTop={true}
                  pauseOnHover
                />
              </QueryClientProvider>
            </MantineProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
