import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BarChart3 } from "lucide-react";

const COLORS = {
  Solved: "#4F46E5", // primary
  Unsolved: "#16A34A", // success
  Backlogs: "#9333EA", // secondary
  Correct: "#F59E0B", // warning
};

const initialData = [
  { name: "Solved", value: 40 },
  { name: "Unsolved", value: 25 },
  { name: "Backlogs", value: 20 },
  { name: "Correct", value: 15 },
];

const VisitorsCharts = () => {
  const [selectedItems, setSelectedItems] = useState([
    initialData[0]?.name,
    initialData[2]?.name,
    initialData[3]?.name,
  ]);

  const handleToggle = (name) => {
    setSelectedItems((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const filteredData = initialData.filter((d) =>
    selectedItems.includes(d.name)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <div className="order-2 lg:order-1 text-center lg:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Visualize What you do !
        </h1>
        <p className="text-base sm:text-lg text-base-content/80 mb-6">
          It's easy to lose track of assignments, practice problems, or feel
          FOMO. Visualize not just what you're doing — but also what others in
          the community are working on!
        </p>

        <ul className="space-y-3 text-sm sm:text-base text-base-content/80">
          <li className="flex items-center justify-center lg:justify-start">
            <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
            <span>Real-time community insights</span>
          </li>
          <li className="flex items-center justify-center lg:justify-start">
            <div className="w-2 h-2 bg-success rounded-full mr-3 flex-shrink-0"></div>
            <span>Advanced engagement metrics</span>
          </li>
          <li className="flex items-center justify-center lg:justify-start">
            <div className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></div>
            <span>Comprehensive progress tracking</span>
          </li>
          <li className="flex items-center justify-center lg:justify-start">
            <div className="w-2 h-2 bg-warning rounded-full mr-3 flex-shrink-0"></div>
            <span>Many more analytics features coming soon</span>
          </li>
        </ul>
      </div>

      <div className="relative order-1 lg:order-2">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-lg sm:text-xl">
                Community Insights
              </h4>
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>

            <div className="mb-4 flex flex-wrap gap-2 justify-center sm:justify-start">
              {initialData.map((item) => (
                <label
                  key={item.name}
                  className="flex items-center gap-2 text-xs sm:text-sm bg-base-200 rounded-lg px-2 py-1"
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.name)}
                    onChange={() => handleToggle(item.name)}
                    className="checkbox checkbox-xs sm:checkbox-sm checkbox-primary"
                  />
                  <span className="capitalize text-base-content whitespace-nowrap">
                    {item.name}
                  </span>
                </label>
              ))}
            </div>

            <div className="w-full h-48 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={filteredData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    fill="#8884d8"
                    label={({ name, percent }) =>
                      window.innerWidth >= 640
                        ? `${name} ${(percent * 100).toFixed(0)}%`
                        : `${(percent * 100).toFixed(0)}%`
                    }
                    innerRadius="40%"
                    labelLine={false}
                    fontSize={window.innerWidth >= 640 ? 12 : 10}
                  >
                    {filteredData.map((entry) => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={COLORS[entry.name]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor:
                        "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))",
                      border:
                        "1px solid var(--fallback-bc,oklch(var(--bc)/0.2))",
                      borderRadius: "0.5rem",
                      fontSize: window.innerWidth >= 640 ? "14px" : "12px",
                    }}
                  />
                  <Legend
                    layout={
                      window.innerWidth >= 1024 ? "vertical" : "horizontal"
                    }
                    verticalAlign={
                      window.innerWidth >= 1024 ? "middle" : "bottom"
                    }
                    align={window.innerWidth >= 1024 ? "right" : "center"}
                    wrapperStyle={{
                      fontSize: window.innerWidth >= 640 ? "14px" : "12px",
                      paddingTop: window.innerWidth >= 1024 ? "0" : "10px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorsCharts;
