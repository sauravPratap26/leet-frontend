import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  CheckCircle,
  PlusCircle,
  Award,
  HardHat,
  Trophy,
  Plus,
  SquareCheck,
  CheckIcon,
  Minus,
} from "lucide-react";
import { usePlaylistStore } from "../../store/usePlaylistStore";
import { useProblemStore } from "../../store/useProblemStore";

const ProblemTile = ({ problem, style, type, activeTab }) => {
  let playlistHavingProblem = problem?.problemsPlaylists?.map(
    (playlist) => playlist.playListId
  );
  let isSolved = false;
  if (type == "playlistTile") {
    isSolved = problem.solvedBy.length > 0;
  }
  const navigate = useNavigate();
  const { playlists, addProblemToPlaylist, deletePlaylistQuestions } =
    usePlaylistStore();
  const {
    getPlaylistProblemsByUser,
    setJustClosedPopup,
    problemAddedInPlaylist,
  } = useProblemStore();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handleAddClick = async (playListId) => {
    await addProblemToPlaylist({ playListId, problemIds: [problem.id] });
    problemAddedInPlaylist(problem.id, playListId, "default", activeTab);
    getPlaylistProblemsByUser();
    setShowPopup(false);
  };

  const handleTileClick = () => {
    navigate(`/problem/${problem.id}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
        setJustClosedPopup(true);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setJustClosedPopup, showPopup]);

  const removeFromPlaylist = (problemsIds) => {
    deletePlaylistQuestions([problemsIds]);
  };

  const decideIsSolved =
    (isSolved && type === "playlistTile") || problem?.isSolved;
  return (
    <div
      onClick={handleTileClick}
      style={style}
      className="p-4 border-b border-base-200 bg-base-100 hover:bg-base-200 hover:shadow-md transition duration-200 rounded-sm relative group"
    >
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl ${
          isSolved && type === "playlistTile"
            ? "bg-gradient-to-br from-success/3 to-success/5"
            : "bg-gradient-to-br from-primary/5 to-secondary/5"
        }`}
      ></div>

      <div className="relative z-10 flex-col">
        <div className="flex items-start gap-3 justify-between mb-3">
          <div className="flex items-center gap-3 min-w-0 flex-1 flex-wrap">
            <div
              className={`text-xl font-bold tracking-tight leading-tight ${
                problem.solved
                  ? "text-success drop-shadow-sm"
                  : "text-base-content group-hover:text-primary"
              } transition-colors duration-200 flex items-center gap-2`}
            >
              {isSolved && type === "playlistTile" && (
                <CheckIcon className="w-5 h-5 text-success" />
              )}
              {problem.title}
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg shadow-md ${
                problem.difficulty === "EASY"
                  ? "bg-success text-success-content border border-success/30"
                  : problem.difficulty === "MEDIUM"
                  ? "bg-warning text-warning-content border border-warning/30"
                  : "bg-error text-error-content border border-error/30"
              } backdrop-blur-sm`}
            >
              {problem.difficulty === "EASY" && <Award size={12} />}
              {problem.difficulty === "MEDIUM" && <HardHat size={12} />}
              {problem.difficulty === "HARD" && <Trophy size={12} />}
              {problem.difficulty}
            </span>

            {problem.solved && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-success/20 text-success text-xs font-semibold rounded-full border border-success/30 shadow-sm">
                <CheckCircle size={12} className="drop-shadow-sm" />
                Solved
              </span>
            )}
            {problem.created && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-info/20 text-info text-xs font-semibold rounded-full border border-info/30 shadow-sm">
                <PlusCircle size={12} className="drop-shadow-sm" />
                Created
              </span>
            )}
          </div>

          {type == "playlistTile" ? (
            <button
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500 hover:bg-red-600 hover:text-white text-white text-xs font-medium rounded-lg border border-red-500 hover:border-red-600 transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm z-30 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                removeFromPlaylist(problem.id);
              }}
            >
              <Minus size={12} />
              Remove from Playlist
            </button>
          ) : (
            <button
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-base-200 hover:bg-primary hover:text-primary-content text-base-content text-xs font-medium rounded-lg border border-base-300 hover:border-primary transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm z-30 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                setShowPopup(!showPopup);
              }}
            >
              <Plus size={12} />
              Add to Playlist
            </button>
          )}
        </div>

        <div className="text-sm text-base-content/70 leading-relaxed mb-4 font-medium">
          {problem.description}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {problem.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-1 bg-base-200 hover:bg-primary/20 text-primary hover:text-primary text-xs font-medium rounded-md border border-base-300 hover:border-primary/40 transition-all duration-200 cursor-pointer shadow-sm backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          className="self-end"
          style={{ color: decideIsSolved ? "#605DFF" : "#fff" }}
        >
          {decideIsSolved
            ? "Already Solved, Click to solve again"
            : "Click to solve"}
        </div>
      </div>

      {showPopup && (
        <>
          <div
            className="fixed inset-0 z-[999999]"
            onClick={(e) => e.stopPropagation()}
          />
          <div
            ref={popupRef}
            className="fixed top-16 right-4 bg-base-100 backdrop-blur-md shadow-2xl rounded-xl border border-base-300 z-[999999] p-3 w-52 animate-in slide-in-from-top-2 fade-in-0 duration-200"
            style={{
              position: "fixed",
              top: `${style?.top ? parseInt(style.top) + 60 : 60}px`,
              right: "20px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-sm font-semibold mb-3 text-base-content border-b border-base-300 pb-2">
              Select Playlist
            </div>
            {playlists.length === 0 ? (
              <div className="text-xs text-base-content/60 py-2 text-center">
                No playlists available
              </div>
            ) : playlists.length == playlistHavingProblem.length ? (
              <div className="text-xs text-base-content/60 py-2 text-center">
                Already available in all playlists
              </div>
            ) : (
              <div className="space-y-1">
                {playlists.map(
                  (playlist) =>
                    !playlistHavingProblem.includes(playlist.id) && (
                      <div
                        key={playlist.id}
                        onClick={() => handleAddClick(playlist.id)}
                        className="cursor-pointer text-sm text-base-content hover:text-primary hover:bg-primary/10 px-3 py-2 rounded-lg transition-all duration-150 font-medium border border-transparent hover:border-primary/20"
                      >
                        {playlist.name}
                      </div>
                    )
                )}
              </div>
            )}
          </div>
        </>
      )}

      <div
        className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
          decideIsSolved
            ? "bg-gradient-to-r from-success/6 via-transparent to-success/8"
            : "bg-gradient-to-r from-primary/8 via-transparent to-secondary/8"
        }`}
      ></div>
    </div>
  );
};

export default ProblemTile;
