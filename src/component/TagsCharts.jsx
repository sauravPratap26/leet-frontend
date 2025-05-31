import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useTagsStore } from "../store/useTagsStore";
import { BarChart3, Loader, Target, TrendingUp } from "lucide-react";

const generateColors = (count) =>
  Array.from(
    { length: count },
    (_, i) => `hsl(${(i * 360) / count}, 70%, 60%)`
  );

const TagsCharts = () => {
  const {
    tagProblemsCount,
    tagSubmissionsCount,
    selectedTags,
    bioTags,
    difficultyStats,
    isTagsLoading,
  } = useTagsStore();
  const problemsData = Object.entries(tagProblemsCount)
    .map(([name, value]) => ({ name, value }))
    .filter(({ name }) => selectedTags.includes(name));

  let submissionData = Object.entries(tagSubmissionsCount)
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({ name, value }))
    .filter(({ name }) => selectedTags.includes(name));

  const bioData = Object.entries(bioTags)
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({ name, value }))
    .filter(({ name }) => selectedTags.includes(name));

  const pieColors = generateColors(submissionData.length);
  const userColor = generateColors(bioData.length);
  if (isTagsLoading) {
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>;
  }
  if (selectedTags.length == 0) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-base-100">
        <div className="text-center max-w-lg w-full">
          <div className="relative mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-slate-700 to-slate-600 rounded-full flex items-center justify-center shadow-2xl border border-slate-600">
              <BarChart3 size={36} className="text-blue-400 animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
            <div
              className="absolute -bottom-1 -left-2 w-2.5 h-max bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute top-3 -left-3 w-2 h-max bg-emerald-500 rounded-full animate-bounce"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
          <h3 className="text-xl font-bold text-neutral-content mb-3">
            No Tags Selected
          </h3>

          <p className="text-base-content mb-6 leading-relaxed text-sm opacity-70">
            Select tags from the dropdown above to visualize and analyze your
            data
          </p>

          <div className="space-y-3">
            <div className="bg-base-100 border-l-4 border-l-blue-500 p-3 rounded-lg shadow-lg hover:bg-base-300 transition-all duration-200 border border-slate-600/50">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target size={14} className="text-blue-400" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-neutral-content mb-1 text-sm">
                    Select 1 Tag
                  </h4>
                  <p className="text-xs text-base-content opacity-70">
                    See difficulty chart for a specific variable
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-base-100 border-l-4 border-l-purple-500 p-3 rounded-lg shadow-lg hover:bg-base-300 transition-all duration-200 border border-slate-600/50">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0 ">
                  <TrendingUp size={14} className="text-purple-400" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-neutral-content mb-1 text-sm">
                    Select Multiple Tags
                  </h4>
                  <p className="text-xs text-base-content opacity-70">
                    Compare variables across different parameters
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="flex flex-col items-center">
              <div className="text-base-content animate-bounce opacity-50">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-base-content"
                >
                  <path
                    d="M12 19V5M5 12L12 5L19 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xs text-base-content mt-1 opacity-70">
                Choose tags above
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (selectedTags.length == 1) {
    const difficultInfo = difficultyStats[selectedTags[0]];
    const difficultyData = Object.entries(difficultInfo).map(
      ([name, value]) => ({ name, value })
    );
    console.log("*", difficultyData);
    if (
      difficultyData[0].value == 0 &&
      difficultyData[1].value == 0 &&
      difficultyData[2].value == 0
    ) {
      return <>This Tag has no Question created against it</>;
    }
    const text = `Problem Difficulty for ${selectedTags[0]}`;
    return (
      <>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 p-4 bg-base-200 rounded-box shadow-md h-screen">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-base-content">
                {text}
              </h2>
              <div
                className="tooltip tooltip-left"
                data-tip="This chart shows the use of the particular tag for difficulty"
              >
                <span className="cursor-pointer text-base-content">ℹ️</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="75%">
              <PieChart>
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
                <Pie
                  data={difficultyData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  label
                >
                  {difficultyData.map((entry, index) => {
                    let color;
                    switch (entry.name.toLowerCase()) {
                      case "easy":
                        color = "#22c55e";
                        break;
                      case "medium":
                        color = "#eab308";
                        break;
                      case "hard":
                        color = "#ef4444";
                        break;
                      default:
                        color = "#64748b";
                    }

                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </>
    );
  } else
    return (
      <div className="w-full px-[25px] space-y-6 overflow-y-auto mb-[20px]">
        <div
          className={`p-4 bg-base-200 rounded-box shadow-md ${
            problemsData.length > 10 ? "h-[600px]" : "h-[450px]"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-base-content">
              Problems per Tag
            </h2>
            <div
              className="tooltip tooltip-left"
              data-tip="This chart shows how many problems belong to each tag."
            >
              <span className="cursor-pointer text-base-content">ℹ️</span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={problemsData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 100, bottom: 20 }}
              isAnimationActive={true}
              animationDuration={1500}
            >
              <XAxis
                type="number"
                tick={{ fill: "currentColor" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fill: "currentColor" }}
                width={150}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                labelStyle={{ color: "white" }}
                itemStyle={{ color: "white" }}
              />
              <Bar dataKey="value" fill="#a78bfa" radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 p-4 bg-base-200 rounded-box shadow-md h-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-base-content">
                Submissions per Tag
              </h2>
              <div
                className="tooltip tooltip-left"
                data-tip="This chart shows how many submissions are done for a tag also the tags that are widely solved."
              >
                <span className="cursor-pointer text-base-content">ℹ️</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
                <Pie
                  data={submissionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  label
                >
                  {submissionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 p-4 bg-base-200 rounded-box shadow-md h-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-base-content">
                Users per Tag
              </h2>
              <div
                className="tooltip tooltip-left"
                data-tip="This chart shows how many users belong to a particular tag. Helps understand creators on the topics they need to create more questions"
              >
                <span className="cursor-pointer text-base-content">ℹ️</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bioData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  label
                >
                  {bioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={userColor[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
};

export default TagsCharts;
