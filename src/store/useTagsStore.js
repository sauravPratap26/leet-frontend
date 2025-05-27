import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useTagsStore = create((set, get) => ({
  selectedTags: [],
  bioTags: [],
  tags: [],
  tagUsers: {},
  tagProblems: {},
  isTagsLoading: false,
  totalTags: 0,
  tagProblemsCount: {},
  tagSubmissionsCount: {},
  tagSolvedCount: {},
  difficultyStats: {},
  selectTag: (tag) => {
    const { selectedTags } = get();
    if (selectedTags.includes(tag)) {
      set({ selectedTags: selectedTags.filter((t) => t !== tag) });
    } else {
      set({ selectedTags: [...selectedTags, tag] });
    }
  },
  clearTags: () => set({ selectedTags: [] }),
  selectAllTags: (allTags) => set({ selectedTags: allTags }),

  getAllTags: async () => {
    try {
      set({ isTagsLoading: true });

      const res = await axiosInstance.get("/tags/getTags");
      const tags = res.data.data;
      const totalTags = tags.length;
      const selectedTags = tags.map((tag)=>tag.value)
      const bioTags = tags.reduce((acc, current) => {
        acc[current.value] = current.users.length;
        return acc;
      }, {});

      const tagProblemsCount = tags.reduce((acc, current) => {
        acc[current.value] = current.problems.length;
        return acc;
      }, {});

      const tagSubmissionsCount = tags.reduce((acc, current) => {
        acc[current.value] = current.problems.reduce((sum, problem) => {
          return sum + problem.submissionCount;
        }, 0);
        return acc;
      }, {});

      const tagSolvedCount = tags.reduce((acc, current) => {
        acc[current.value] = current.problems.reduce((sum, problem) => {
          return sum + problem.solvedCount;
        }, 0);
        return acc;
      }, {});

      const difficultyStats = {};

      tags.forEach((tag) => {
        difficultyStats[tag.value] = {
          EASY: 0,
          MEDIUM: 0,
          HARD: 0,
        };

        tag.problems.forEach((problem) => {
          difficultyStats[tag.value][problem.difficulty]++;
        });
      });
      set({
        tags,
        totalTags,
        bioTags,
        tagProblemsCount,
        tagSolvedCount,
        tagSubmissionsCount,
        difficultyStats,
        selectedTags
      });
    } catch (error) {
      console.log("Error getting all tags", error);
      toast.error("Error in getting tags");
    } finally {
      set({ isTagsLoading: false });
    }
  },
}));
