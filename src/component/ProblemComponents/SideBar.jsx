import {
  Globe,
  CheckCircle,
  PlusCircle,
  ListMusic,
  ChevronRight,
  ChevronLeft,
  BookImage,
  ChartBar,
  TagsIcon,
  PlusSquareIcon,
  RocketIcon,
  HomeIcon,
  FileQuestionIcon,
} from "lucide-react";
import { usePlaylistStore } from "../../store/usePlaylistStore";
import { useAuthStore } from "../../store/useAuthStore";

const SideBar = ({ setActiveTab, activeTab, type }) => {
  const { playlist } = usePlaylistStore();
  const { authUser, collapsedSidebar, toggleSideBar } = useAuthStore();

  let sideOptions = [
    {
      label: "Global Problems",
      icon: <Globe size={18} />,
      key: "global",
    },
    {
      label: "Solved Problems",
      icon: <CheckCircle size={18} />,
      key: "solved",
    },
    {
      label: "Created Problems",
      icon: <PlusCircle size={18} />,
      key: "created",
    },
    {
      label: "Playlist Problems",
      icon: <ListMusic size={18} />,
      key: "playlist",
    },
    {
      label: "Add Problem",
      icon: <PlusSquareIcon size={18} />,
      key: "add",
    },
    {
      label: "Tags",
      icon: <TagsIcon size={18} />,
      key: "tags",
    },
  ];

  if (authUser.role !== "ADMIN") {
    sideOptions = sideOptions.filter(
      (item) => item.key !== "add" && item.key !== "created"
    );
  }

  if (type === "playlistTitle") {
    sideOptions = [
      {
        label: "Problems",
        icon: <BookImage size={18} />,
        key: "problems",
      },
      {
        label: "Analytics",
        icon: <ChartBar size={18} />,
        key: "analytics",
      },
    ];
  }

  if (type === "roomPlaylistTitle") {
    sideOptions = [
      {
        label: "Problems",
        icon: <BookImage size={18} />,
        key: "problems",
      },
      {
        label: "Analytics",
        icon: <ChartBar size={18} />,
        key: "analytics",
      },

      {
        label: "Add Questions",
        icon: <FileQuestionIcon size={18} />,
        key: "roomQuestions",
      },
    ];
  }

  if (type === "rooms") {
    sideOptions = [
      {
        label: "My Rooms",
        icon: <HomeIcon size={18} />,
        key: "viewRooms",
      },
      {
        label: "Create Room",
        icon: <RocketIcon size={18} />,
        key: "createRooms",
      },
    ];
  }

  const titleToBeShown =
    type === "playlistTitle" || type == "roomPlaylistTitle"
      ? playlist?.name || "Playlist"
      : type === "rooms"
      ? "Private Rooms"
      : "Tags & Problems";

  return (
    <div
      className={`transition-all duration-300 ${
        collapsedSidebar ? "w-20" : "w-64"
      } bg-base-200 p-4 flex flex-col border-r border-base-300`}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between mb-6 text-base-content">
        {!collapsedSidebar && (
          <h2 className="text-xl font-bold flex items-center gap-2">
            {titleToBeShown}
          </h2>
        )}
        <button
          className="btn btn-ghost btn-sm ml-auto"
          onClick={() => toggleSideBar()}
        >
          {collapsedSidebar ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="space-y-2">
        {sideOptions.map((item) => (
          <div
            key={item.key}
            className="relative group rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <button
              onClick={() => setActiveTab(item.key)}
              className={`btn btn-ghost justify-start w-full relative z-10 gap-2 ${
                activeTab === item.key ? "btn-active" : ""
              } ${collapsedSidebar ? "flex justify-center" : ""}`}
            >
              {item.icon}
              {!collapsedSidebar && item.label}
              {!collapsedSidebar && (
                <ChevronRight size={16} className="ml-auto" />
              )}
            </button>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
