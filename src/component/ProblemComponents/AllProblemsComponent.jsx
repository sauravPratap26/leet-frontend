import React, { useState, useEffect, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import SideBar from "./SideBar";
import HeadingComponent from "./HeadingComponent";
import SearchComponent from "./SearchComponent";
import { useProblemStore } from "../../store/useProblemStore";
import { useAuthStore } from "../../store/useAuthStore";
import ProblemTile from "./ProblemTileComponent";
import useSearchHook from "../../hooks/useSearchHook";
import TagsCharts from "../TagsCharts";
import TagDropdown from "./TagsSearchComponent";
import AddProblem from "../../page/AddProblem";
import CreateProblemForm from "../CreateProblemForm";
import { Loader } from "lucide-react";
import { useTagsStore } from "../../store/useTagsStore";

const AllProblemsComponent = () => {
  const [activeTab, setActiveTab] = useState("global");
  const [searchText, setSearchText] = useState("");
  const [tagText, setTagText] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");

  const {
    problems,
    playListProblems,
    solvedProblems,
    createdProblems,
    isProblemsLoading,
    getAllProblems,
    getSolvedProblemByUser,
    getPlaylistProblemsByUser,
    getCreatedProblemsByUser,
  } = useProblemStore();
  const { getAllTags } = useTagsStore();

  const { authUser } = useAuthStore();

  useEffect(() => {
    getPlaylistProblemsByUser();
  }, [getPlaylistProblemsByUser]);

  useEffect(() => {
    if (activeTab === "global") {
      getAllProblems();
      getAllTags();
      // getSolvedProblemByUser();
    } else if (activeTab === "solved") {
      //todo
    } else if (activeTab === "created") {
      if (authUser.role === "ADMIN") getCreatedProblemsByUser();
    }
  }, [
    activeTab,
    authUser.role,
    getAllProblems,
    getAllTags,
    getCreatedProblemsByUser,
    getSolvedProblemByUser,
  ]);
  const { questionSearch } = useSearchHook();

  const selectQuestions = () => {
    switch (activeTab) {
      case "global":
        return problems;
      case "solved":
        return solvedProblems;
      case "created":
        return createdProblems;
      case "playlist":
        return playListProblems;
      case "update":
        return createdProblems;
      default:
        return [];
    }
  };

  const all = selectQuestions();
  const filteredProblems = useMemo(() => {
    return questionSearch(all, searchText, tagText, difficulty, sortOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all, searchText, tagText, difficulty, sortOrder]);

  return (
    <div
      className="flex h-screen bg-base-100 scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden bg-base-100">
        <div className="p-4 border-b border-base-300 bg-base-100">
          <HeadingComponent activeTab={activeTab} authUser={authUser} />

          {activeTab !== "tags" ? (
            activeTab !== "add" && (
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
            )
          ) : (
            <TagDropdown />
          )}

          {activeTab !== "tags" && activeTab === "add" && <></>}
        </div>

        {activeTab && activeTab !== "tags" ? (
          isProblemsLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader className="size-10 animate-spin" />
            </div>
          ) : (
            <div className="flex-1 overflow-auto">
              {filteredProblems.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-base-content/50">No problems found</p>
                </div>
              ) : (
                <AutoSizer>
                  {({ height, width }) => (
                    <List
                      height={height}
                      itemCount={filteredProblems.length}
                      itemSize={180}
                      width={width}
                    >
                      {({ index, style }) => (
                        <ProblemTile
                          problem={filteredProblems[index]}
                          style={style}
                          activeTab={activeTab}
                          problemLoading={isProblemsLoading}
                        />
                      )}
                    </List>
                  )}
                </AutoSizer>
              )}
            </div>
          )
        ) : (
          <TagsCharts />
        )}

        {activeTab && activeTab !== "tags" && activeTab === "add" && (
          <div className="overflow-y-auto max-w-[100%]">
            <CreateProblemForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProblemsComponent;
