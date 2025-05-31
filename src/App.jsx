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
import AllProblemsComponent from "./component/ProblemComponents/AllProblemsComponent";
import ProblemPage from "./page/ProblemPage";
import Playlist from "./page/Playlist";
import ProfilePage from "./page/ProfilePage";
import ForgetPasswordPage from "./page/ForgotPassword";
import ResetPasswordPage from "./page/resetPassword";

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
        <Route path="/" element={<>sps</>} />

        <Route path="/home" element={<Layout />}>
          <Route
            index
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
        </Route>

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/home"} />}
        />

        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/home"} />}
        />
        <Route path="/forgot-password" element={<ForgetPasswordPage />} />

        <Route
          path="/auth/resetPassword/:token"
          element={<ResetPasswordPage />}
        />

        <Route element={<AdminRoute />}>
          {/* <Route
            path="/add-problem"
            element={authUser ? <AddProblem /> : <Navigate to="/" />}
          /> */}
          {/* <Route
          path ="/get-problems"
          element={authUds}
          /> */}
        </Route>
        <Route element={<UserRoute />}>
          <Route
            path="/all-problems"
            element={authUser ? <AllProblemsComponent /> : <Navigate to="/login" />}
          />
          <Route
            path="/playlist-page/:playlistId"
            element={authUser ? <Playlist /> : <Navigate to="/login" />}
          />
          <Route
            path="/problem/:id"
            element={authUser ? <ProblemPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
