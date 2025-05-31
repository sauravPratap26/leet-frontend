import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useProblemStore = create((set) => ({
  problems: [],
  problem: null,
  solvedProblems: [],
  createdProblems: [],
  playListProblems: [],
  isProblemsLoading: false,
  isProblemLoading: false,
  justClosedPopup: false,

  setJustClosedPopup: async (boolValue) => {
    set({ justClosedPopup: boolValue });
  },

  getAllProblems: async () => {
    try {
      set({ isProblemsLoading: true });

      const res = await axiosInstance.get("/problem/get-all-problem");
      set({ problems: res.data.data });
    } catch (error) {
      console.log("Error getting all problems", error);
      toast.error("Error in getting problems");
    } finally {
      set({ isProblemsLoading: false });
    }
  },

  getProblemById: async (id) => {
    try {
      set({ isProblemLoading: true });

      const res = await axiosInstance.get(`/problem/get-problem/${id}`);

      set({ problem: res.data.data });

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error getting all problems", error);
      toast.error("Error in getting problems");
    } finally {
      set({ isProblemLoading: false });
    }
  },

  getSolvedProblemByUser: async () => {
    try {
      set({ isProblemsLoading: true });
      const res = await axiosInstance.get("/problem/get-solved-problems");
      console.log("solved are:", res);
      set({ solvedProblems: res.data.data });
    } catch (error) {
      console.log("Error getting solved problems", error);
      toast.error("Error getting solved problems");
    } finally {
      set({ isProblemsLoading: false });
    }
  },
  getPlaylistProblemsByUser: async () => {
    try {
      set({ isProblemsLoading: true });
      const res = await axiosInstance.get("/problem/get-playlist-problems");
      set({ playListProblems: res.data.data });
    } catch (error) {
      console.log("Error getting playlist problems", error);
      toast.error("Error getting playist problems");
    } finally {
      set({ isProblemsLoading: false });
    }
  },
  getCreatedProblemsByUser: async () => {
    try {
      set({ isProblemsLoading: true });
      const res = await axiosInstance.get("/problem/get-created-problems");
      console.log(res);
      set({ createdProblems: res.data.data });
    } catch (error) {
      console.log("Error getting created problems", error);
      toast.error("Error getting created problems");
    } finally {
      set({ isProblemsLoading: false });
    }
  },
}));
