import {
  Globe,
  CheckCircle,
  PlusCircle,
  ListMusic,
  BookImage,
  ChartBar,
  PersonStanding,
} from "lucide-react";
const HeadingComponent = ({ activeTab }) => {
  return (
    <h1 className="text-2xl font-bold text-base-content flex items-center gap-2">
      {activeTab === "global" && <Globe size={24} />}
      {activeTab === "solved" && <CheckCircle size={24} />}
      {activeTab === "created" && <PlusCircle size={24} />}
      {activeTab === "playlist" && <ListMusic size={24} />}
      {activeTab === "problems" && <BookImage size={24} />}
      {activeTab === "analytics" && <ChartBar size={24} />}
      {activeTab === "about" && <PersonStanding size={24} />}
      {activeTab === "global" && "All Problems"}
      {activeTab === "solved" && "Solved Problems"}
      {activeTab === "created" && "Created Problems"}
      {activeTab === "playlist" && "Playlist Problems"}
      {activeTab === "problems" && "Problems"}
      {activeTab === "analytics" && "Analytics"}
      {activeTab === "about" && "About"}
    </h1>
  );
};

export default HeadingComponent;
