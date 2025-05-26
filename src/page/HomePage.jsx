import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Edit, PlaySquareIcon, Settings, Trash2 } from "lucide-react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPlaylistSchema,
  deletePlaylistSchema,
  editPlaylistDetailsSchema,
} from "../schema/playlistSchema";
import { shallow } from "zustand/shallow";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
  const {
    getAllPlaylist,
    addPlaylist,
    deletePlaylist,
    selectPlaylist,
    playlist,
    editPlaylistDetails,
  } = usePlaylistStore();
  const { authUser } = useAuthStore();
  const playlists = usePlaylistStore((state) => state.playlists, shallow);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createPlaylistSchema),
  });

  const {
    register: deleteRegister,
    handleSubmit: deleteHandleSubmit,
    watch,
    reset: deleteReset,
    formState: { errors: deleteErrors, isSubmitting: deleteIsSubmitting },
  } = useForm({
    resolver: zodResolver(deletePlaylistSchema),
    defaultValues: {
      id: playlist?.id,
      confirmName: "",
    },
  });

  const {
    register: editRegister,
    handleSubmit: editHandleSubmit,
    reset: editReset,
    formState: { errors: editErrors, isSubmitting: editIsSubmitting },
  } = useForm({
    resolver: zodResolver(editPlaylistDetailsSchema),
    defaultValues: {
      name: playlist?.name,
      description: playlist?.description,
      id: playlist?.id,
      userId: authUser.id,
    },
  });
  const [modalOpen, setModalOpen] = useState(false);
  const onSubmit = async (data) => {
    await addPlaylist(data); // data = { title, description }
    reset(); // clear form
    setModalOpen(false); // close modal
  };
  const onDelete = async (data) => {
    await deletePlaylist(data); // data = { title, description }
    deleteReset(); // clear form
    setDeleteModalOpen(false); // close modal
  };
  const onEdit = async (data) => {
    await editPlaylistDetails(data);
    editReset(); // clear form
    setEditModalOpen(false); // close modal
  };
  const handleCancel = () => {
    reset();
    editReset();
    deleteReset();
    setModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    selectPlaylist(null);
  };

  useEffect(() => {
    getAllPlaylist();
  }, [getAllPlaylist]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (playlist && editModalOpen) {
      editReset({
        name: playlist.name,
        description: playlist.description,
        id: playlist.id,
        userId: authUser.id,
      });
    }
  }, [playlist, editModalOpen, editReset, authUser.id]);

  useEffect(() => {
    if (playlist && deleteModalOpen) {
      deleteReset({
        name: playlist.name,
        description: playlist.description,
        id: playlist.id,
        userId: authUser.id,
      });
    }
  }, [playlist, deleteModalOpen, deleteReset, authUser.id]);

  const watchDeleteConfirm = watch("confirmName");

  return (
    <div className="min-h-screen flex flex-col items-center mt-14 px-4 relative">
      {/* Background blur */}
      <div className="absolute top-16 left-0 w-1/3 h-1/3 bg-primary opacity-30 blur-3xl rounded-md bottom-9" />

      {/* Heading */}
      <h1 className="text-4xl font-extrabold z-10 text-center">
        Welcome to <span className="text-primary">LeetLab</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 max-w-2xl">
        A Platform Inspired by Leetcode which helps you to prepare for coding
        interviews and improve your coding skills by solving real coding
        problems.
      </p>

      {/* Action Buttons */}

      <div className="flex gap-4 mt-8 z-10 items-center">
        <Link to="/all-problems" className="btn btn-primary text-lg">
          Explore Problems
        </Link>

        <div className="tooltip" data-tip="Coming in v2">
          <button
            className="btn btn-outline btn-lg flex items-center gap-2 cursor-default text-gray-500 border-gray-400 hover:shadow-lg hover:border-gray-600 transition"
            type="button"
            onClick={() => {}}
          >
            <PlaySquareIcon className="w-5 h-5" />
            Explore Playlist
          </button>
        </div>

        <button
          className="btn btn-outline btn-secondary text-lg"
          onClick={() => setModalOpen(true)}
        >
          Add Playlist
        </button>
      </div>

      {/* Playlist Cards */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4 z-10">
        {playlists?.map((playlist) => (
          <div
            key={playlist?.id}
            className="group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden min-w-[368px]"
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 blur-sm -z-10"></div>

            <Link
              to={`/playlist-page/${playlist?.id}`}
              className="block p-6 pb-16 relative z-10"
            >
              {/* Header with title */}
              <div className="mb-4">
                <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-200 tracking-tight">
                  {playlist?.name}
                </h2>
              </div>

              {/* Description */}
              <div className="mb-4">
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  {playlist?.description
                    ? playlist.description.length > 80
                      ? playlist.description.slice(0, 80) + "..."
                      : playlist.description
                    : "No description available"}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-800/60 text-slate-300 rounded-md border border-slate-700/50">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {playlist?.problems?.length} Questions
                </span>
                <span className="text-slate-600">•</span>
                <span>
                  Last Edit:{" "}
                  {playlist?.updatedAt &&
                    new Date(playlist.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </Link>

            {/* Action buttons */}
            <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              {/* Settings Icon with Tooltip */}
              <div className="tooltip tooltip-top" data-tip="Coming in v2">
                <button
                  className="btn btn-sm bg-slate-800/80 hover:bg-purple-600/80 border-slate-600/50 hover:border-purple-500/50 text-slate-300 hover:text-white backdrop-blur-sm transition-all duration-200"
                  type="button"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>

              {/* Edit Icon */}
              <button
                className="btn btn-sm bg-slate-800/80 hover:bg-blue-600/80 border-slate-600/50 hover:border-blue-500/50 text-slate-300 hover:text-white backdrop-blur-sm transition-all duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  selectPlaylist(playlist);
                  setEditModalOpen(true);
                }}
                type="button"
              >
                <Edit className="w-4 h-4" />
              </button>

              {/* Delete Icon */}
              <button
                className="btn btn-sm bg-slate-800/80 hover:bg-red-600/80 border-slate-600/50 hover:border-red-500/50 text-slate-300 hover:text-white backdrop-blur-sm transition-all duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  setDeleteModalOpen(true);
                  selectPlaylist(playlist);
                }}
                type="button"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/60 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      {/* Create Playlist Modal */}
      {modalOpen && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Create a Playlist</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
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
                  Create Playlist
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* Edit Playlist Modal */}
      {editModalOpen && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Playlist Details</h3>

            <form onSubmit={editHandleSubmit(onEdit)}>
              <input
                type="text"
                placeholder="Playlist Name"
                className="input input-bordered w-full mb-3"
                {...editRegister("name")}
              />
              {editErrors.name && (
                <p className="text-red-500 text-sm mb-2">
                  {editErrors.name.message}
                </p>
              )}

              <textarea
                placeholder="Description"
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
                  Edit Playlist
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {deleteModalOpen && playlist && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Delete <span className="text-red-600">{playlist.name}</span>{" "}
              Playlist
            </h3>

            <p className="mb-4 text-sm text-gray-600">
              Type the playlist name <strong>{playlist.name}</strong> below to
              confirm deletion.
            </p>

            <form onSubmit={deleteHandleSubmit(onDelete)}>
              <input
                type="text"
                placeholder={`Type "${playlist.name}" here`}
                className="input input-bordered w-full mb-3"
                {...deleteRegister("confirmName")}
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
                    deleteIsSubmitting || watchDeleteConfirm !== playlist.name
                  }
                >
                  Delete Playlist
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default HomePage;
