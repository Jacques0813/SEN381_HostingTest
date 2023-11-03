import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./forms/Login.tsx";
import Client from "./forms/Client.tsx";
import CallCentre from "./forms/CallCentre.tsx";
import Technician from "./forms/Technician.tsx";
import ErrorPage from "./forms/ErrorPage.tsx";
import Register from "./forms/Register.tsx";
import { AuthProvider, useAuth } from "./context.tsx";
import AdminNew from "./forms/AdminNew.tsx";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/client" element={<Client />} />
//         <Route path="/admin" element={<ClientD id={3} />} />
//         <Route path="/callcentre" element={<CallCentre />} />
//         <Route path="/technician" element={<Technician />} />
//         <Route path="/test" element={<TestingDB />} />
//         <Route path="/service" element={<ServiceD />} />
//         <Route path="*" element={<ErrorPage />} />
//       </Routes>
//     </Router>
//   </React.StrictMode>
// );

function checkAuthentication() {
  const authToken = localStorage.getItem("authToken");
  return authToken !== null; // Return true if the token exists, indicating authentication
}

function App() {
  const { authenticated, login } = useAuth();
  const [adminAuth, setAdminAuth] = useState(false);
  const [callAuth, setCallAuth] = useState(false);
  const [techAuth, setTechAuth] = useState(false);
  const [clientAuth, setClientAuth] = useState(false);
  const [currLink, setCurrLink] = useState("/");
  const [type, setType] = useState("");
  const [id, setId] = useState(0);

  // localStorage.setItem("authToken", "test");

  function AuthenticatePages() {
    const authToken = localStorage.getItem("authToken");

    if (
      authToken === "Service Department" ||
      authToken === "Client Department" ||
      authToken === "Contract Department"
    ) {
      setAdminAuth(true);
      setCurrLink("/admin");
    } else if (authToken === "Call Centre") {
      setCallAuth(true);
      setCurrLink("/callcentre");
    } else if (authToken === "Technician") {
      setTechAuth(true);
      setCurrLink("/technician");
    } else if (authToken === "Client") {
      setClientAuth(true);
      setCurrLink("/client");
    }

    setId(parseInt(localStorage.getItem("Id") as string));
    setType(authToken as string);
    login();
  }

  useEffect(() => {
    const isAuthenticated = checkAuthentication();

    if (isAuthenticated) {
      AuthenticatePages();
      // window.location.reload();
    }
  }, [login]);

  // Check for authentication before rendering the App component
  if (!authenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ErrorPage currLink={currLink} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/client"
          element={clientAuth ? <Client /> : <Navigate to="/err" />}
        />
        <Route
          path="/admin"
          element={
            adminAuth ? (
              <AdminNew id={id} type={type} />
            ) : (
              <Navigate to="/err" />
            )
          }
        />
        <Route
          path="/callcentre"
          element={callAuth ? <CallCentre /> : <Navigate to="/err" />}
        />
        <Route
          path="/technician"
          element={techAuth ? <Technician /> : <Navigate to="/err" />}
        />
        {/* <Route
          path="/test"
          element={authenticated ? <TestingDB /> : <Navigate to="/" />}
        /> */}
        {/* <Route
          path="/service"
          element={authenticated ? <ServiceD /> : <Navigate to="/" />}
        /> */}
        <Route path="*" element={<ErrorPage currLink={currLink} />} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
