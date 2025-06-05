import React, { useEffect, useState } from "react";
import SideBar from "../ProblemComponents/SideBar";
import { useAuthStore } from "../../store/useAuthStore";
import HeadingComponent from "../ProblemComponents/HeadingComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import RoomCard from "./RoomCard";
import { useRoomsStore } from "../../store/useRoomStore";
import { createRoomSchema } from "../../schema/createRoomSchema";
import RoomCreator from "./RoomCreator";
import ViewRooms from "./ViewRooms";

const Rooms = () => {
  const { authUser } = useAuthStore();
  const {
    loadingRooms,
    createRoom,
    userRooms,
    checkUserCreatedRooms,
    userCreatedRooms,
    joinRoomUsingCode,
    checkUserRoom,
  } = useRoomsStore();
  useEffect(() => {
    if (authUser.canCreateRoom) {
      checkUserCreatedRooms();
    }
    checkUserRoom();
  }, [authUser.canCreateRoom, checkUserCreatedRooms, checkUserRoom]);
  const [activeTab, setActiveTab] = useState("viewRooms");
  const [modalOpen, setModalOpen] = useState(false);

  const schema = createRoomSchema();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    await createRoom(data);
    reset();
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
    reset();
  };

  const handleJoinRoom = (code) => {
    joinRoomUsingCode(code);
  };

  return (
    <div className="flex h-screen bg-base-100 scrollbar-hide">
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} type="rooms" />

      <div className="flex-1 flex flex-col overflow-hidden bg-base-100">
        <div className="p-4 border-b border-base-300 bg-base-100">
          <HeadingComponent activeTab={activeTab} authUser={authUser} />
        </div>

        {activeTab === "createRooms" ? (
          <RoomCreator
            authUser={authUser}
            userCreatedRooms={userCreatedRooms}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
            register={register}
          />
        ) : (
          <ViewRooms
            userRooms={userRooms}
            onJoinRoom={handleJoinRoom}
            loading={loadingRooms}
          />
        )}
      </div>
    </div>
  );
};

export default Rooms;
