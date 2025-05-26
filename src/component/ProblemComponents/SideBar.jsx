import React from "react";
import {
  Globe,
  CheckCircle,
  PlusCircle,
  ListMusic,
  ChevronDown,
  ChevronRight,
  BookImage,
  ChartBar,
  PersonStanding,
} from "lucide-react";
import { usePlaylistStore } from "../../store/usePlaylistStore";
const SideBar = ({ setActiveTab, activeTab, type }) => {
  const { playlist } = usePlaylistStore();
  console.log(playlist, type);
  let sideOptions = [
    {
      label: "Global Problems",
      icon: <Globe size={18} className="mr-2" />,
      key: "global",
    },
    {
      label: "Solved Problems",
      icon: <CheckCircle size={18} className="mr-2" />,
      key: "solved",
    },
    {
      label: "Created Problems",
      icon: <PlusCircle size={18} className="mr-2" />,
      key: "created",
    },
    {
      label: "Playlist Problems",
      icon: <ListMusic size={18} className="mr-2" />,
      key: "playlist",
    },
  ];
  if (type == "playlistTitle") {
    sideOptions=[
      {
      label: "Problems",
      icon: <BookImage size={18} className="mr-2" />,
      key: "problems",
    },
    {
      label: "Analytics",
      icon: <ChartBar size={18} className="mr-2" />,
      key: "analytics",
    },
    {
      label: "About",
      icon: <PersonStanding size={18} className="mr-2" />,
      key: "about",
    },
    ]
  }
  return (
    <div className="w-64 bg-base-200 p-4 flex flex-col border-r border-base-300">
      <h2 className="text-xl font-bold mb-6 text-base-content flex items-center gap-2">
        <ChevronDown size={20} />
        {type == "playlistTitle" ? playlist.name : "Problem Sets"}
      </h2>
      <nav className="space-y-2">
        {sideOptions.map((item) => (
          <div
            key={item.key}
            className="relative group rounded-lg overflow-hidden"
          >
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <button
              onClick={() => setActiveTab(item.key)}
              className={`btn btn-ghost justify-start w-full relative z-10 ${
                activeTab === item.key ? "btn-active" : ""
              }`}
            >
              {item.icon}
              {item.label}
              <ChevronRight size={16} className="ml-auto" />
            </button>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
