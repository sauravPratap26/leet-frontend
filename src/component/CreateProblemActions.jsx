import { Download } from "lucide-react";
import React from "react";

const CreateProblemActions = ({loadSampleData}) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="btn bg-red-500 hover:bg-red-600 text-white shadow-md rounded-md px-4 py-2 transition-all duration-200"
          onClick={() => loadSampleData("reset")}
        >
          🔄 Reset
        </button>
        <button
          type="button"
          className="btn bg-blue-500 hover:bg-blue-600 text-white shadow-md rounded-md px-4 py-2 transition-all duration-200 flex items-center gap-2"
          onClick={() => loadSampleData("array")}
        >
          <Download className="w-4 h-4" />
          DP Problem
        </button>
        <button
          type="button"
          className="btn bg-green-500 hover:bg-green-600 text-white shadow-md rounded-md px-4 py-2 transition-all duration-200 flex items-center gap-2"
          onClick={() => loadSampleData("string")}
        >
          <Download className="w-4 h-4" />
          String Problem
        </button>
      </div>
    </div>
  );
};

export default CreateProblemActions;
