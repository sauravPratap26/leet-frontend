import React, { useCallback } from "react";

const useSearchHook = () => {
  const questionSearch = useCallback(
    (
      originalQuestions,
      searchText,
      tagText,
      difficulty = "All",
      sortOrder = "latest"
    ) => {
      return originalQuestions
        .filter((q) => {
          const titleMatch = q.title
            .toLowerCase()
            .includes(searchText.toLowerCase());
          const tagMatch =
            tagText.trim() === "" ||
            q.tags?.some((tag) =>
              tag.toLowerCase().includes(tagText.toLowerCase())
            );
          const difficultyMatch =
            difficulty === "All" ||
            q.difficulty?.toLowerCase() === difficulty.toLowerCase();
          return titleMatch && tagMatch && difficultyMatch;
        })
        .sort((a, b) => {
          const dateA = new Date(a.updatedAt).getTime();
          const dateB = new Date(b.updatedAt).getTime();
          return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
        });
    },
    []
  );

  return { questionSearch };
};

export default useSearchHook;
