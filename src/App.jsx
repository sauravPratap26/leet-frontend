import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import SignUpPage from "./page/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import Layout from "./layout/Layout";
import { Loader } from "lucide-react";
import AdminRoute from "./component/AdminRoute";
import AddProblem from "./page/AddProblem";
import { Toaster } from "react-hot-toast";
import UserRoute from "./component/UserRoute";
import AllProblems from "./page/AllProblems";

const App = () => {
  const { isCheckingAuth, authUser, checkAuth } = useAuthStore();

  // On first load, check if token exists
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  // While checking auth, show loader
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start">
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
        </Route>

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />

        <Route element={<AdminRoute />}>
          <Route
            path="/add-problem"
            element={authUser ? <AddProblem /> : <Navigate to="/" />}
          />
          {/* <Route
          path ="/get-problems"
          element={authUds}
          /> */}
        </Route>
        <Route element={<UserRoute />}>
          <Route
            path="/all"
            element={authUser ? <AllProblems /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
