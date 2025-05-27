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

const generateColors = (count) =>
  Array.from(
    { length: count },
    (_, i) => `hsl(${(i * 360) / count}, 70%, 60%)`
  );

const TagsCharts = () => {
  const { tagProblemsCount, tagSubmissionsCount, selectedTags, bioTags } =
    useTagsStore();
  console.log(
    "***&&&",
    tagProblemsCount,
    tagSubmissionsCount,
    selectedTags,
    bioTags
  );
  console.log(selectedTags, tagProblemsCount);
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
  console.log(problemsData, bioData, submissionData);
  return (
    <div className="w-full px-[25px] space-y-6 overflow-y-auto mb-[20px]">
      <div className="h-[450px] p-4 bg-base-200 rounded-box shadow-md">
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
              <Legend layout="vertical" verticalAlign="middle" align="right" />
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
                  <Cell key={`cell-${index}`} fill={pieColors[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TagsCharts;
