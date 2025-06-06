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

deleteProblem: async (id) => {
  try {
    await axiosInstance.delete(`/problem/delete-problem/${id}`);
    set((state) => ({
      createdProblems: state.createdProblems.filter(problem => problem.id !== id)
    }));
  } catch (error) {
    console.log("Error deleting problem", error);
    toast.error("Error deleting problem");
  } finally {
    set({ isProblemsLoading: false });
  }
},

  getAllProblems: async () => {
    try {
      set({ isProblemsLoading: true });

      const res = await axiosInstance.get("/problem/get-all-problem");
      const solvedProblemsFromRaw = res.data.data.filter(
        (problem) => problem.isSolved
      );
      set({ solvedProblems: solvedProblemsFromRaw });
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
      console.log("Error getting problem", error);
      toast.error("Error in getting problem");
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
  problemAddedInPlaylist: async (
    problemId,
    playlistId,
    playlistName,
    activeTab
  ) => {
    try {
      let keyToSet = "";
      if (activeTab == "created") {
        keyToSet = "createdProblems";
      } else if (activeTab == "solved") {
        keyToSet = "solvedProblems";
      } else {
        keyToSet = "problems";
      }
      set((state) => ({
        [keyToSet]: state.problems.map((problem) => {
          if (problem.id === problemId) {
            return {
              ...problem,
              problemsPlaylists: [
                ...problem.problemsPlaylists,
                {
                  id: crypto.randomUUID(), // temporary ID
                  playListId: playlistId,
                  problemId,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  playlist: {
                    id: playlistId,
                    name: playlistName,
                  },
                },
              ],
            };
          }
          return problem;
        }),
      }));
    } catch (error) {
      console.error("Error updating local problem with new playlist", error);
      toast.error("Error adding problem to playlist");
    }
  },
}));
