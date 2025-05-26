import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { useParams } from "react-router-dom";
import { usePlaylistStore } from "../store/usePlaylistStore";
import SideBar from "../component/ProblemComponents/SideBar";
import HeadingComponent from "../component/ProblemComponents/HeadingComponent";
import SearchComponent from "../component/ProblemComponents/SearchComponent";
import AutoSizer from "react-virtualized-auto-sizer";
import ProblemTile from "../component/ProblemComponents/ProblemTileComponent";

const Playlist = () => {
  const { playlistId } = useParams();
  const { playlistQuestions, getPlaylistQuestions, isPlaylistLoading } =
    usePlaylistStore();
  useEffect(() => {
    getPlaylistQuestions(playlistId);
  }, []);
  console.log(playlistQuestions)
  const [activeTab, setActiveTab] = useState("global");
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
          <HeadingComponent activeTab={activeTab} />

          {!["analytics", "settings"].includes(activeTab) && <SearchComponent />}
        </div>

        <div className="flex-1 overflow-auto">
          {playlistQuestions.length === 0 && !isPlaylistLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-base-content/50">No problems found</p>
            </div>
          ) : (
            <AutoSizer>
              {({ height, width }) => (
                <List
                  height={height}
                  itemCount={playlistQuestions.length}
                  itemSize={180}
                  width={width}
                  // onScroll={onScroll}
                >
                  {({ index, style }) => {
                    return (
                      <ProblemTile
                        problem={playlistQuestions[index]}
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
      </div>
    </div>
  );
};

export default Playlist;
