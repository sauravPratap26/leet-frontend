import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRoomsStore } from "../../store/useRoomStore";
import { usePlaylistStore } from "../../store/usePlaylistStore";

import { Edit, Loader, Trash2 } from "lucide-react";
import SideBar from "../ProblemComponents/SideBar";
import HeadingComponent from "../ProblemComponents/HeadingComponent";
import RoomPlaylistTab from "./RoomPlaylistTab";
import RoomMembersTab from "./RoomMembersTab";
import { useAuthStore } from "../../store/useAuthStore";

const RoomPlayliist = () => {
  const { id } = useParams();
  const { authUser } = useAuthStore();
  const {
    getRoomMemberDetails,
    roomMember,
    getRoomDetail,
    loadingRooms,
    getMembers,
    deleteMembers,
    roomMembers,
  } = useRoomsStore();
  const {
    getRoomPlaylists,
    roomPlaylists,
    addPlaylist,
    editPlaylistDetails,
    deletePlaylist,
    selectPlaylist,
    playlist,
  } = usePlaylistStore();

  const isTeacher = roomMember?.role === "TEACHER";

  const [activeTab, setActiveTab] = useState("roomPlaylists");

  let roomDetails = getRoomDetail(id);
  useEffect(() => {
    if (isTeacher) {
      getMembers(id);
    }
    getRoomMemberDetails(id);
    getRoomPlaylists({ id });
  }, [getMembers, getRoomMemberDetails, getRoomPlaylists, id, isTeacher]);

  if (loadingRooms) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="flex h-screen bg-base-100 scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <SideBar
        type={"roomArea"}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        conditional={isTeacher}
      />
      <div className="flex-1 flex flex-col overflow-hidden bg-base-100">
        <div className="p-4 border-b border-base-300 bg-base-100">
          <HeadingComponent activeTab={activeTab} authUser={null} />
        </div>

        {activeTab === "roomPlaylists" ? (
          <RoomPlaylistTab
            id={id}
            roomPlaylists={roomPlaylists}
            addPlaylist={addPlaylist}
            editPlaylistDetails={editPlaylistDetails}
            deletePlaylist={deletePlaylist}
            selectPlaylist={selectPlaylist}
            playlist={playlist}
            roomMember={roomMember}
            roomDetails={roomDetails}
            isTeacher={isTeacher}
          />
        ) : (
          <RoomMembersTab
            roomMembers={roomMembers}
            deleteMembers={deleteMembers}
            selfId={authUser.id}
            roomId={id}
          />
        )}
      </div>
    </div>
  );
};

export default RoomPlayliist;
