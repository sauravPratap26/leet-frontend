import {
  Globe,
  CheckCircle,
  PlusCircle,
  ListMusic,
  BookImage,
  ChartBar,
  Settings,
  TagsIcon,
  PlusSquareIcon,
  WorkflowIcon,
} from "lucide-react";
const HeadingComponent = ({ activeTab, authUser }) => {
  return (
    <h1 className="text-2xl font-bold text-base-content flex items-center gap-2">
      {activeTab === "global" && <Globe size={24} />}
      {activeTab === "solved" && <CheckCircle size={24} />}
      {authUser?.role === "ADMIN" && activeTab === "created" && (
        <PlusCircle size={24} />
      )}
      {activeTab === "playlist" && <ListMusic size={24} />}
      {activeTab === "problems" && <BookImage size={24} />}
      {activeTab === "analytics" && <ChartBar size={24} />}
      {activeTab === "settings" && <Settings size={24} />}
      {activeTab === "tags" && <TagsIcon size={24} />}
      {authUser?.role === "ADMIN" && activeTab === "add" && (
        <PlusSquareIcon size={24} />
      )}
      {/* {authUser.role === "ADMIN" && activeTab === "update" && (
        <WorkflowIcon size={24} />
      )} */}
      {activeTab === "global" && "All Problems"}
      {activeTab === "solved" && "Solved Problems"}
      {authUser?.role === "ADMIN" &&
        activeTab === "created" &&
        "Created Problems"}
      {activeTab === "playlist" && "Playlist Problems"}
      {activeTab === "problems" && "Problems"}
      {activeTab === "analytics" && "Analytics"}
      {activeTab === "settings" && "Settings"}
      {authUser?.role === "ADMIN" && activeTab === "add" && "Add Problem"}
      {/* {authUser.role === "ADMIN" && activeTab === "update" && "Update Problem"} */}
      {activeTab === "tags" && "Tags"}
    </h1>
  );
};

export default HeadingComponent;
