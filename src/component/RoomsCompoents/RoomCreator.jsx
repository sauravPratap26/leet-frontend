import React from "react";
import RoomCard from "./RoomCard";
import { useRoomsStore } from "../../store/useRoomStore";
import { Loader } from "lucide-react";

const RoomCreator = ({
  authUser,
  userCreatedRooms,
  setModalOpen,
  modalOpen,
  handleCancel,
  handleSubmit,
  onSubmit,
  errors,
  isSubmitting,
  register,
}) => {
  const { loadingRoom } = useRoomsStore();
  if (loadingRoom) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <>
      <div className="flex-1 overflow-auto p-6">
        {!authUser.canCreateRoom ? (
          <div className="flex justify-center items-center h-full text-center">
            <div>
              <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
              <p className="text-base-content">
                You do not have permission to create rooms. Please contact your
                college administrator or organisation to request access.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6 overflow-auto">
            {/* Create Room button at top if rooms exist */}
            {userCreatedRooms?.length > 0 && (
              <div className="flex justify-end mb-4">
                <button
                  className="btn btn-primary"
                  onClick={() => setModalOpen(true)}
                >
                  Create Room
                </button>
              </div>
            )}

            {userCreatedRooms?.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {userCreatedRooms.map((room) => (
                  <RoomCard key={room.id} room={room} type={"creator"} />
                ))}
              </div>
            ) : (
              <div className="text-center">
                <div className="text-lg font-medium mb-2">Your Rooms</div>
                <div className="p-4 rounded-lg border border-base-300 bg-base-200 text-base-content mb-4">
                  No rooms created yet. Click below to create one.
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => setModalOpen(true)}
                >
                  Create Room
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {modalOpen && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Create a Room</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Create Room
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
};

export default RoomCreator;
