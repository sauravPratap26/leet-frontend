import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,
  avatar: null,
  userTags: [],

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/get");
      set({ authUser: res.data.data.user });
      set({ avatar: res.data.data.user.avatar });
    } catch (error) {
      console.log("❌ Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);

      set({ authUser: res.data.user });

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error signing up", error);
      toast.error("Error signing up");
    } finally {
      set({ isSigninUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      const response = res.data;
      set({ authUser: response.data });
      set({ avatar: res.data.data.avatar });
      set({ userTags: res.data.data.tags });
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error logging in", error);
      toast.error("Error logging in");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout successful");
    } catch (error) {
      console.log("Error logging out", error);
      toast.error("Error logging out");
    }
  },

  updateAvatar: async (avatar) => {
    try {
      const res = await axiosInstance.post("/profile/change-avatar", {
        avatar,
      });
      set({ avatar: res.data.data.avatar });
      toast.success("Avatar updated");
    } catch (error) {
      console.log("Error changing avatar", error);
      toast.error("Error changing avatar");
    }
  },

  updatePassword: async (data) => {
    try {
      const res = await axiosInstance.post("/profile/change-password", data);
      if (res.data.statusCode == 200) {
        toast.success("Password updated");
      }
    } catch (error) {
      console.log("Error updating password", error);
      toast.error("Error updating password");
    }
  },

  updateTags: async (data) => {
    try {
      const res = await axiosInstance.post("/profile/update-tags", {
        newTags: data,
      });
      if (res.data.statusCode == 200) {
        toast.success("tags updated");
        set({ userTags: res.data.data.tags });
      }
    } catch (error) {
      console.log("Error updating tags", error);
      toast.error("Error updating tags");
    }
  },
  forgotPassword: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/forget-password", {
        email: data,
      });
      if (res.data.statusCode == 200) {
        toast.success("Reset Mail Sent");
      }
    } catch (error) {
      console.log("Error resetting password", error);
      toast.error("Error resetting password");
    }
  },

  resetPassword: async (token, password, navigate) => {
    try {
      const res = await axiosInstance.post(`/auth/resetPassword/${token}`, {
        password,
      });
      if (res.data.statusCode == 200) {
        navigate("/login");
        toast.success("Password reset successfully");
      }
    } catch (error) {
      console.log("Error updating password", error);
      toast.error("Error updating password");
    }
  },
}));
