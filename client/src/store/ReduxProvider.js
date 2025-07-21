"use client";

import { Provider } from "react-redux";
import { store } from "./index"; // adjust path if different

export default function ReduxProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
