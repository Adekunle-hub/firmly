
"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import InitialSessionLoader from "./InitialSessionLoader";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <InitialSessionLoader>{children}</InitialSessionLoader>
    </Provider>
  );
}
