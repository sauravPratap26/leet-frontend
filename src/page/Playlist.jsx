import React, { useEffect, useMemo, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { useParams } from "react-router-dom";
import { usePlaylistStore } from "../store/usePlaylistStore";
import SideBar from "../component/ProblemComponents/SideBar";
import HeadingComponent from "../component/ProblemComponents/HeadingComponent";
import SearchComponent from "../component/ProblemComponents/SearchComponent";
import AutoSizer from "react-virtualized-auto-sizer";
import ProblemTile from "../component/ProblemComponents/ProblemTileComponent";
import useSearchHook from "../hooks/useSearchHook";
import PlaylistAnalytics from "../component/PlaylistAnalytics";
import { useRoomsStore } from "../store/useRoomStore";
import CreateProblemForm from "../component/CreateProblemForm";

const Playlist = () => {
  const { playlistId, roomId } = useParams();
  const {
    getPlaylistQuestions,
    isPlaylistLoading,
    playlist,
    getBasicPlaylistDetails,
  } = usePlaylistStore();
  const { roomMember, getRoomMemberDetails } = useRoomsStore();
  useEffect(() => {
    if (roomId) {
      getBasicPlaylistDetails(playlistId, roomId);
      getRoomMemberDetails(roomId);
    }

    getPlaylistQuestions(playlistId, roomId);
  }, [getPlaylistQuestions, playlistId, roomId]);

  const [activeTab, setActiveTab] = useState("problems");
  const originalQuestions = usePlaylistStore(
    (state) => state.playlistQuestions
  );

  const total = originalQuestions.length;
  const solved = originalQuestions.filter((q) => q.solvedBy?.length > 0).length;
  const [searchText, setSearchText] = useState("");
  const [tagText, setTagText] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");
  const { questionSearch } = useSearchHook();
  const filteredQuestions = useMemo(() => {
    return questionSearch(
      originalQuestions,
      searchText,
      tagText,
      difficulty,
      sortOrder
    );
  }, [
    questionSearch,
    originalQuestions,
    searchText,
    tagText,
    difficulty,
    sortOrder,
  ]);
  const addQuestionThroughPlaylist =
    roomMember?.role === "TEACHER" && playlist?.roomId != undefined;

  return (
    <div
      className="flex h-screen bg-base-100 scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <SideBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        type={
          addQuestionThroughPlaylist ? "roomPlaylistTitle" : "playlistTitle"
        }
      />

      <div className="flex-1 flex flex-col overflow-hidden bg-base-100">
        <div className="p-4 border-b border-base-300 bg-base-100">
          <HeadingComponent activeTab={activeTab} authUser={null} />

          {!["analytics", "settings", "roomQuestions"].includes(activeTab) && (
            <SearchComponent
              searchText={searchText}
              setSearchText={setSearchText}
              tagText={tagText}
              setTagText={setTagText}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          )}
        </div>

        {activeTab != "analytics" && activeTab != "roomQuestions" ? (
          <div className="flex-1 overflow-auto">
            {filteredQuestions.length === 0 && !isPlaylistLoading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-base-content/50">No problems found</p>
              </div>
            ) : (
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    height={height}
                    itemCount={filteredQuestions.length}
                    itemSize={180}
                    width={width}
                    // onScroll={onScroll}
                  >
                    {({ index, style }) => {
                      return (
                        <ProblemTile
                          problem={filteredQuestions[index]}
                          style={style}
                          activeTab={activeTab}
                          type={
                            playlist?.roomId != undefined
                              ? "roomPlaylistTile"
                              : "playlistTile"
                          }
                          isTeacher={roomMember?.role === "TEACHER"}
                        />
                      );
                    }}
                  </List>
                )}
              </AutoSizer>
            )}
          </div>
        ) : activeTab !== "roomQuestions" ? (
          <PlaylistAnalytics total={total} solved={solved} />
        ) : (
          <div className="overflow-y-auto max-w-[100%]">
            <CreateProblemForm
              questionForRoom={roomId}
              playlistId={playlistId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlist;
