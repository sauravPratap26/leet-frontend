import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useRoomsStore = create((set, get) => ({
  roomMember: null,
  userRooms: [],
  userCreatedRooms: [],
  loadingRooms: false,
  roomMembers: [],

  getRoomDetail: (roomId) => {
    const roomDetail = get().userRooms.find(
      (roomMember) => roomMember.roomId === roomId
    );
    return roomDetail?.room || null;
  },
  checkUserRoom: async () => {
    set({ loadingRooms: true });
    try {
      const res = await axiosInstance.get("/rooms/get-user-room");
      const roomMemberships = res.data.data.RoomMember || [];
      set({ userRooms: roomMemberships });
      toast.success("User rooms fetched");
    } catch (error) {
      console.log("❌ Error getting Room:", error);
      set({ userRooms: [] });
    } finally {
      set({ loadingRooms: false });
    }
  },

  checkUserCreatedRooms: async () => {
    set({ loadingRooms: true });
    try {
      const res = await axiosInstance.get("/rooms/get-created-rooms");
      const createdRooms = res.data.data;
      set({ userCreatedRooms: createdRooms });
    } catch (error) {
      console.log("❌ Error getting createdRooms:", error);
      toast.error("Failed to fetch created rooms.");
    } finally {
      set({ loadingRooms: false });
    }
  },

  createRoom: async (body) => {
    set({ loadingRooms: true });
    try {
      const res = await axiosInstance.post("/rooms/create-room", body);
      const createdRoom = res.data.data;

      // Correctly update userRooms using previous state
      set((state) => ({
        userCreatedRooms: [...(state.userCreatedRooms || []), createdRoom],
      }));

      toast.success("Room created successfully!");
    } catch (error) {
      console.error("❌ Error creating room:", error);
      toast.error("Failed to create room.");
    } finally {
      set({ loadingRooms: false });
    }
  },
  deleteRoom: async (data) => {
    try {
      set({ loadingRooms: true });
      await axiosInstance.delete("/rooms/delete-room", {
        data: data,
      });
      set((state) => ({
        userCreatedRooms: state.userCreatedRooms.filter(
          (r) => r.id !== data.id
        ),
        userRooms: state.userRooms.filter((r) => r.roomId !== data.id),
      }));
      toast.success("Room deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete room");
    } finally {
      set({ loadingRooms: false });
    }
  },

  regenerateRoomCode: async (data) => {
    try {
      set({ loadingRooms: true });
      const res = await axiosInstance.post(`/rooms/generate-room-code`, data);
      set((state) => ({
        userCreatedRooms: state.userCreatedRooms.map((room) =>
          room.id === res.data.data.id
            ? { ...room, code: res.data.data.code }
            : room
        ),
      }));
      toast.success("Code regenerated");
    } catch (error) {
      console.log(error);
      toast.error("Failed to regenerate code");
    } finally {
      set({ loadingRooms: false });
    }
  },

  updateRoom: async (data) => {
    try {
      set({ loadingRooms: true });
      const res = await axiosInstance.post(`/rooms/update-room`, data);
      data = res.data.data;
      console.log(data);
      set((state) => ({
        userCreatedRooms: state.userCreatedRooms.map((room) =>
          room.id === data.id ? { ...room, ...data } : room
        ),
      }));
      toast.success("Room updated");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update room");
    } finally {
      set({ loadingRooms: false });
    }
  },

  joinRoomUsingCode: async (code) => {
    try {
      set({ loadingRooms: true });
      const res = await axiosInstance.post("/rooms/join-room-code", { code });
      const newMember = res.data.data;

      set((state) => {
        const alreadyExists = state.userRooms.some(
          (member) => member.id === newMember.id
        );

        return {
          userRooms: alreadyExists
            ? state.userRooms.map((member) =>
                member.id === newMember.id
                  ? { ...member, ...newMember }
                  : member
              )
            : [...state.userRooms, newMember],
        };
      });

      toast.success("Joined room successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to join room");
    } finally {
      set({ loadingRooms: false });
    }
  },

  getRoomMemberDetails: async (data) => {
    try {
      set({ loadingRooms: true });
      const res = await axiosInstance.get(`/rooms/get-room-member/${data}`);
      set({ roomMember: res.data.data });
    } catch (error) {
      console.log(error);
      toast.error("Failed to get Member Details");
    } finally {
      set({ loadingRooms: false });
    }
  },

  openCloseRoom: async (data) => {
    try {
      set({ loadingRooms: true });
      const res = await axiosInstance.post("/rooms/update-room-settings", data);
      const updatedRoom = res.data.data;

      set((state) => ({
        userCreatedRooms: state.userCreatedRooms.map((room) =>
          room.id === updatedRoom.id
            ? { ...room, isOpen: updatedRoom.isOpen }
            : room
        ),
      }));

      toast.success(`Room is now ${updatedRoom.isOpen ? "open" : "closed"}`);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update room settings");
    } finally {
      set({ loadingRooms: false });
    }
  },

  getMembers: async (data) => {
    try {
      set({ loadingRooms: true });
      const res = await axiosInstance.post("/rooms/get-members", data);
      set({ roomMembers: res.data.data || [] });
    } catch (error) {
      console.log(error);

      toast.error("Failed to get room members");
    } finally {
      set({ loadingRooms: false });
    }
  },

  deleteMembers: async (data) => {
    try {
      set({ loadingRooms: true });
      await axiosInstance.delete("/rooms/remove-member", {
        data,
      });
      set((state) => {
        const roomMembers = state.roomMembers.filter(
          (member) => member.user.id !== data.studentId
        );
        return { roomMembers };
      });
      toast.success("Member removed");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove room member");
    } finally {
      set({ loadingRooms: false });
    }
  },

  //todo: future planning
  //   joinCreatorRoom: async(data) => {
  //     try {
  //         const res = await axiosInstance.post(`/rooms/join-room-creator`, data);

  //     } catch (error) {

  //     }
  //   }
}));
