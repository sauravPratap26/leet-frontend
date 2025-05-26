import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
export const usePlaylistStore = create((set) => ({
  playlists: [],
  playlist: null,
  isPlaylistLoading: false,
  isPlaylistsLoading: false,
  playlistQuestions: [],

  selectPlaylist: async (playlist) => {
    try {
      set({ playlist });
    } catch (error) {
      console.log("error selecting playlist", error);
    }
  },

  getAllPlaylist: async () => {
    try {
      set({ isPlaylistsLoading: true });
      const res = await axiosInstance.get("/playlist/");
      set({ playlists: res.data.data });
    } catch (error) {
      console.log("Error getting all playlists", error);
      toast.error("Error in getting playlists");
    } finally {
      set({ isPlaylistsLoading: false });
    }
  },

  addPlaylist: async (reqBody) => {
    try {
      set({ isPlaylistsLoading: true });
      const res = await axiosInstance.post(
        "/playlist/create-playlist",
        reqBody
      );
      const createdPlaylist = res.data.data;
      set((state) => ({
        playlists: [createdPlaylist, ...state.playlists],
      }));

    } catch (error) {
      console.log("Error creating playlist", error);
      toast.error("Error creating playlist");
    } finally {
      set({ isPlaylistsLoading: false });
    }
  },

  editPlaylistDetails: async (reqBody) => {
    try {
      const res = await axiosInstance.post("/playlist/edit-playlist", reqBody);
      const updatedPlaylist = res.data.data; // assuming updated playlist is returned here
      const editedPlaylistId = updatedPlaylist.id;

      set((state) => {
        const playlists = [...state.playlists];

        // Find the index of the edited playlist
        const index = playlists.findIndex((p) => p.id === editedPlaylistId);

        if (index !== -1) {
          // Remove the old playlist
          playlists.splice(index, 1);
        }

        // Add the updated playlist at the beginning
        return {
          playlists: [updatedPlaylist, ...playlists],
        };
      });

      toast.success("Playlist updated!");
    } catch (error) {
      console.log("Error editing playlist details", error);
      toast.error("Error editing playlist details");
    } finally {
      set({ playlist: null });
    }
  },

  deletePlaylist: async (reqBody) => {
    try {
      const res = await axiosInstance.delete("/playlist/delete", {
        data: reqBody,
      });
      set((state) => {
        const playlists = [...state.playlists];

        // Find the index of the edited playlist
        const index = playlists.findIndex((p) => p.id === res.data.data.id);

        if (index !== -1) {
          // Remove the old playlist
          playlists.splice(index, 1);
        }

        // Add the updated playlist at the beginning
        return {
          playlists: [...playlists],
        };
      });
    } catch (error) {
      console.log("Error deleting playlist", error);
      toast.error("Error deleting playlist");
    } finally {
      set({ playlist: null });
    }
  },

  addProblemToPlaylist: async (reqBody) => {
    try {
      await axiosInstance.post("/playlist/add-problem", reqBody);
      toast.success("Problem added");
    } catch (error) {
      console.log("Error adding question to playlist", error);
      toast.error("Error adding question to playlist");
    }
  },

  getPlaylistQuestions: async (playListId) => {
    try {
      const id = playListId;
      set({ isPlaylistLoading: true });
      const res = await axiosInstance.get(`/playlist/${id}`);
      set({ playlistQuestions: res.data.data });
    } catch (error) {
      console.log("Error adding question to playlist", error);
      toast.error("Error adding question to playlist");
    } finally {
      set({ isPlaylistLoading: false });
    }
  },
}));
