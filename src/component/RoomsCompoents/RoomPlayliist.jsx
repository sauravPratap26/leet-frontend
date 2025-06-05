import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRoomsStore } from "../../store/useRoomStore";
import { usePlaylistStore } from "../../store/usePlaylistStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPlaylistSchema,
  editPlaylistDetailsSchema,
  deletePlaylistSchema,
} from "../../schema/playlistSchema";
import { Edit, Loader, Trash2 } from "lucide-react";

const RoomPlayliist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRoomMemberDetails, roomMember, getRoomDetail, loadingRoom } =
    useRoomsStore();
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

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  let roomDetails = getRoomDetail(id);
  useEffect(() => {
    getRoomMemberDetails(id);
    getRoomPlaylists({ id });
  }, [getRoomMemberDetails, getRoomPlaylists, id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createPlaylistSchema),
  });

  const {
    register: editRegister,
    handleSubmit: editHandleSubmit,
    reset: editReset,
    formState: { errors: editErrors, isSubmitting: editIsSubmitting },
  } = useForm({
    resolver: zodResolver(editPlaylistDetailsSchema),
  });

  const {
    register: deleteRegister,
    handleSubmit: deleteHandleSubmit,
    reset: deleteReset,
    watch,
    formState: { errors: deleteErrors, isSubmitting: deleteIsSubmitting },
  } = useForm({
    resolver: zodResolver(deletePlaylistSchema),
  });

  const handleCancel = () => {
    reset();
    editReset();
    deleteReset();
    setCreateModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    selectPlaylist(null);
  };

  const onCreate = async (data) => {
    await addPlaylist({ ...data, roomId: id });
    reset();
    setCreateModalOpen(false);
  };

  const onEdit = async (data) => {
    await editPlaylistDetails(data);
    editReset();
    setEditModalOpen(false);
  };

  const onDelete = async (data) => {
    await deletePlaylist(data);
    deleteReset();
    setDeleteModalOpen(false);
  };

  const watchConfirm = watch("confirmName");

  useEffect(() => {
    if (playlist && editModalOpen) {
      editReset({
        name: playlist.name,
        description: playlist.description,
        id: playlist.id,
        userId: roomMember?.userId,
      });
    }
    if (playlist && deleteModalOpen) {
      deleteReset({
        confirmName: "",
        id: playlist.id,
      });
    }
  }, [
    playlist,
    editModalOpen,
    deleteModalOpen,
    editReset,
    deleteReset,
    roomMember,
  ]);

  if (loadingRoom) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-slate-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{roomDetails?.name}</h1>
        {isTeacher && (
          <button
            className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-white shadow"
            onClick={() => setCreateModalOpen(true)}
          >
            + Create Playlist
          </button>
        )}
      </div>

      {roomPlaylists?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-[#1E293B] p-5 rounded-xl shadow hover:shadow-lg transition relative group cursor-pointer"
              onClick={() =>
                !isTeacher && navigate(`/playlist-page/${playlist.id}`)
              }
            >
              <h2 className="text-xl font-semibold">{playlist.name}</h2>
              <p className="text-slate-400 mt-2 text-sm">
                {playlist.description || "No description provided."}
              </p>
              <p className="text-slate-500 mt-4 text-xs">
                {playlist.problems.length} problems
              </p>

              {/* View Playlist button - visible to all */}
              <div className="mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/playlist-page/${playlist.id}/${id}`);
                    selectPlaylist(playlist);
                  }}
                  className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg transition"
                >
                  View Playlist
                </button>
              </div>

              {/* Edit/Delete for Teachers */}
              {isTeacher && (
                <div className="absolute top-3 right-3 flex gap-2 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      selectPlaylist(playlist);
                      setEditModalOpen(true);
                    }}
                    className="text-blue-400 hover:text-blue-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      selectPlaylist(playlist);
                      setDeleteModalOpen(true);
                    }}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-400 mt-10 text-center">
          No playlists in this room yet.
        </p>
      )}

      {/* Create Modal */}
      {createModalOpen && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Create Playlist</h3>
            <form onSubmit={handleSubmit(onCreate)}>
              <input
                type="text"
                placeholder="Playlist Name"
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Playlist</h3>
            <form onSubmit={editHandleSubmit(onEdit)}>
              <input
                type="text"
                className="input input-bordered w-full mb-3"
                {...editRegister("name")}
              />
              {editErrors.name && (
                <p className="text-red-500 text-sm mb-2">
                  {editErrors.name.message}
                </p>
              )}
              <textarea
                className="textarea textarea-bordered w-full"
                {...editRegister("description")}
              />
              {editErrors.description && (
                <p className="text-red-500 text-sm mb-2">
                  {editErrors.description.message}
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
                  disabled={editIsSubmitting}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && playlist && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Delete <span className="text-red-600">{playlist.name}</span>{" "}
              Playlist
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              Type <strong>{playlist.name}</strong> to confirm.
            </p>
            <form onSubmit={deleteHandleSubmit(onDelete)}>
              <input
                type="text"
                className="input input-bordered w-full mb-3"
                {...deleteRegister("confirmName")}
                placeholder={`Type "${playlist.name}"`}
              />
              {deleteErrors.confirmName && (
                <p className="text-red-500 text-sm mb-2">
                  {deleteErrors.confirmName.message}
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
                  className="btn btn-error"
                  disabled={
                    deleteIsSubmitting || watchConfirm !== playlist.name
                  }
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default RoomPlayliist;
