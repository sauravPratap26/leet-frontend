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
    console.log("delete data",data)
    await deletePlaylist(data); // data = { title, description }
    deleteReset(); // clear form
    setDeleteModalOpen(false); // close modal
  };
  const onEdit = async (data) => {
    console.log(data);
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

  // States for Edit Modal

  const handleDeletePlaylist = (id) => {};
  console.log("%%%", playlists);
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
        <Link to="/all" className="btn btn-primary text-lg">
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
            className="card border-neutral-700 bg-base-300 shadow-xl hover:shadow-2xl transition relative min-w-[368px]"
          >
            <Link
              to={`/playlist-page/${playlist?.id}`}
              className="card-body pb-14"
            >
              <h2 className="card-title">{playlist?.name}</h2>
              <p className="text-gray-500">
                {playlist?.description
                  ? playlist.description.length > 30
                    ? playlist.description.slice(0, 30) + "..."
                    : playlist.description
                  : ""}
              </p>

              <div className="mt-2 text-sm text-gray-400">
                {playlist?.problems?.length} Questions • Last Edit :{" "}
                {playlist?.updatedAt &&
                  new Date(playlist.updatedAt).toLocaleDateString()}
              </div>
            </Link>

            {/* Icon buttons */}
            <div className="absolute bottom-3 right-3 flex gap-3">
              {/* Copy Icon with Tooltip */}
              <div className="tooltip" data-tip="Coming in v2">
                <button className="btn btn-ghost btn-sm" type="button">
                  <Settings className="w-5 h-5" />
                </button>
              </div>

              {/* Edit Icon */}
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  selectPlaylist(playlist);
                  setEditModalOpen(true);
                }}
                type="button"
              >
                <Edit className="w-5 h-5" />
              </button>

              {/* Delete Icon */}
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setDeleteModalOpen(true);
                  selectPlaylist(playlist);
                }}
                type="button"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
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
