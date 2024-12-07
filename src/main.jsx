import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./i18n/i18n.jsx";
import { store } from "./store/store.jsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
        <App />
        <ToastContainer />
    </Provider>
  </StrictMode>
);
