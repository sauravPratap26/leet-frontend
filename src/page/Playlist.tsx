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

const Playlist = () => {
  const { playlistId } = useParams();
  const { playlistQuestions, getPlaylistQuestions, isPlaylistLoading } =
    usePlaylistStore();
  useEffect(() => {
    getPlaylistQuestions(playlistId);
  }, []);

  const [activeTab, setActiveTab] = useState("problems");
  const originalQuestions = usePlaylistStore(
    (state) => state.playlistQuestions
  );

  const total = originalQuestions.length;
  const solved = originalQuestions.filter((q) => q.solvedBy.length > 0).length;
  console.log({ total, solved });
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
  }, [originalQuestions, searchText, tagText, difficulty, sortOrder]);

  return (
    <div
      className="flex h-screen bg-base-100 scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <SideBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        type={"playlistTitle"}
      />

      <div className="flex-1 flex flex-col overflow-hidden bg-base-100">
        <div className="p-4 border-b border-base-300 bg-base-100">
          <HeadingComponent activeTab={activeTab} authUser={null} />

          {!["analytics", "settings"].includes(activeTab) && (
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

        {activeTab != "analytics" ? (
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
                          type={"playlistTile"}
                        />
                      );
                    }}
                  </List>
                )}
              </AutoSizer>
            )}
          </div>
        ) : (
          <PlaylistAnalytics total={total} solved={solved} />
        )}
      </div>
    </div>
  );
};

export default Playlist;
