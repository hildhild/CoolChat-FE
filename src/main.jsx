import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./i18n/i18n.jsx";
import { persistor, store } from "./store/store.jsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
} from "react-router-dom";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Router
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <App />
            <ToastContainer />
          </Router>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
