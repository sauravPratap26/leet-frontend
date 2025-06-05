import { useState } from "react";
import { Download } from "lucide-react";

const CreateProblemActions = ({ loadSampleData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0 justify-between items-start md:items-center">
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

        <button
          type="button"
          className="text-yellow-500 text-2xl ml-auto"
          title="Important Info"
          onClick={() => setIsModalOpen(true)}
        >
          ⚠️
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
          <div className="bg-white bg-opacity-95 border border-gray-200 shadow-xl rounded-lg max-w-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-600 mb-4">
              Please Read Carefully
            </h2>
            <p className="text-gray-800 mb-4 text-sm leading-relaxed">
              Please be mindful when creating problems, as the quality of the
              content directly impacts the learning experience of our students.
              To maintain consistency and avoid frequent modifications to global
              content, editing of problems marked as <strong>global</strong> is
              currently restricted.
            </p>
            <p className="text-gray-800 mb-4 text-sm leading-relaxed">
              If you need to make changes, you may delete the problem from the{" "}
              <strong>"Created Problems"</strong> tab and recreate it with the
              updated content.
            </p>
            <p className="text-gray-700 text-sm">
              We understand that editing capabilities can be important, and
              based on community feedback, we may consider introducing
              controlled editing features for global problems in the future.
            </p>

            <div className="text-right mt-6">
              <button
                className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProblemActions;
