import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";
import BackWrapper from "../utility/Back";

const UserRoute = () => {
  const { authUser, isCheckingAuth } = useAuthStore();
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  if (!authUser) {
    return <Navigate to="/" />;
  }
  return (
    <BackWrapper to="/" label="Back to Home">
      <Outlet />
    </BackWrapper>
  );
};

export default UserRoute;
