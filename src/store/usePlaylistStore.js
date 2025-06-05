import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
export const usePlaylistStore = create((set, get) => ({
  playlists: [],
  roomPlaylists: [],
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

  getRoomPlaylists: async (data) => {
    try {
      set({ isPlaylistsLoading: true });
      const res = await axiosInstance.post("/playlist/room", data);
      set({ roomPlaylists: res.data.data });
    } catch (error) {
      console.log("Error getting all playlists of room", error);
      toast.error("Error in getting playlists of room");
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
      set((state) => {
        if (reqBody?.roomId && reqBody.roomId !== "undefined") {
          return {
            roomPlaylists: [createdPlaylist, ...state.roomPlaylists],
          };
        } else {
          return {
            playlists: [createdPlaylist, ...state.playlists],
          };
        }
      });
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
      const updatedPlaylist = res.data.data;
      const editedPlaylistId = updatedPlaylist.id;

      set((state) => {
        const playlists = [...state.playlists];

        const index = playlists.findIndex((p) => p.id === editedPlaylistId);

        if (index !== -1) {
          playlists.splice(index, 1);
        }

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

        const index = playlists.findIndex((p) => p.id === res.data.data.id);

        if (index !== -1) {
          playlists.splice(index, 1);
        }

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

  getPlaylistQuestions: async (playListId, roomId) => {
    try {
      const id = playListId;
      let res;
      set({ isPlaylistLoading: true });
      if (!roomId) {
        res = await axiosInstance.get(`/playlist/${id}/`);
      } else if (roomId) {
        res = await axiosInstance.get(`/playlist/${id}/${roomId}`);
      }
      set({ playlistQuestions: res.data.data });
    } catch (error) {
      console.log("Error getting playlist question", error);
      toast.error("Error getting playlist question");
    } finally {
      set({ isPlaylistLoading: false });
    }
  },

  deletePlaylistQuestions: async (problemIds) => {
    const { playlist } = get();

    try {
      const reqBody = {
        problemIds,
        playListId: playlist.id,
      };

      set({ isPlaylistLoading: true });

      const res = await axiosInstance.delete("/playlist/remove-problem", {
        data: reqBody,
      });

      set((state) => {
        if (res.data.statusCode == 200) {
          const updatedQuestions = state.playlistQuestions.filter(
            (q) => q.id !== problemIds[0]
          );

          return {
            playlistQuestions: updatedQuestions,
          };
        }
      });
    } catch (error) {
      console.log("Error removing questions from playlist", error);
      toast.error("Error removing questions from playlist");
    } finally {
      set({ isPlaylistLoading: false });
    }
  },
}));
