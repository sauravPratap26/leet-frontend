import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const PlaylistAnalytics = ({ total, solved }) => {
  if (total === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-base-100">
        <div className="text-center max-w-lg w-full">
          <h3 className="text-xl font-bold text-neutral-content mb-3">
            No Problems in Playlist
          </h3>
          <p className="text-base-content opacity-70 text-sm">
            Add problems to the playlist to begin analyzing progress.
          </p>
        </div>
      </div>
    );
  }

  const unsolved = total - solved;

  const data = [
    { name: "Solved", value: solved },
    { name: "Unsolved", value: unsolved },
  ];

  const colors = ["#22c55e", "#ef4444"];

  return (
    <div className="flex justify-center p-6 bg-base-100 min-h-screen">
      <div className="bg-base-200 rounded-box shadow-md p-6 w-full max-w-screen">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-base-content">
            Playlist Completion Overview
          </h2>
          <div
            className="tooltip tooltip-left"
            data-tip="This chart shows how many problems you’ve solved vs total"
          >
            <span className="cursor-pointer text-base-content">ℹ️</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Legend layout="horizontal" verticalAlign="top" align="center" />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={50}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PlaylistAnalytics;
