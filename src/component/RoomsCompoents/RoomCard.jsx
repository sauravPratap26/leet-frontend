import React, { useState } from "react";
import {
  Pencil,
  Trash,
  RefreshCcw,
  DoorOpen,
  LogIn,
  Loader,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoomsStore } from "../../store/useRoomStore";
import { createRoomSchema } from "../../schema/createRoomSchema";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RoomCard = ({ room, type }) => {
  const navigate = useNavigate();
  const {
    deleteRoom,
    regenerateRoomCode,
    updateRoom,
    openCloseRoom,
    loadingRooms,
    getRoomMemberDetails,
  } = useRoomsStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(createRoomSchema()),
    defaultValues: {
      name: room.name,
      description: room.description,
    },
  });

  const handleEdit = (data) => {
    updateRoom({ ...data, id: room.id });
    setIsEditModalOpen(false);
  };

  const handleRegenerate = () => {
    regenerateRoomCode({ id: room.id });
  };

  const handleDelete = () => {
    deleteRoom({ id: room.id });
  };

  const handleOpen = async () => {
    try {
      await getRoomMemberDetails(room.id);
      navigate(`/room/${room.id}`);
    } catch (error) {
      console.log(error);
      toast.error("Failed to get room details");
    }
  };

  const handleToggle = (event) => {
    const isChecked = event.target.checked;
    console.log("Toggle is now:", isChecked);
    openCloseRoom({ isOpen: isChecked, id: room.id });
  };

  const showRoomMembers = () => {
    navigate(`/room/members/${room.id}`);
  };
  if (loadingRooms) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="bg-base-200 p-6 rounded-xl shadow-md mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{room.name}</h2>
          <p className="text-sm text-base-content/80">{room.description}</p>
        </div>

        {type === "creator" ? (
          <div className="flex gap-2 items-center">
            <button
              className="btn btn-sm btn-outline btn-error"
              onClick={handleDelete}
              title="Delete Room"
            >
              <Trash size={16} />
            </button>
            <button
              className="btn btn-sm btn-outline btn-accent"
              onClick={handleRegenerate}
              title="Regenerate Room Code"
            >
              <RefreshCcw size={16} />
            </button>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => {
                reset({ name: room.name, description: room.description });
                setIsEditModalOpen(true);
              }}
              title="Edit Room"
            >
              <Pencil size={16} />
            </button>

            <label
              className="flex items-center gap-2 cursor-pointer"
              title="Open now"
            >
              <input
                type="checkbox"
                className="toggle toggle-primary"
                defaultChecked={room.isOpen}
                onChange={handleToggle}
              />
            </label>

            {/* todo: future */}
            {/* <button className="btn btn-sm btn-primary">
            <DoorOpen size={16} className="mr-1" />
            Join
          </button> */}
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <button
              className="btn btn-sm btn-outline btn-accent"
              onClick={handleOpen}
            >
              <LogIn size={16} /> Click to open
            </button>
          </div>
        )}
      </div>

      {type === "creator" && (
        <div className="flex justify-between items-center w-full">
          <p className="text-sm text-primary font-mono">
            Room Code: {room.code}
          </p>
          <button
            className="btn btn-sm btn-outline btn-accent"
            onClick={showRoomMembers}
          >
            <LogIn size={16} /> Members
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Room</h3>

            <form onSubmit={handleSubmit(handleEdit)}>
              <input
                type="text"
                placeholder="Room Name"
                className="input input-bordered w-full mb-3"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.name.message}
                </p>
              )}

              <textarea
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.description.message}
                </p>
              )}

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default RoomCard;
