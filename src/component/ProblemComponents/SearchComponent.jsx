import { ChevronDown } from "lucide-react";

const SearchComponent = ({
  searchText,
  setSearchText,
  tagText,
  setTagText,
  difficulty,
  setDifficulty,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* Search Input */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Search problems..."
          className="input input-bordered w-full"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 w-full">
        {/* Tag Input */}
        <div className="w-full sm:w-[48%] md:w-[32%]">
          <input
            type="text"
            placeholder="Filter by tags..."
            className="input input-bordered w-full"
            value={tagText}
            onChange={(e) => setTagText(e.target.value)}
          />
        </div>

        {/* Difficulty Dropdown */}
        <div className="dropdown w-full sm:w-[48%] md:w-[32%]">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-outline w-full justify-between"
          >
            <span>Difficulty: {difficulty === "All" ? "Any" : difficulty}</span>
            <ChevronDown size={16} className="ml-1" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full mt-1"
          >
            {["All", "Easy", "Medium", "Hard"].map((level) => (
              <li key={level}>
                <a
                  className={
                    difficulty === level
                      ? "active"
                      : level === "Easy"
                      ? "text-success"
                      : level === "Medium"
                      ? "text-warning"
                      : level === "Hard"
                      ? "text-error"
                      : ""
                  }
                  onClick={() => setDifficulty(level)}
                >
                  {level === "All" ? "Any" : level}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Sort Dropdown */}
        <div className="dropdown w-full sm:w-[48%] md:w-[32%]">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-outline w-full justify-between"
          >
            <span>
              Sort: {sortOrder === "latest" ? "Newest First" : "Oldest First"}
            </span>
            <ChevronDown size={16} className="ml-1" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full mt-1"
          >
            <li>
              <a
                className={sortOrder === "latest" ? "active" : ""}
                onClick={() => setSortOrder("latest")}
              >
                Newest First
              </a>
            </li>
            <li>
              <a
                className={sortOrder === "oldest" ? "active" : ""}
                onClick={() => setSortOrder("oldest")}
              >
                Oldest First
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
