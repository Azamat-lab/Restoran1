
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Dashboard2 from "./pages/Dashboard2.jsx";
import Message from "./pages/Message.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MessageProvider } from "./context/MessageContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";
import Qongiroq from "./pages/Qongiroq.jsx";
import Settingss from "./pages/Settingss.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "dashboard2", element: <Dashboard2 /> },
      { path: "message", element: <Message /> },
      { path: "qongiroq", element: <Qongiroq /> },
      { path: "settings", element: <Settingss /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MessageProvider>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </MessageProvider>
  </StrictMode>
);
