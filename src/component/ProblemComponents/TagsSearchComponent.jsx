import { useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useTagsStore } from "../../store/useTagsStore";

const TagDropdown = () => {
  const {
    selectedTags,
    selectTag,
    clearTags,
    selectAllTags,
    getAllTags,
    tags,
  } = useTagsStore();

  const allTags = tags.map((tag) => tag.value);

  useEffect(() => {
    getAllTags();
  }, [getAllTags]);

  return (
    <div className="flex w-full">
      <div className="dropdown w-[35%] ml-auto ">
        <div
          tabIndex={0}
          role="button"
          aria-haspopup="true"
          aria-expanded="true"
          className="btn btn-outline w-full justify-between min-h-[3rem] px-4 py-2 border-2 hover:border-primary/50 focus:border-primary focus:outline-none transition-all duration-200 ml-0"
        >
          <span className="flex-1 text-left overflow-hidden">
            {selectedTags.length === 0 ? (
              <span className="text-base-content/60">Select tags...</span>
            ) : selectedTags.length === allTags.length ? (
              <span className="font-medium text-primary">
                All Tags Selected
              </span>
            ) : selectedTags.length <= 2 ? (
              <span className="truncate">{selectedTags.join(", ")}</span>
            ) : (
              <span className="font-medium text-primary">
                {selectedTags.length} tags selected
              </span>
            )}
          </span>
          <ChevronDown
            size={16}
            className="ml-2 flex-shrink-0 text-base-content/70"
          />
        </div>

        <ul
          tabIndex={0}
          role="menu"
          aria-label="Tag selection menu"
          className="dropdown-content z-[50] menu p-0 shadow-lg bg-base-100 rounded-lg w-full mt-2 max-h-80 overflow-hidden border border-base-300"
        >
          <div className="p-3 border-b border-base-300 bg-base-200/50">
            <button
              onClick={clearTags}
              className="btn btn-sm btn-ghost text-error hover:bg-error/10 hover:text-error flex-1"
              role="menuitem"
            >
              Clear All
            </button>
            <button
              onClick={() => selectAllTags(allTags)}
              className="btn btn-sm btn-ghost text-success hover:bg-success/10 hover:text-success flex-1"
              role="menuitem"
            >
              Select All
            </button>
            <div className="text-xs text-base-content/60 mt-2 text-center">
              {selectedTags.length} of {allTags.length} selected
            </div>
          </div>

          <div className="overflow-y-auto max-h-80 w-min-80%">
            {allTags.map((tag) => (
              <li
                key={tag}
                role="none"
                className="border-b border-base-300/30 last:border-b-0"
              >
                <button
                  onClick={() => selectTag(tag)}
                  className={`flex justify-between items-center w-full text-left px-4 py-3 hover:bg-base-200 transition-colors duration-150 ${
                    selectedTags.includes(tag)
                      ? "bg-primary/10 text-primary border-l-4 border-l-primary"
                      : "hover:border-l-4 hover:border-l-transparent"
                  }`}
                  role="menuitemcheckbox"
                  aria-checked={selectedTags.includes(tag)}
                >
                  <span className="font-medium text-sm">{tag}</span>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      selectedTags.includes(tag)
                        ? "bg-primary border-primary"
                        : "border-base-content/30"
                    }`}
                  >
                    {selectedTags.includes(tag) && (
                      <Check size={12} className="text-primary-content" />
                    )}
                  </div>
                </button>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default TagDropdown;
